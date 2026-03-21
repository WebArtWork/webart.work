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
import { SERVICES } from '../../../data/service.const';

@Component({
	imports: [NgOptimizedImage, RouterLink],
	templateUrl: './service.component.html',
	styleUrl: './service.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceComponent {
	private readonly _platformId = inject(PLATFORM_ID);
	private readonly _route = inject(ActivatedRoute);
	private readonly _paramMap = toSignal(this._route.paramMap, {
		initialValue: this._route.snapshot.paramMap,
	});

	protected readonly service = computed(() =>
		SERVICES.find((service) => service.id === this._paramMap().get('id')),
	);
	protected readonly relatedServices = computed(() => {
		const service = this.service();
		if (!service) {
			return SERVICES.slice(0, 3);
		}

		return SERVICES.filter((item) => item.id !== service.id).slice(0, 3);
	});

	constructor() {
		effect(() => {
			this._paramMap();

			if (!isPlatformBrowser(this._platformId)) {
				return;
			}

			window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
		});
	}
}
