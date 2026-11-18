import { Injectable, inject } from '@angular/core';
import { PackageCategory, RequestType } from '../../../data/workflow.const';
import { WorkRequest } from '../../interfaces/workflow.interface';
import { AuthService } from '../auth/auth.service';
import { getDb } from '../firebase/firebase-app';
import { FirestoreCollection } from '../firebase/firestore-collection';

/** Visitor requests. Only the team can read them; visitors signed in with Google can send one. */
@Injectable({ providedIn: 'root' })
export class RequestsService extends FirestoreCollection<WorkRequest> {
	private readonly _account = inject(AuthService);

	constructor() {
		super('requests', false);
	}

	async submit(value: {
		type: RequestType;
		category: PackageCategory;
		title: string;
		description: string;
		repo: string;
	}) {
		const user = this._account.member();

		if (!user) {
			return false;
		}

		try {
			const [db, fs] = await Promise.all([getDb(), import('firebase/firestore')]);

			await fs.addDoc(fs.collection(db, 'requests'), {
				...value,
				status: 'new',
				uid: user.uid,
				authorName: user.displayName || 'Visitor',
				authorEmail: user.email ?? '',
				createdAt: Date.now(),
			});

			return true;
		} catch {
			return false;
		}
	}
}
