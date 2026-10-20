import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { usePageTranslations } from '../../feature/language/page-translations';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ORGANIZATION_REF, SITE_ORIGIN, SeoService } from '../../services/seo.service';
import { STARTUPS } from '../../../data/startup.const';
import {
	BLOCKCHAIN_BUILDS,
	BLOCKCHAIN_COSMOS_POINTS,
	BLOCKCHAIN_FAQS,
	BLOCKCHAIN_KEYWORDS,
	BLOCKCHAIN_META,
	BLOCKCHAIN_OPTIONS,
	BLOCKCHAIN_PROJECTS,
	BLOCKCHAIN_REASONS,
	BLOCKCHAIN_RELATED,
	BLOCKCHAIN_SERVICES,
	BLOCKCHAIN_STEPS,
	BLOCKCHAIN_USE_CASES,
} from './blockchain.const';

@Component({
	imports: [NgOptimizedImage, RouterLink, TranslatePipe],
	templateUrl: './blockchain.component.html',
	styleUrl: './blockchain.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockchainComponent {
	private readonly _seoService = inject(SeoService);

	protected readonly builds = BLOCKCHAIN_BUILDS;
	protected readonly services = BLOCKCHAIN_SERVICES;
	protected readonly useCases = BLOCKCHAIN_USE_CASES;
	protected readonly projects = BLOCKCHAIN_PROJECTS.flatMap((project) => {
		const startup = STARTUPS.find((item) => item.id === project.id);
		return startup ? [{ ...startup, ...project }] : [];
	});
	protected readonly cosmosPoints = BLOCKCHAIN_COSMOS_POINTS;
	protected readonly options = BLOCKCHAIN_OPTIONS;
	protected readonly steps = BLOCKCHAIN_STEPS;
	protected readonly reasons = BLOCKCHAIN_REASONS;
	protected readonly faqs = BLOCKCHAIN_FAQS;
	protected readonly related = BLOCKCHAIN_RELATED;

	constructor() {
		usePageTranslations('blockchain');
		this._seoService.apply({
			...BLOCKCHAIN_META,
			path: '/blockchain',
			mainEntity: `${SITE_ORIGIN}/blockchain#service`,
			breadcrumbs: [
				{ name: 'Home', path: '/' },
				{ name: 'Blockchain development', path: '/blockchain' },
			],
			jsonLd: [
				{
					'@type': 'Service',
					'@id': `${SITE_ORIGIN}/blockchain#service`,
					image: BLOCKCHAIN_META.image,
					name: BLOCKCHAIN_META.title,
					description: BLOCKCHAIN_META.description,
					serviceType: 'Blockchain development',
					url: `${SITE_ORIGIN}/blockchain`,
					provider: ORGANIZATION_REF,
					areaServed: 'Worldwide',
					keywords: BLOCKCHAIN_KEYWORDS.join(', '),
					hasOfferCatalog: {
						'@type': 'OfferCatalog',
						name: 'Services for every stage',
						itemListElement: this.services.map((service) => ({
							'@type': 'Offer',
							itemOffered: {
								'@type': 'Service',
								name: service.title,
								description: service.summary,
							},
						})),
					},
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
