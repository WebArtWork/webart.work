import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { SITE_ORIGIN, SeoService } from '../../services/seo.service';
import { STARTUPS, STARTUPS_META } from '../../../data/startup.const';

@Component({
	imports: [NgOptimizedImage, RouterLink, TranslatePipe],
	templateUrl: './startups.component.html',
	styleUrl: './startups.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartupsComponent {
	private readonly _seoService = inject(SeoService);

	protected readonly startups = STARTUPS;

	constructor() {
		this._seoService.apply({
			...STARTUPS_META,
			path: '/startups',
			breadcrumbs: [
				{ name: 'Home', path: '/' },
				{ name: 'Startups', path: '/startups' },
			],
			jsonLd: [
				{
					'@type': 'ItemList',
					name: 'Web Art Work startups',
					itemListElement: STARTUPS.map((startup, index) => ({
						'@type': 'ListItem',
						position: index + 1,
						name: startup.name,
						url: `${SITE_ORIGIN}/startup/${startup.id}`,
					})),
				},
			],
		});
	}
}
