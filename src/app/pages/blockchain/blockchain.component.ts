import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ORGANIZATION_REF, SITE_ORIGIN, SeoService } from '../../services/seo.service';
import { STARTUPS } from '../../../data/startup.const';
import {
	BLOCKCHAIN_FAQS,
	BLOCKCHAIN_META,
	BLOCKCHAIN_PROJECT_IDS,
	BLOCKCHAIN_REASONS,
	BLOCKCHAIN_STEPS,
} from './blockchain.const';

@Component({
	imports: [NgOptimizedImage, RouterLink, TranslatePipe],
	templateUrl: './blockchain.component.html',
	styleUrl: './blockchain.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockchainComponent {
	private readonly _seoService = inject(SeoService);

	protected readonly projects = STARTUPS.filter((startup) =>
		BLOCKCHAIN_PROJECT_IDS.includes(startup.id),
	);
	protected readonly reasons = BLOCKCHAIN_REASONS;
	protected readonly steps = BLOCKCHAIN_STEPS;
	protected readonly faqs = BLOCKCHAIN_FAQS;

	constructor() {
		this._seoService.apply({
			...BLOCKCHAIN_META,
			path: '/blockchain',
			breadcrumbs: [
				{ name: 'Home', path: '/' },
				{ name: 'Blockchain development', path: '/blockchain' },
			],
			jsonLd: [
				{
					'@type': 'Service',
					name: BLOCKCHAIN_META.title,
					description: BLOCKCHAIN_META.description,
					serviceType: 'Cosmos SDK blockchain development',
					url: `${SITE_ORIGIN}/blockchain`,
					provider: ORGANIZATION_REF,
				},
				{
					'@type': 'FAQPage',
					mainEntity: this.faqs.map((faq) => ({
						'@type': 'Question',
						name: faq.question,
						acceptedAnswer: { '@type': 'Answer', text: faq.answer },
					})),
				},
			],
		});
	}
}
