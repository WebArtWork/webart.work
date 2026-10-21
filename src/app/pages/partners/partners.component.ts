import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { SITE_ORIGIN, SeoService } from '../../services/seo.service';
import { PARTNERS, PARTNERS_META } from '../../../data/partner.const';

@Component({
	imports: [NgOptimizedImage, RouterLink, TranslatePipe],
	templateUrl: './partners.component.html',
	styleUrl: './partners.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartnersComponent {
	private readonly _seoService = inject(SeoService);

	protected readonly partners = PARTNERS;

	constructor() {
		this._seoService.apply({
			...PARTNERS_META,
			path: '/partners',
			breadcrumbs: [
				{ name: 'Home', path: '/' },
				{ name: 'Our partners', path: '/partners' },
			],
			jsonLd: [
				{
					'@type': 'ItemList',
					name: 'Web Art Work partners',
					itemListElement: PARTNERS.map((partner, index) => ({
						'@type': 'ListItem',
						position: index + 1,
						name: partner.name,
						url: `${SITE_ORIGIN}/partner/${partner.id}`,
					})),
				},
			],
		});
	}
}
