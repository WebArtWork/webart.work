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
import { TranslatePipe } from '../../pipes/translate.pipe';
import {
	ORGANIZATION_REF,
	SITE_ORIGIN,
	SeoService,
	toAbsoluteUrl,
} from '../../services/seo.service';
import { STARTUPS } from '../../../data/startup.const';

@Component({
	imports: [NgOptimizedImage, RouterLink, TranslatePipe],
	templateUrl: './startup.component.html',
	styleUrl: './startup.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartupComponent {
	private readonly _platformId = inject(PLATFORM_ID);
	private readonly _route = inject(ActivatedRoute);
	private readonly _seoService = inject(SeoService);
	private readonly _paramMap = toSignal(this._route.paramMap, {
		initialValue: this._route.snapshot.paramMap,
	});

	protected readonly startup = computed(() =>
		STARTUPS.find((startup) => startup.id === this._paramMap().get('id')),
	);
	protected readonly websiteHref = computed(() => {
		const website = this.startup()?.website;
		return website ? `https://${website}` : '';
	});
	protected readonly relatedStartups = computed(() => {
		const startup = this.startup();
		if (!startup) {
			return STARTUPS.slice(0, 3);
		}

		return STARTUPS.filter((item) => item.id !== startup.id).slice(0, 3);
	});

	constructor() {
		effect(() => {
			const startup = this.startup();

			if (!startup) {
				return;
			}

			const path = `/startup/${startup.id}`;
			const website = this.websiteHref();

			this._seoService.apply({
				title: `${startup.name}: ${startup.tagline}`,
				description: startup.description,
				path,
				mainEntity: `${SITE_ORIGIN}${path}#organization`,
				imageAlt: `${startup.name} by Web Art Work`,
				breadcrumbs: [
					{ name: 'Home', path: '/' },
					{ name: 'Startups', path: '/startups' },
					{ name: startup.name, path },
				],
				jsonLd: [
					{
						'@type': 'Organization',
						'@id': `${SITE_ORIGIN}${path}#organization`,
						name: startup.name,
						slogan: startup.tagline,
						description: startup.description,
						logo: toAbsoluteUrl(startup.image),
						url: website || `${SITE_ORIGIN}${path}`,
						...(website ? { sameAs: [website] } : {}),
						parentOrganization: ORGANIZATION_REF,
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
