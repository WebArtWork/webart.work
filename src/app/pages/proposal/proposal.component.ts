import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	inject,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
	selector: 'app-proposal',
	standalone: true,
	imports: [CommonModule, NgOptimizedImage, RouterLink, TranslatePipe],
	templateUrl: './proposal.component.html',
	styleUrl: './proposal.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProposalComponent {
	private readonly _route = inject(ActivatedRoute);
	private readonly _router = inject(Router);

	protected readonly proposalCode = computed(() => {
		return this._route.snapshot.queryParamMap.get('id');
	});

	constructor() {
		effect(() => {
			const code = this.proposalCode();
			if (!code) {
				this._router.navigateByUrl('/');
			}
		});
	}

	protected hasProposal = computed(() => !!this.proposalCode());

	protected proposalData = computed(() => {
		const code = this.proposalCode();
		if (!code) return null;

		return {
			code,
			title: `Proposal: ${code}`,
			description: `This is a proposal page for code: ${code}`,
			createdAt: new Date().toLocaleDateString(),
		};
	});
}
