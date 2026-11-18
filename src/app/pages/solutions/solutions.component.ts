import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { SITE_ORIGIN, SeoService } from '../../services/seo.service';
import { SOLUTIONS, SOLUTIONS_META } from '../../../data/solution.const';

@Component({
	imports: [NgOptimizedImage, RouterLink, TranslatePipe],
	templateUrl: './solutions.component.html',
	styleUrl: './solutions.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionsComponent {
	private readonly _seoService = inject(SeoService);

	protected readonly solutions = SOLUTIONS;

	constructor() {
		this._seoService.apply({
			...SOLUTIONS_META,
			path: '/solutions',
			schemaType: 'CollectionPage',
			mainEntity: `${SITE_ORIGIN}/solutions#list`,
			breadcrumbs: [
				{ name: 'Home', path: '/' },
				{ name: 'What we build in depth', path: '/solutions' },
			],
			jsonLd: [
				{
					'@type': 'ItemList',
					'@id': `${SITE_ORIGIN}/solutions#list`,
					numberOfItems: SOLUTIONS.length,
					name: 'Web Art Work solutions',
					itemListElement: SOLUTIONS.map((solution, index) => ({
						'@type': 'ListItem',
						position: index + 1,
						name: solution.title,
						url: `${SITE_ORIGIN}${solution.path}`,
					})),
				},
			],
		});
	}
}
