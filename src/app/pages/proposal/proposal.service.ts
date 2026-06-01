import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Proposal } from './proposal.interface';

@Injectable({
	providedIn: 'root',
})
export class ProposalService {
	async fetchProposal(proposalId: string): Promise<Proposal | null> {
		try {
			const response = await fetch(`${environment.apiUrl}/api/proposal/fetch`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: proposalId,
				}),
			});

			if (!response.ok) {
				console.error('Failed to fetch proposal:', response.statusText);
				return null;
			}

			const data = await response.json();
			return data as Proposal;
		} catch (error) {
			console.error('Error fetching proposal:', error);
			return null;
		}
	}
}
