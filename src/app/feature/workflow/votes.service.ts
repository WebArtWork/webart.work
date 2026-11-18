import { Injectable, computed, inject } from '@angular/core';
import { Vote } from '../../interfaces/workflow.interface';
import { AuthService } from '../auth/auth.service';
import { getDb } from '../firebase/firebase-app';
import { FirestoreCollection } from '../firebase/firestore-collection';

/**
 * Up and down votes on features and plans. Anyone can vote: a visitor who is not signed in gets an
 * anonymous account, and signing in with Google later carries the votes over to it.
 */
@Injectable({ providedIn: 'root' })
export class VotesService extends FirestoreCollection<Vote> {
	private readonly _account = inject(AuthService);

	/** Sum of the votes per target. */
	readonly scores = computed(() => {
		const scores = new Map<string, number>();

		for (const vote of this.items()) {
			scores.set(vote.targetId, (scores.get(vote.targetId) ?? 0) + vote.value);
		}

		return scores;
	});

	/** The signed-in visitor's own vote per target. */
	readonly mine = computed(() => {
		const uid = this._account.user()?.uid;

		return new Map(
			this.items()
				.filter((vote) => vote.uid === uid)
				.map((vote) => [vote.targetId, vote.value]),
		);
	});

	constructor() {
		super('votes', false, true);

		this._account.registerMigration({
			collect: (uid) => this._takeVotes(uid),
			restore: (votes, uid) => this._giveVotes(votes as Vote[], uid),
		});
	}

	/** Voting the same way again takes the vote back; the other way switches it. */
	async toggle(targetId: string, value: 1 | -1) {
		this.error.set('');

		try {
			const user = await this._account.ensureUser();
			const [db, fs] = await Promise.all([getDb(), import('firebase/firestore')]);
			const ref = fs.doc(db, 'votes', `${targetId}_${user.uid}`);

			if (this.mine().get(targetId) === value) {
				await fs.deleteDoc(ref);
			} else {
				await fs.setDoc(ref, { targetId, uid: user.uid, value, createdAt: Date.now() });
			}

			return true;
		} catch {
			this.error.set('Could not save your vote. Please try again.');

			return false;
		}
	}

	/** Removes the anonymous visitor's votes and hands them back, before the account is replaced. */
	private async _takeVotes(uid: string) {
		const [db, fs] = await Promise.all([getDb(), import('firebase/firestore')]);
		const snapshot = await fs.getDocs(
			fs.query(fs.collection(db, 'votes'), fs.where('uid', '==', uid)),
		);
		const votes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Vote);

		await Promise.all(snapshot.docs.map((doc) => fs.deleteDoc(doc.ref)));

		return votes;
	}

	/** Gives the votes to the account the visitor signed in to, keeping votes it already has. */
	private async _giveVotes(votes: Vote[], uid: string) {
		const [db, fs] = await Promise.all([getDb(), import('firebase/firestore')]);

		await Promise.all(
			votes.map(async (vote) => {
				const ref = fs.doc(db, 'votes', `${vote.targetId}_${uid}`);

				if (!(await fs.getDoc(ref)).exists()) {
					await fs.setDoc(ref, {
						targetId: vote.targetId,
						uid,
						value: vote.value,
						createdAt: vote.createdAt,
					});
				}
			}),
		);
	}
}
