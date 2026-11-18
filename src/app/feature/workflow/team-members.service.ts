import { Injectable } from '@angular/core';
import { TeamMember } from '../../interfaces/workflow.interface';
import { getDb } from '../firebase/firebase-app';
import { FirestoreCollection } from '../firebase/firestore-collection';

/** Developers the CEO approved, on top of the accounts built into the app. */
@Injectable({ providedIn: 'root' })
export class TeamMembersService extends FirestoreCollection<TeamMember> {
	constructor() {
		super('team', false);
	}

	async revoke(uid: string) {
		return this.remove(uid);
	}

	/** Used by the approval: writes the member under the uid, which is its document id. */
	async approve(member: { id: string; email: string; name: string }) {
		try {
			const [db, fs] = await Promise.all([getDb(), import('firebase/firestore')]);

			await fs.setDoc(fs.doc(db, 'team', member.id), {
				email: member.email,
				name: member.name,
				createdAt: Date.now(),
			});

			return true;
		} catch {
			return false;
		}
	}
}
