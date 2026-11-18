import { Injectable, computed, inject } from '@angular/core';
import { FeedbackComment } from '../../interfaces/workflow.interface';
import { AuthService } from '../auth/auth.service';
import { getDb } from '../firebase/firebase-app';
import { FirestoreCollection } from '../firebase/firestore-collection';

/** Comments under features and plans; writing needs a Google sign-in. */
@Injectable({ providedIn: 'root' })
export class CommentsService extends FirestoreCollection<FeedbackComment> {
	private readonly _account = inject(AuthService);

	/** Comments per target, oldest first. */
	readonly byTarget = computed(() => {
		const groups = new Map<string, FeedbackComment[]>();

		for (const comment of [...this.items()].reverse()) {
			groups.set(comment.targetId, [...(groups.get(comment.targetId) ?? []), comment]);
		}

		return groups;
	});

	constructor() {
		super('comments', false, true);
	}

	async post(targetId: string, text: string) {
		const user = this._account.member();
		const body = text.trim().slice(0, 1000);

		if (!user || !body) {
			return false;
		}

		this.error.set('');

		try {
			const [db, fs] = await Promise.all([getDb(), import('firebase/firestore')]);

			await fs.addDoc(fs.collection(db, 'comments'), {
				targetId,
				uid: user.uid,
				authorName: user.displayName || 'Visitor',
				text: body,
				createdAt: Date.now(),
			});

			return true;
		} catch {
			this.error.set('Could not post your comment. Please try again.');

			return false;
		}
	}
}
