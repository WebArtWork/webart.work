import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DevDirection } from '../../../data/workflow.const';
import { Profile } from '../../interfaces/workflow.interface';
import { AuthService } from '../auth/auth.service';
import { getDb } from '../firebase/firebase-app';
import { FirestoreCollection } from '../firebase/firestore-collection';

@Injectable({ providedIn: 'root' })
export class ProfilesService extends FirestoreCollection<Profile> {
	private readonly _account = inject(AuthService);

	constructor() {
		super('profiles', false);
	}

	async save(value: {
		fullName: string;
		avatar: string;
		phone: string;
		linkedin: string;
		upwork: string;
		directions: DevDirection[];
		alternativeEmails: string[];
	}) {
		const user = this._account.user();

		if (!user) {
			return false;
		}

		try {
			const [db, fs] = await Promise.all([getDb(), import('firebase/firestore')]);
			const ref = fs.doc(db, 'profiles', user.uid);
			const existing = await fs.getDoc(ref);

			await fs.setDoc(
				ref,
				{
					...value,
					email: user.email ?? '',
					...(existing.exists() ? {} : { createdAt: Date.now() }),
				},
				{ merge: true },
			);

			// What visitors may see on the Development page: no email and no phone number.
			await fs.setDoc(
				fs.doc(db, 'developers', user.uid),
				{
					fullName: value.fullName,
					avatar: value.avatar,
					linkedin: value.linkedin,
					upwork: value.upwork,
					directions: value.directions,
					createdAt: (existing.data()?.['createdAt'] as number | undefined) ?? Date.now(),
				},
				{ merge: true },
			);

			return true;
		} catch {
			return false;
		}
	}

	/** Returns the plain token once; the API only keeps its hash. */
	async generateToken() {
		const response = await this._api('/mcp-token', { method: 'POST' });

		return (await response.json()) as { token: string; expiresAt: number };
	}

	/** Uploads a resized avatar to Cloudflare through the API and returns its public URL. */
	async uploadAvatar(dataUrl: string) {
		const response = await this._api('/avatar', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ dataUrl }),
		});

		return ((await response.json()) as { url: string }).url;
	}

	private async _api(path: string, init: RequestInit) {
		const idToken = await this._account.user()?.getIdToken();

		if (!idToken) {
			throw new Error('Not signed in');
		}

		const response = await fetch(`${environment.contact.apiUrl}/api/webartwork${path}`, {
			...init,
			headers: { ...init.headers, Authorization: `Bearer ${idToken}` },
		});

		if (!response.ok) {
			throw new Error(`Request failed: ${response.status}`);
		}

		return response;
	}
}
