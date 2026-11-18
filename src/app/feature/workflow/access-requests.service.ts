import { Injectable, inject } from '@angular/core';
import { AccessRequest } from '../../interfaces/workflow.interface';
import { AuthService } from '../auth/auth.service';
import { getDb } from '../firebase/firebase-app';
import { FirestoreCollection } from '../firebase/firestore-collection';

/** Accounts waiting for the CEO's approval. */
@Injectable({ providedIn: 'root' })
export class AccessRequestsService extends FirestoreCollection<AccessRequest> {
	private readonly _account = inject(AuthService);

	constructor() {
		super('accessRequests', false);
	}

	/** The signed-in account asks for access. One request per account: asking again only refreshes it. */
	async ask() {
		const user = this._account.member();

		if (!user) {
			return false;
		}

		try {
			const [db, fs] = await Promise.all([getDb(), import('firebase/firestore')]);

			await fs.setDoc(fs.doc(db, 'accessRequests', user.uid), {
				email: user.email ?? '',
				name: user.displayName || '',
				createdAt: Date.now(),
			});

			return true;
		} catch {
			return false;
		}
	}

	/** Whether the signed-in account has already asked. */
	async asked() {
		const user = this._account.member();

		if (!user) {
			return false;
		}

		try {
			const [db, fs] = await Promise.all([getDb(), import('firebase/firestore')]);

			return (await fs.getDoc(fs.doc(db, 'accessRequests', user.uid))).exists();
		} catch {
			return false;
		}
	}
}
