import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import type { Auth, User } from 'firebase/auth';
import { environment } from '../../../environments/environment';
import { getDb, getFirebaseApp } from '../firebase/firebase-app';

/**
 * Carries data of an anonymous visitor over when they sign in to a Google account that already
 * exists, which makes Firebase switch to that account instead of upgrading the anonymous one.
 */
export interface AccountMigration {
	/** Runs while still signed in as the anonymous visitor; whatever it returns goes to `restore`. */
	collect: (anonymousUid: string) => Promise<unknown>;
	/** Runs once signed in as the existing account. */
	restore: (collected: unknown, uid: string) => Promise<void>;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
	private readonly _platformId = inject(PLATFORM_ID);

	readonly user = signal<User | null>(null);
	/** Bumped when the signed-in user changes in place (anonymous account upgraded to Google). */
	private readonly _upgrades = signal(0);
	/** The signed-in user unless they are an anonymous visitor. */
	readonly member = computed(() => {
		this._upgrades();
		const user = this.user();

		return user && !user.isAnonymous ? user : null;
	});
	/** Set when the CEO has approved this account in the `team` collection. */
	readonly approved = signal(false);
	readonly allowed = computed(() => {
		const uid = this.user()?.uid;
		return !!uid && (uid === environment.ceoUid || this.approved());
	});
	readonly isCeo = computed(() => this.user()?.uid === environment.ceoUid);
	readonly error = signal('');
	readonly busy = signal(false);

	private _auth?: Auth;
	private _resolveReady!: () => void;
	private readonly _ready = new Promise<void>((resolve) => (this._resolveReady = resolve));
	private readonly _migrations: AccountMigration[] = [];

	constructor() {
		if (isPlatformBrowser(this._platformId)) {
			this._start();
		}
	}

	/** Resolves once Firebase has reported the stored session (or its absence). */
	whenReady() {
		return this._ready;
	}

	registerMigration(migration: AccountMigration) {
		this._migrations.push(migration);
	}

	/** Anonymous visitors can vote; this gives one without asking them for anything. */
	async ensureUser() {
		await this._ready;

		if (!this._auth!.currentUser) {
			const { signInAnonymously } = await import('firebase/auth');
			await signInAnonymously(this._auth!);
		}

		return this._auth!.currentUser!;
	}

	async signInWithGoogle() {
		this.error.set('');
		this.busy.set(true);

		try {
			await this._ready;
			const { GoogleAuthProvider, linkWithPopup, signInWithCredential, signInWithPopup } =
				await import('firebase/auth');
			const provider = new GoogleAuthProvider();
			const current = this._auth!.currentUser;

			if (!current?.isAnonymous) {
				await signInWithPopup(this._auth!, provider);
				await this.refreshApproval();

				return true;
			}

			try {
				// Keeps the anonymous account's uid, so its votes stay where they are.
				await linkWithPopup(current, provider);
				this._upgrades.update((count) => count + 1);
			} catch (error) {
				const credential = GoogleAuthProvider.credentialFromError(
					error as Parameters<typeof GoogleAuthProvider.credentialFromError>[0],
				);

				if ((error as { code?: string }).code !== 'auth/credential-already-in-use' || !credential) {
					throw error;
				}

				const collected = await Promise.all(
					this._migrations.map((migration) => migration.collect(current.uid)),
				);
				const { user } = await signInWithCredential(this._auth!, credential);
				await Promise.all(
					this._migrations.map((migration, index) => migration.restore(collected[index], user.uid)),
				);
			}

			await this.refreshApproval();

			return true;
		} catch (error) {
			const code = (error as { code?: string }).code;

			if (code !== 'auth/popup-closed-by-user' && code !== 'auth/cancelled-popup-request') {
				this.error.set('Sign in failed. Please try again.');
			}

			return false;
		} finally {
			this.busy.set(false);
		}
	}

	/** Looks the signed-in account up among the developers the CEO approved. */
	async refreshApproval() {
		const user = this._auth?.currentUser;

		if (!user || user.isAnonymous || user.uid === environment.ceoUid) {
			this.approved.set(false);

			return;
		}

		try {
			const [db, fs] = await Promise.all([getDb(), import('firebase/firestore')]);

			this.approved.set((await fs.getDoc(fs.doc(db, 'team', user.uid))).exists());
		} catch {
			this.approved.set(false);
		}
	}

	async signOut() {
		await this._ready;
		const { signOut } = await import('firebase/auth');
		await signOut(this._auth!);
	}

	private async _start() {
		const [app, { getAuth, onAuthStateChanged }] = await Promise.all([
			getFirebaseApp(),
			import('firebase/auth'),
		]);

		this._auth = getAuth(app);

		onAuthStateChanged(this._auth, async (user) => {
			this.user.set(user);
			await this.refreshApproval();
			this._resolveReady();
		});
	}
}
