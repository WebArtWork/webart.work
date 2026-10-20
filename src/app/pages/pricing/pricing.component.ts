import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslateService } from '@wawjs/ngx-translate';
import { ORGANIZATION_REF, SITE_ORIGIN, SeoService } from '../../services/seo.service';
import { PRICING_FAQS, PRICING_FEATURE_ROWS, PRICING_META, PRICING_TIERS } from './pricing.const';

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
	protected readonly featureRows = PRICING_FEATURE_ROWS;
	protected readonly faqs = PRICING_FAQS;

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

	protected isYes(value: unknown) {
		return value === true;
	}

	protected isNo(value: unknown) {
		return value === false;
	}

	protected isPartial(value: unknown) {
		return value === 'partial';
	}

	protected isText(value: unknown) {
		return typeof value === 'string' && value !== 'partial';
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
