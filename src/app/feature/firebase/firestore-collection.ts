import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject, signal } from '@angular/core';
import type { DocumentData, Firestore } from 'firebase/firestore';
import { AuthService } from '../auth/auth.service';
import { getDb } from './firebase-app';

export interface FirestoreDoc {
	id: string;
	createdAt: number;
}

type FirestoreModule = typeof import('firebase/firestore');
type NewDoc<T> = Omit<T, 'id' | 'createdAt' | 'uid'>;

/**
 * Live list plus create, update and delete for one Firestore collection.
 * An `owned` collection only reads and writes documents whose `uid` is the signed-in user.
 */
export abstract class FirestoreCollection<T extends FirestoreDoc> {
	private readonly _authService = inject(AuthService);
	private readonly _platformId = inject(PLATFORM_ID);

	readonly items = signal<T[]>([]);
	readonly loading = signal(true);
	readonly error = signal('');

	private _stop?: () => void;
	private _users = 0;

	constructor(
		private readonly _name: string,
		private readonly _owned: boolean,
		/** Readable without signing in; the Firestore rules must allow public reads. */
		private readonly _public = false,
	) {}

	/** Starts the live query. Every call must be paired with `unwatch()`. */
	watch() {
		this._users++;

		if (this._users === 1) {
			this._start();
		}
	}

	unwatch() {
		this._users = Math.max(0, this._users - 1);

		if (!this._users) {
			this._stop?.();
			this._stop = undefined;
		}
	}

	add(data: NewDoc<T>) {
		const uid = this._authService.user()?.uid;

		return this._write(async (db, fs) => {
			await fs.addDoc(fs.collection(db, this._name), {
				...(data as DocumentData),
				createdAt: Date.now(),
				...(this._owned ? { uid } : {}),
			});
		});
	}

	update(id: string, patch: Partial<NewDoc<T>>) {
		return this._write((db, fs) =>
			fs.updateDoc(fs.doc(db, this._name, id), patch as DocumentData),
		);
	}

	remove(id: string) {
		return this._write((db, fs) => fs.deleteDoc(fs.doc(db, this._name, id)));
	}

	private async _start() {
		if (!isPlatformBrowser(this._platformId)) {
			return;
		}

		this.loading.set(true);
		this.error.set('');

		try {
			let uid: string | undefined;

			if (!this._public || this._owned) {
				await this._authService.whenReady();
				uid = this._authService.user()?.uid;

				if (!uid) {
					throw new Error('Not signed in');
				}
			}

			const [db, fs] = await Promise.all([getDb(), import('firebase/firestore')]);

			if (!this._users) {
				return;
			}

			const ref = fs.collection(db, this._name);
			const source = this._owned ? fs.query(ref, fs.where('uid', '==', uid)) : ref;

			this._stop = fs.onSnapshot(
				source,
				(snapshot) => {
					this.items.set(
						snapshot.docs
							.map((doc) => ({ id: doc.id, ...doc.data() }) as unknown as T)
							.sort((a, b) => b.createdAt - a.createdAt),
					);
					this.loading.set(false);
				},
				() => this._fail('Could not load data.'),
			);
		} catch {
			this._fail('Could not load data.');
		}
	}

	private async _write(action: (db: Firestore, fs: FirestoreModule) => Promise<unknown>) {
		this.error.set('');

		try {
			const [db, fs] = await Promise.all([getDb(), import('firebase/firestore')]);
			await action(db, fs);
			return true;
		} catch {
			this.error.set('Could not save changes. Please try again.');
			return false;
		}
	}

	private _fail(message: string) {
		this.error.set(message);
		this.loading.set(false);
	}
}
