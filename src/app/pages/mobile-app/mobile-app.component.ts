import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ORGANIZATION_REF, SITE_ORIGIN, SeoService } from '../../services/seo.service';
import {
	MOBILE_APP_CARDS,
	MOBILE_APP_COPY,
	MOBILE_APP_EXAMPLES,
	MOBILE_APP_FAQS,
	MOBILE_APP_META,
	MOBILE_APP_STEPS,
} from './mobile-app.const';

@Component({
	imports: [NgOptimizedImage, RouterLink, TranslatePipe],
	templateUrl: './mobile-app.component.html',
	styleUrl: './mobile-app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileAppComponent {
	private readonly _seoService = inject(SeoService);

	protected readonly copy = MOBILE_APP_COPY;
	protected readonly examples = MOBILE_APP_EXAMPLES;
	protected readonly cards = MOBILE_APP_CARDS;
	protected readonly steps = MOBILE_APP_STEPS;
	protected readonly stepsColumns = 'lg:grid-cols-3';
	protected readonly faqs = MOBILE_APP_FAQS;

	constructor() {
		this._seoService.apply({
			...MOBILE_APP_META,
			path: '/app',
			breadcrumbs: [
				{ name: 'Home', path: '/' },
				{ name: 'Mobile app development', path: '/app' },
			],
			jsonLd: [
				{
					'@type': 'Service',
					name: MOBILE_APP_META.title,
					description: MOBILE_APP_META.description,
					serviceType: 'Mobile app development',
					url: `${SITE_ORIGIN}/app`,
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
