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
import { practices } from '../../../data/practice.const';

@Component({
	imports: [NgOptimizedImage, RouterLink],
	templateUrl: './intern.component.html',
	styleUrl: './intern.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternComponent {
	private readonly _platformId = inject(PLATFORM_ID);
	private readonly _route = inject(ActivatedRoute);
	private readonly _paramMap = toSignal(this._route.paramMap, {
		initialValue: this._route.snapshot.paramMap,
	});

	protected readonly practice = computed(() =>
		practices.find((practice) => practice.id === this._paramMap().get('id')),
	);
	protected readonly descriptionParagraphs = computed(
		() =>
			this.practice()
				?.description.split('\n\n')
				.map((paragraph) => paragraph.trim())
				.filter(Boolean) ?? [],
	);
	protected readonly details = computed(() => {
		const practice = this.practice();
		if (!practice) {
			return [];
		}

		return [
			{ icon: 'workspace_premium', label: 'Grade', value: practice.grade },
			{ icon: 'monitoring', label: 'Activity', value: practice.activity },
			{ icon: 'payments', label: 'Salary', value: practice.salary },
			{ icon: 'location_on', label: 'Location', value: practice.location },
			{ icon: 'calendar_month', label: 'Period', value: practice.calendar },
		].filter((detail) => detail.value);
	});
	protected readonly contacts = computed(() => {
		const practice = this.practice();
		if (!practice) {
			return [];
		}

		return [
			{
				icon: 'mail',
				label: 'Email',
				value: practice.email,
				href: practice.email ? `mailto:${practice.email}` : null,
			},
			{
				icon: 'call',
				label: 'Phone',
				value: practice.phone,
				href: practice.phone ? `tel:${practice.phone.replace(/\s+/g, '')}` : null,
			},
			{
				icon: 'badge',
				label: 'Role',
				value: practice.role,
				href: null,
			},
		].filter((contact) => contact.value);
	});
	protected readonly relatedPractices = computed(() => {
		const practice = this.practice();
		if (!practice) {
			return practices.slice(0, 3);
		}

		return practices.filter((item) => item.id !== practice.id).slice(0, 3);
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

	protected getThumb(practice: (typeof practices)[number]) {
		return practice.thumb ?? '/img/avatar.png';
	}
}
