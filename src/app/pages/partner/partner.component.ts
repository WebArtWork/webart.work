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
import { TranslatePipe } from 'wacom';
import { PARTNERS } from '../../../data/partner.const';

@Component({
	imports: [NgOptimizedImage, RouterLink, TranslatePipe],
	templateUrl: './partner.component.html',
	styleUrl: './partner.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartnerComponent {
	private readonly _platformId = inject(PLATFORM_ID);
	private readonly _route = inject(ActivatedRoute);
	private readonly _paramMap = toSignal(this._route.paramMap, {
		initialValue: this._route.snapshot.paramMap,
	});

	protected readonly partner = computed(() =>
		PARTNERS.find((partner) => partner.id === this._paramMap().get('id')),
	);
	protected readonly infoCards = computed(() => {
		const partner = this.partner();
		if (!partner) {
			return [];
		}

		return [
			{
				icon: 'language',
				label: 'Website',
				value: partner.website,
				href: this._getWebsiteHref(partner.website),
			},
			{
				icon: 'photo_camera',
				label: 'Instagram',
				value: partner.instagram ? `@${partner.instagram}` : '',
				href: partner.instagram ? `https://instagram.com/${partner.instagram}` : '',
			},
			{
				icon: 'location_on',
				label: 'Location',
				value: partner.place ? 'Open in Google Maps' : '',
				href: partner.place,
			},
			{
				icon: 'android',
				label: 'Android',
				value: partner.android ? 'Open app' : '',
				href: partner.android,
			},
			{
				icon: 'phone_iphone',
				label: 'iOS',
				value: partner.ios ? 'Open App Store' : '',
				href: partner.ios,
			},
		].filter((item) => item.value && item.href);
	});
	protected readonly websiteHref = computed(() =>
		this._getWebsiteHref(this.partner()?.website ?? ''),
	);
	protected readonly storySections = computed(() => {
		const partner = this.partner();
		if (!partner) {
			return [];
		}

		return [
			{
				title: partner.name,
				body: partner.description,
			},
			{
				title: 'Our Role',
				body: partner.ourrole,
			},
		].filter((section) => section.body);
	});
	protected readonly relatedPartners = computed(() => {
		const partner = this.partner();
		if (!partner) {
			return PARTNERS.slice(0, 3);
		}

		return PARTNERS.filter((item) => item.id !== partner.id).slice(0, 3);
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

	private _getWebsiteHref(website: string) {
		if (!website) {
			return '';
		}

		return website.startsWith('http://') || website.startsWith('https://')
			? website
			: `https://${website}`;
	}
}
