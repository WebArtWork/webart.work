import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ORGANIZATION_REF, SITE_ORIGIN, SeoService } from '../../services/seo.service';
import {
	UNITY_CARDS,
	UNITY_COPY,
	UNITY_EXAMPLES,
	UNITY_FAQS,
	UNITY_META,
	UNITY_STEPS,
} from './unity.const';

@Component({
	imports: [NgOptimizedImage, RouterLink, TranslatePipe],
	templateUrl: './unity.component.html',
	styleUrl: './unity.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnityComponent {
	private readonly _seoService = inject(SeoService);

	protected readonly copy = UNITY_COPY;
	protected readonly examples = UNITY_EXAMPLES;
	protected readonly cards = UNITY_CARDS;
	protected readonly steps = UNITY_STEPS;
	protected readonly stepsColumns = 'lg:grid-cols-3';
	protected readonly faqs = UNITY_FAQS;

	constructor() {
		this._seoService.apply({
			...UNITY_META,
			path: '/unity',
			breadcrumbs: [
				{ name: 'Home', path: '/' },
				{ name: 'Unity development', path: '/unity' },
			],
			jsonLd: [
				{
					'@type': 'Service',
					name: UNITY_META.title,
					description: UNITY_META.description,
					serviceType: 'Unity development',
					url: `${SITE_ORIGIN}/unity`,
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
