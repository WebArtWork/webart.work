import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SeoService } from '../../services/seo.service';

@Component({
	templateUrl: './development.component.html',
	styleUrl: './development.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevelopmentComponent {
	private readonly _seoService = inject(SeoService);

	constructor() {
		this._seoService.apply({
			title: 'Development',
			description: 'What the Web Art Work team is building.',
			path: '/development',
			robots: 'noindex, nofollow',
		});
	}
}
