import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ORGANIZATION_REF, SITE_ORIGIN, SeoService } from '../../services/seo.service';
import {
	VIRTUAL_TOUR_CARDS,
	VIRTUAL_TOUR_COPY,
	VIRTUAL_TOUR_EXAMPLES,
	VIRTUAL_TOUR_FAQS,
	VIRTUAL_TOUR_META,
	VIRTUAL_TOUR_STEPS,
} from './virtual-tour.const';

@Component({
	imports: [NgOptimizedImage, RouterLink, TranslatePipe],
	templateUrl: './virtual-tour.component.html',
	styleUrl: './virtual-tour.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualTourComponent {
	private readonly _seoService = inject(SeoService);

	protected readonly copy = VIRTUAL_TOUR_COPY;
	protected readonly examples = VIRTUAL_TOUR_EXAMPLES;
	protected readonly cards = VIRTUAL_TOUR_CARDS;
	protected readonly steps = VIRTUAL_TOUR_STEPS;
	protected readonly stepsColumns = 'lg:grid-cols-4';
	protected readonly faqs = VIRTUAL_TOUR_FAQS;

	constructor() {
		this._seoService.apply({
			...VIRTUAL_TOUR_META,
			path: '/virtual-tour',
			breadcrumbs: [
				{ name: 'Home', path: '/' },
				{ name: '360° virtual tour', path: '/virtual-tour' },
			],
			jsonLd: [
				{
					'@type': 'Service',
					name: VIRTUAL_TOUR_META.title,
					description: VIRTUAL_TOUR_META.description,
					serviceType: '360° virtual tour',
					url: `${SITE_ORIGIN}/virtual-tour`,
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
