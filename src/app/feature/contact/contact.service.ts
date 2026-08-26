import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class ContactService {
	async send(message: string): Promise<boolean> {
		try {
			const response = await fetch(`${environment.contact.apiUrl}/api/telegram/contact`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ slug: environment.contact.slug, message }),
			});

			return response.ok;
		} catch (error) {
			console.error(error);
			return false;
		}
	}
}
