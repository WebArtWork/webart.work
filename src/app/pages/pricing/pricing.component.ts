import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslateService } from '@wawjs/ngx-translate';
import { ORGANIZATION_REF, SITE_ORIGIN, SeoService } from '../../services/seo.service';
import {
	OTHER_SOLUTIONS,
	PRICING_FAQS,
	PRICING_META,
	PRICING_NOTE,
	PRICING_TIERS,
} from './pricing.const';

@Component({
	imports: [RouterLink, TranslatePipe],
	templateUrl: './pricing.component.html',
	styleUrl: './pricing.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingComponent {
	private readonly _seoService = inject(SeoService);
	private readonly _translateService = inject(TranslateService);

	protected readonly tiers = PRICING_TIERS;
	protected readonly otherSolutions = OTHER_SOLUTIONS;
	protected readonly faqs = PRICING_FAQS;
	protected readonly note = PRICING_NOTE;

	constructor() {
		this._seoService.apply({
			...PRICING_META,
			path: '/pricing',
			breadcrumbs: [
				{ name: 'Home', path: '/' },
				{ name: 'Website Pricing', path: '/pricing' },
			],
			jsonLd: this._buildStructuredData(),
		});
	}

	private _buildStructuredData() {
		const t = (text: string) => this._translateService.translate(text)();

		return [
			{
				'@type': 'Service',
				name: t('Website Pricing'),
				description: t(PRICING_META.description),
				url: `${SITE_ORIGIN}/pricing`,
				provider: ORGANIZATION_REF,
				offers: this.tiers.map((tier) => ({
					'@type': 'Offer',
					name: t(tier.name),
					description: t(tier.tagline),
					price: tier.price.replace('$', ''),
					priceCurrency: 'USD',
					url: `${SITE_ORIGIN}/pricing`,
				})),
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
