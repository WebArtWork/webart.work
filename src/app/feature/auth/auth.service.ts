import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import type { Auth, User } from 'firebase/auth';
import { environment } from '../../../environments/environment';
import { getFirebaseApp } from '../firebase/firebase-app';

@Injectable({ providedIn: 'root' })
export class AuthService {
	private readonly _platformId = inject(PLATFORM_ID);

	readonly user = signal<User | null>(null);
	readonly allowed = computed(() => {
		const uid = this.user()?.uid;
		return !!uid && environment.allowedUids.includes(uid);
	});
	readonly error = signal('');
	readonly busy = signal(false);

	private _auth?: Auth;
	private _resolveReady!: () => void;
	private readonly _ready = new Promise<void>((resolve) => (this._resolveReady = resolve));

	constructor() {
		if (isPlatformBrowser(this._platformId)) {
			this._start();
		}
	}

	/** Resolves once Firebase has reported the stored session (or its absence). */
	whenReady() {
		return this._ready;
	}

	async signInWithGoogle() {
		this.error.set('');
		this.busy.set(true);

		try {
			await this._ready;
			const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth');
			await signInWithPopup(this._auth!, new GoogleAuthProvider());
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

		onAuthStateChanged(this._auth, (user) => {
			this.user.set(user);
			this._resolveReady();
		});
	}
}
