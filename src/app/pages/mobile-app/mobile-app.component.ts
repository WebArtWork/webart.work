import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { usePageTranslations } from '../../feature/language/page-translations';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ORGANIZATION_REF, SITE_ORIGIN, SeoService } from '../../services/seo.service';
import {
	MOBILE_APP_AUDIENCES,
	MOBILE_APP_BACKEND,
	MOBILE_APP_DELIVERABLES,
	MOBILE_APP_DESIGN,
	MOBILE_APP_FAQS,
	MOBILE_APP_FEATURES,
	MOBILE_APP_HIGHLIGHTS,
	MOBILE_APP_KEYWORDS,
	MOBILE_APP_META,
	MOBILE_APP_PHASES,
	MOBILE_APP_PLATFORMS,
	MOBILE_APP_PRODUCTS,
	MOBILE_APP_REASONS,
	MOBILE_APP_RELATED,
	MOBILE_APP_SERVICES,
	MOBILE_APP_STEPS,
	MOBILE_APP_TECH,
	MOBILE_APP_TYPES,
} from './mobile-app.const';

@Component({
	imports: [NgOptimizedImage, RouterLink, TranslatePipe],
	templateUrl: './mobile-app.component.html',
	styleUrl: './mobile-app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileAppComponent {
	private readonly _seoService = inject(SeoService);

	protected readonly highlights = MOBILE_APP_HIGHLIGHTS;
	protected readonly deliverables = MOBILE_APP_DELIVERABLES;
	protected readonly products = MOBILE_APP_PRODUCTS;
	protected readonly types = MOBILE_APP_TYPES;
	protected readonly services = MOBILE_APP_SERVICES;
	protected readonly platforms = MOBILE_APP_PLATFORMS;
	protected readonly features = MOBILE_APP_FEATURES;
	protected readonly audiences = MOBILE_APP_AUDIENCES;
	protected readonly design = MOBILE_APP_DESIGN;
	protected readonly backend = MOBILE_APP_BACKEND;
	protected readonly tech = MOBILE_APP_TECH;
	protected readonly steps = MOBILE_APP_STEPS;
	protected readonly phases = MOBILE_APP_PHASES;
	protected readonly reasons = MOBILE_APP_REASONS;
	protected readonly faqs = MOBILE_APP_FAQS;
	protected readonly related = MOBILE_APP_RELATED;

	constructor() {
		usePageTranslations('app');
		this._seoService.apply({
			...MOBILE_APP_META,
			path: '/app',
			mainEntity: `${SITE_ORIGIN}/app#service`,
			breadcrumbs: [
				{ name: 'Home', path: '/' },
				{ name: 'Mobile app development', path: '/app' },
			],
			jsonLd: [
				{
					'@type': 'Service',
					'@id': `${SITE_ORIGIN}/app#service`,
					image: MOBILE_APP_META.image,
					name: MOBILE_APP_META.title,
					description: MOBILE_APP_META.description,
					serviceType: 'Mobile app development',
					url: `${SITE_ORIGIN}/app`,
					provider: ORGANIZATION_REF,
					areaServed: 'Worldwide',
					keywords: MOBILE_APP_KEYWORDS.join(', '),
					hasOfferCatalog: {
						'@type': 'OfferCatalog',
						name: 'Mobile app development services',
						itemListElement: this.services.map((service) => ({
							'@type': 'Offer',
							itemOffered: { '@type': 'Service', name: service.title, description: service.text },
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
