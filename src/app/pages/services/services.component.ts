import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { SITE_ORIGIN, SeoService } from '../../services/seo.service';
import { SERVICES, SERVICES_META, SERVICE_GROUPS } from '../../../data/service.const';

@Component({
	imports: [NgOptimizedImage, RouterLink, TranslatePipe],
	templateUrl: './services.component.html',
	styleUrl: './services.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {
	private readonly _seoService = inject(SeoService);

	protected readonly groups = SERVICE_GROUPS.map((group) => ({
		...group,
		services: group.serviceIds.map((id) => SERVICES.find((service) => service.id === id)!),
	}));

	constructor() {
		this._seoService.apply({
			...SERVICES_META,
			path: '/services',
			breadcrumbs: [
				{ name: 'Home', path: '/' },
				{ name: 'Our Services', path: '/services' },
			],
			jsonLd: [
				{
					'@type': 'ItemList',
					name: 'Development & business services',
					itemListElement: SERVICES.map((service, index) => ({
						'@type': 'ListItem',
						position: index + 1,
						name: service.title,
						url: `${SITE_ORIGIN}/service/${service.id}`,
					})),
				},
			],
		});
	}
}
