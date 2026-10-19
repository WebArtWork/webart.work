import { NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	PLATFORM_ID,
	computed,
	effect,
	inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateService } from '@wawjs/ngx-translate';
import { TranslatePipe } from '../../pipes/translate.pipe';
import {
	ORGANIZATION_REF,
	SITE_ORIGIN,
	SeoService,
	toAbsoluteUrl,
} from '../../services/seo.service';
import { SERVICES } from '../../../data/service.const';

/** Deeper solution pages for services that have one. */
const SERVICE_SOLUTIONS: Record<string, { path: string; label: string }> = {
	'web-development': { path: '/website', label: 'See how we build websites' },
	'mobile-development': { path: '/app', label: 'See how we build mobile apps' },
	'unity-development': { path: '/unity', label: 'See how we build Unity projects' },
	'augmented-virtual-reality-solutions': {
		path: '/virtual-tour',
		label: 'See our 360° virtual tours',
	},
};

@Component({
	imports: [NgOptimizedImage, RouterLink, TranslatePipe],
	templateUrl: './service.component.html',
	styleUrl: './service.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceComponent {
	private readonly _platformId = inject(PLATFORM_ID);
	private readonly _route = inject(ActivatedRoute);
	private readonly _seoService = inject(SeoService);
	private readonly _translateService = inject(TranslateService);
	private readonly _paramMap = toSignal(this._route.paramMap, {
		initialValue: this._route.snapshot.paramMap,
	});

	protected readonly service = computed(() =>
		SERVICES.find((service) => service.id === this._paramMap().get('id')),
	);
	protected readonly solution = computed(() => {
		const id = this.service()?.id;
		return id ? SERVICE_SOLUTIONS[id] : undefined;
	});
	protected readonly relatedServices = computed(() => {
		const service = this.service();
		if (!service) {
			return SERVICES.slice(0, 3);
		}

		return SERVICES.filter((item) => item.id !== service.id).slice(0, 3);
	});

	constructor() {
		effect(() => {
			const service = this.service();

			if (!service) {
				return;
			}

			const t = (text: string) => this._translateService.translate(text)();
			const path = `/service/${service.id}`;
			const name = /(Services|Solutions)$/.test(service.title)
				? service.title
				: `${service.title} Services`;
			const description = `${t(service.description)} Expertise: ${service.tags.slice(0, 3).join(', ')}. Free consultation.`;

			this._seoService.apply({
				title: name,
				description,
				path,
				mainEntity: `${SITE_ORIGIN}${path}#service`,
				imageAlt: service.title,
				breadcrumbs: [
					{ name: 'Home', path: '/' },
					{ name: service.title, path },
				],
				jsonLd: [
					{
						'@type': 'Service',
						'@id': `${SITE_ORIGIN}${path}#service`,
						name: t(service.title),
						serviceType: service.title,
						description: t(service.description),
						url: `${SITE_ORIGIN}${path}`,
						image: toAbsoluteUrl(service.image),
						provider: ORGANIZATION_REF,
						areaServed: 'Worldwide',
						keywords: service.tags.join(', '),
						hasOfferCatalog: {
							'@type': 'OfferCatalog',
							name: t(service.title),
							itemListElement: service.sections.map((section) => ({
								'@type': 'Offer',
								itemOffered: {
									'@type': 'Service',
									name: t(section.title),
									description: t(section.description),
								},
							})),
						},
					},
				],
			});
		});

		effect(() => {
			this._paramMap();

			if (!isPlatformBrowser(this._platformId)) {
				return;
			}

			window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
		});
	}
}
