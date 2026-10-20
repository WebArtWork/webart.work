import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { usePageTranslations } from '../../feature/language/page-translations';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ORGANIZATION_REF, SITE_ORIGIN, SeoService } from '../../services/seo.service';
import {
	WEBSITE_FAQS,
	WEBSITE_FOCUS,
	WEBSITE_HIGHLIGHTS,
	WEBSITE_INTEGRATIONS,
	WEBSITE_KEYWORDS,
	WEBSITE_META,
	WEBSITE_PACKAGES,
	WEBSITE_PROJECTS,
	WEBSITE_QUALITIES,
	WEBSITE_REASONS,
	WEBSITE_RELATED,
	WEBSITE_SERVICES,
	WEBSITE_STEPS,
	WEBSITE_STYLES,
	WEBSITE_TECH,
	WEBSITE_TYPES,
} from './website.const';

@Component({
	imports: [NgOptimizedImage, RouterLink, TranslatePipe],
	templateUrl: './website.component.html',
	styleUrl: './website.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebsiteComponent {
	private readonly _seoService = inject(SeoService);

	protected readonly highlights = WEBSITE_HIGHLIGHTS;
	protected readonly projects = WEBSITE_PROJECTS;
	protected readonly focus = WEBSITE_FOCUS;
	protected readonly types = WEBSITE_TYPES;
	protected readonly styles = WEBSITE_STYLES;
	protected readonly qualities = WEBSITE_QUALITIES;
	protected readonly integrations = WEBSITE_INTEGRATIONS;
	protected readonly tech = WEBSITE_TECH;
	protected readonly services = WEBSITE_SERVICES;
	protected readonly steps = WEBSITE_STEPS;
	protected readonly packages = WEBSITE_PACKAGES;
	protected readonly reasons = WEBSITE_REASONS;
	protected readonly faqs = WEBSITE_FAQS;
	protected readonly related = WEBSITE_RELATED;

	constructor() {
		usePageTranslations('website');
		this._seoService.apply({
			...WEBSITE_META,
			path: '/website',
			mainEntity: `${SITE_ORIGIN}/website#service`,
			breadcrumbs: [
				{ name: 'Home', path: '/' },
				{ name: 'Website development', path: '/website' },
			],
			jsonLd: [
				{
					'@type': 'Service',
					'@id': `${SITE_ORIGIN}/website#service`,
					image: WEBSITE_META.image,
					name: WEBSITE_META.title,
					description: WEBSITE_META.description,
					serviceType: 'Website development',
					url: `${SITE_ORIGIN}/website`,
					provider: ORGANIZATION_REF,
					areaServed: 'Worldwide',
					keywords: WEBSITE_KEYWORDS.join(', '),
					offers: WEBSITE_PACKAGES.filter((item) => item.price.startsWith('from $')).map(
						(item) => ({
							'@type': 'Offer',
							name: item.name,
							price: item.price.replace('from $', ''),
							priceCurrency: 'USD',
							url: `${SITE_ORIGIN}/pricing`,
						}),
					),
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
