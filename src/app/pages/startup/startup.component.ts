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
import { MetaService } from '@wawjs/ngx-core';
import { TranslatePipe } from '../../pipes/translate.pipe';
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
	private readonly _metaService = inject(MetaService);
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

			this._metaService.applyMeta({
				title: startup.name,
				description: startup.description,
				image: this._toAbsoluteUrl(startup.image),
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

	private _toAbsoluteUrl(url: string) {
		return url.startsWith('http://') || url.startsWith('https://')
			? url
			: `https://webart.work${url}`;
	}
}
