import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@wawjs/ngx-translate';
import { usePageTranslations } from '../../feature/language/page-translations';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ORGANIZATION_REF, SITE_ORIGIN, SeoService } from '../../services/seo.service';
import {
	QUANTUM_BUILDS,
	QUANTUM_EXAMPLE_STEPS,
	QUANTUM_FAQS,
	QUANTUM_FIT_POINTS,
	QUANTUM_IBM_POINTS,
	QUANTUM_INDUSTRIES,
	QUANTUM_KEYWORDS,
	QUANTUM_META,
	QUANTUM_REASONS,
	QUANTUM_SERVICES,
	QUANTUM_STEPS,
} from './quantum.const';

@Component({
	imports: [RouterLink, TranslatePipe],
	templateUrl: './quantum.component.html',
	styleUrl: './quantum.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuantumComponent {
	private readonly _seoService = inject(SeoService);
	private readonly _translateService = inject(TranslateService);

	protected readonly fitPoints = QUANTUM_FIT_POINTS;
	protected readonly builds = QUANTUM_BUILDS;
	protected readonly services = QUANTUM_SERVICES;
	protected readonly industries = QUANTUM_INDUSTRIES;
	protected readonly exampleSteps = QUANTUM_EXAMPLE_STEPS;
	protected readonly steps = QUANTUM_STEPS;
	protected readonly ibmPoints = QUANTUM_IBM_POINTS;
	protected readonly reasons = QUANTUM_REASONS;
	protected readonly faqs = QUANTUM_FAQS;

	constructor() {
		usePageTranslations('quantum');
		this._seoService.apply({
			...QUANTUM_META,
			path: '/quantum',
			mainEntity: `${SITE_ORIGIN}/quantum#service`,
			imageAlt: 'Quantum computing with IBM Quantum by Web Art Work',
			breadcrumbs: [
				{ name: 'Home', path: '/' },
				{ name: 'Quantum computing', path: '/quantum' },
			],
			jsonLd: this._buildStructuredData(),
		});
	}

	private _buildStructuredData() {
		const t = (text: string) => this._translateService.translate(text)();

		return [
			{
				'@type': 'Service',
				'@id': `${SITE_ORIGIN}/quantum#service`,
				image: QUANTUM_META.image,
				name: t(QUANTUM_META.title),
				description: t(QUANTUM_META.description),
				serviceType: 'Quantum computing development',
				url: `${SITE_ORIGIN}/quantum`,
				provider: ORGANIZATION_REF,
				areaServed: 'Worldwide',
				keywords: QUANTUM_KEYWORDS.join(', '),
				hasOfferCatalog: {
					'@type': 'OfferCatalog',
					name: t('Three ways to start'),
					itemListElement: this.services.map((service) => ({
						'@type': 'Offer',
						itemOffered: {
							'@type': 'Service',
							name: t(service.title),
							description: t(service.summary),
						},
					})),
				},
			},
			{
				'@type': 'FAQPage',
				mainEntity: this.faqs.map((faq) => ({
					'@type': 'Question',
					name: t(faq.question),
					acceptedAnswer: {
						'@type': 'Answer',
						text: t(faq.answer),
					},
				})),
			},
		];
	}
}
