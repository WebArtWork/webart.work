import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, PLATFORM_ID, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService, TranslateService } from '@wawjs/ngx-translate';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ORGANIZATION_REF, SITE_ORIGIN, SeoService } from '../../services/seo.service';
import {
	QUANTUM_AUDIENCES,
	QUANTUM_FAQS,
	QUANTUM_META,
	QUANTUM_STEPS,
	QUANTUM_USE_CASES,
} from './quantum.const';

const FIRST_VISIT_STORE_KEY = 'waw_visited';

@Component({
	imports: [RouterLink, TranslatePipe],
	templateUrl: './quantum.component.html',
	styleUrl: './quantum.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuantumComponent {
	private readonly _seoService = inject(SeoService);
	private readonly _translateService = inject(TranslateService);
	private readonly _languageService = inject(LanguageService);
	private readonly _platformId = inject(PLATFORM_ID);

	protected readonly audiences = QUANTUM_AUDIENCES;
	protected readonly useCases = QUANTUM_USE_CASES;
	protected readonly steps = QUANTUM_STEPS;
	protected readonly faqs = QUANTUM_FAQS;

	constructor() {
		this._seoService.apply({
			...QUANTUM_META,
			path: '/quantum',
			imageAlt: 'Quantum computing with IBM Quantum by Web Art Work',
			breadcrumbs: [
				{ name: 'Home', path: '/' },
				{ name: 'Quantum computing', path: '/quantum' },
			],
			jsonLd: this._buildStructuredData(),
		});
		this._setLanguageForFirstTimeVisitor();
	}

	private _setLanguageForFirstTimeVisitor() {
		if (!isPlatformBrowser(this._platformId)) {
			return;
		}

		if (localStorage.getItem(FIRST_VISIT_STORE_KEY)) {
			return;
		}

		localStorage.setItem(FIRST_VISIT_STORE_KEY, '1');
		void this._languageService.setLanguage('ua');
	}

	private _buildStructuredData() {
		const t = (text: string) => this._translateService.translate(text)();

		return [
			{
				'@type': 'Service',
				name: t(QUANTUM_META.title),
				description: t(QUANTUM_META.description),
				serviceType: 'Quantum computing integration',
				url: `${SITE_ORIGIN}/quantum`,
				provider: ORGANIZATION_REF,
				areaServed: 'Worldwide',
			},
			{
				'@type': 'FAQPage',
				mainEntity: this.faqs.map((faq) => ({
					'@type': 'Question',
					name: t(faq.question),
					acceptedAnswer: {
						'@type': 'Answer',
						text: t(faq.answer),
					},
				})),
			},
		];
	}
}
