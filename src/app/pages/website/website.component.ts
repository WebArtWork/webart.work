import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ORGANIZATION_REF, SITE_ORIGIN, SeoService } from '../../services/seo.service';
import {
	WEBSITE_CARDS,
	WEBSITE_COPY,
	WEBSITE_EXAMPLES,
	WEBSITE_FAQS,
	WEBSITE_META,
	WEBSITE_STEPS,
} from './website.const';

@Component({
	imports: [NgOptimizedImage, RouterLink, TranslatePipe],
	templateUrl: './website.component.html',
	styleUrl: './website.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebsiteComponent {
	private readonly _seoService = inject(SeoService);

	protected readonly copy = WEBSITE_COPY;
	protected readonly examples = WEBSITE_EXAMPLES;
	protected readonly cards = WEBSITE_CARDS;
	protected readonly steps = WEBSITE_STEPS;
	protected readonly stepsColumns = 'lg:grid-cols-3';
	protected readonly faqs = WEBSITE_FAQS;

	constructor() {
		this._seoService.apply({
			...WEBSITE_META,
			path: '/website',
			breadcrumbs: [
				{ name: 'Home', path: '/' },
				{ name: 'Website development', path: '/website' },
			],
			jsonLd: [
				{
					'@type': 'Service',
					name: WEBSITE_META.title,
					description: WEBSITE_META.description,
					serviceType: 'Website development',
					url: `${SITE_ORIGIN}/website`,
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
