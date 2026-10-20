import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { usePageTranslations } from '../../feature/language/page-translations';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ORGANIZATION_REF, SITE_ORIGIN, SeoService } from '../../services/seo.service';
import {
	MARKET_BUSINESS_MODELS,
	MARKET_CAPABILITIES,
	MARKET_FAQS,
	MARKET_FOCUS,
	MARKET_HIGHLIGHTS,
	MARKET_INTEGRATIONS,
	MARKET_KEYWORDS,
	MARKET_META,
	MARKET_REASONS,
	MARKET_RELATED,
	MARKET_STEPS,
	MARKET_TECH,
	MARKET_TYPES,
} from './market.const';

@Component({
	imports: [RouterLink, TranslatePipe],
	templateUrl: './market.component.html',
	styleUrl: './market.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketComponent {
	private readonly _seoService = inject(SeoService);

	protected readonly highlights = MARKET_HIGHLIGHTS;
	protected readonly focus = MARKET_FOCUS;
	protected readonly types = MARKET_TYPES;
	protected readonly capabilities = MARKET_CAPABILITIES;
	protected readonly businessModels = MARKET_BUSINESS_MODELS;
	protected readonly integrations = MARKET_INTEGRATIONS;
	protected readonly tech = MARKET_TECH;
	protected readonly steps = MARKET_STEPS;
	protected readonly reasons = MARKET_REASONS;
	protected readonly faqs = MARKET_FAQS;
	protected readonly related = MARKET_RELATED;

	constructor() {
		usePageTranslations('market');
		this._seoService.apply({
			...MARKET_META,
			path: '/market',
			mainEntity: `${SITE_ORIGIN}/market#service`,
			breadcrumbs: [
				{ name: 'Home', path: '/' },
				{ name: 'Marketplace & e-commerce development', path: '/market' },
			],
			jsonLd: [
				{
					'@type': 'Service',
					'@id': `${SITE_ORIGIN}/market#service`,
					image: MARKET_META.image,
					name: MARKET_META.title,
					description: MARKET_META.description,
					serviceType: 'Marketplace and e-commerce development',
					url: `${SITE_ORIGIN}/market`,
					provider: ORGANIZATION_REF,
					areaServed: 'Worldwide',
					keywords: MARKET_KEYWORDS.join(', '),
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
