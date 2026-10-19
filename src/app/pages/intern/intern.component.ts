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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LanguageService, TranslateService } from '@wawjs/ngx-translate';
import { TranslatePipe } from '../../pipes/translate.pipe';
import {
	ORGANIZATION_REF,
	SITE_ORIGIN,
	SeoService,
	toAbsoluteUrl,
} from '../../services/seo.service';
import { environment } from '../../../environments/environment';
import { practices } from '../../../data/practice.const';

@Component({
	imports: [NgOptimizedImage, RouterLink, TranslatePipe],
	templateUrl: './intern.component.html',
	styleUrl: './intern.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternComponent {
	private readonly _languageService = inject(LanguageService);
	private readonly _seoService = inject(SeoService);
	private readonly _platformId = inject(PLATFORM_ID);
	private readonly _route = inject(ActivatedRoute);
	private readonly _router = inject(Router);
	private readonly _translateService = inject(TranslateService);
	private readonly _paramMap = toSignal(this._route.paramMap, {
		initialValue: this._route.snapshot.paramMap,
	});
	private readonly _locale = computed(() => {
		const currentLang = this._languageService.language();
		const langConfig = environment.languages.find((l) => l.code === currentLang);
		return langConfig?.htmlLang || 'en';
	});
	private readonly _routeId = computed(() => this._paramMap().get('id'));

	protected readonly practice = computed(() =>
		practices.find((practice) => [practice.id, practice.url].includes(this._routeId() ?? '')),
	);
	protected readonly descriptionParagraphs = computed(() => {
		const description = this.practice()?.description;
		if (!description) {
			return [];
		}

		return this._translateService
			.translate(description)()
			.split('\n\n')
			.map((paragraph) => paragraph.trim())
			.filter(Boolean);
	});
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
			{ icon: 'calendar_month', label: 'Period', value: this._getPeriod(practice) },
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
			const practice = this.practice();

			if (!practice) {
				return;
			}

			const path = `/intern/${practice.id}`;
			const image = toAbsoluteUrl(this.getThumb(practice));
			const title = practice.role ? `${practice.name}, ${practice.role}` : practice.name;

			this._seoService.apply({
				title,
				description: `${practice.name} completed a Web Art Work internship${practice.role ? ` as a ${practice.role}` : ''}. ${this.descriptionParagraphs()[0] ?? ''}`,
				path,
				mainEntity: `${SITE_ORIGIN}${path}#person`,
				image,
				imageAlt: practice.name,
				type: 'profile',
				breadcrumbs: [
					{ name: 'Home', path: '/' },
					{ name: practice.name, path },
				],
				jsonLd: [
					{
						'@type': 'Person',
						'@id': `${SITE_ORIGIN}${path}#person`,
						name: practice.name,
						...(practice.role ? { jobTitle: practice.role } : {}),
						image,
						...(practice.location ? { homeLocation: practice.location } : {}),
						alumniOf: ORGANIZATION_REF,
					},
				],
			});
		});

		effect(() => {
			const routeId = this._routeId();
			const practice = this.practice();

			if (!isPlatformBrowser(this._platformId)) {
				return;
			}

			if (practice && routeId && routeId !== practice.id) {
				this._router.navigate(['/intern', practice.id], { replaceUrl: true });
				return;
			}

			window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
		});
	}

	protected getThumb(practice: (typeof practices)[number]) {
		return practice.thumb ?? '/img/avatar.png';
	}

	private _getPeriod(practice: (typeof practices)[number]) {
		if (practice.start && practice.finish) {
			const start = this._formatDate(practice.start);
			const finish = this._formatDate(practice.finish);

			if (start && finish) {
				return `${start} - ${finish}`;
			}
		}

		return practice.calendar ?? null;
	}

	private _formatDate(value: string) {
		const date = new Date(value);

		if (Number.isNaN(date.getTime())) {
			return null;
		}

		return new Intl.DateTimeFormat(this._locale(), {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		}).format(date);
	}
}
