import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	PLATFORM_ID,
	computed,
	effect,
	inject,
	signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Proposal } from './proposal.interface';
import { ProposalService } from './proposal.service';

@Component({
	selector: 'app-proposal',
	standalone: true,
	imports: [CommonModule, TranslatePipe],
	templateUrl: './proposal.component.html',
	styleUrl: './proposal.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProposalComponent {
	private readonly _route = inject(ActivatedRoute);
	private readonly _router = inject(Router);
	private readonly _proposalService = inject(ProposalService);
	private readonly _platformId = inject(PLATFORM_ID);

	private readonly _queryParams = toSignal(this._route.queryParamMap, {
		initialValue: this._route.snapshot.queryParamMap,
	});

	protected readonly proposalId = computed(() => {
		return this._queryParams().get('id');
	});

	protected readonly proposal = signal<Proposal | null>(null);
	protected readonly isLoading = signal(true);

	constructor() {
		effect(() => {
			const id = this.proposalId();
			if (!id) {
				this._router.navigateByUrl('/');
				return;
			}

			if (isPlatformBrowser(this._platformId)) {
				this._loadProposal(id);
			}
		});
	}

	protected readonly websites = computed(() => {
		const p = this.proposal();
		return p?.websites?.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) ?? [];
	});

	protected readonly costs = computed(() => {
		const p = this.proposal();
		return p?.costs?.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) ?? [];
	});

	protected readonly recommendedCost = computed(() => {
		return this.costs().find((c) => c.isRecommended);
	});

	protected readonly formatPrice = (price: number): string => {
		const p = this.proposal();
		const currency = p?.currency ?? 'USD';
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: currency === 'USD' ? 'USD' : currency === 'EUR' ? 'EUR' : 'USD',
		}).format(price);
	};

	private async _loadProposal(id: string) {
		this.isLoading.set(true);
		try {
			const data = await this._proposalService.fetchProposal(id);
			if (data) {
				this.proposal.set(data);
			} else {
				this._router.navigateByUrl('/');
			}
		} finally {
			this.isLoading.set(false);
		}
	}
}
