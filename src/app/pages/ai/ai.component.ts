import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { usePageTranslations } from '../../feature/language/page-translations';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ORGANIZATION_REF, SITE_ORIGIN, SeoService } from '../../services/seo.service';
import {
	AI_FAQS,
	AI_HIGHLIGHTS,
	AI_KEYWORDS,
	AI_META,
	AI_PRINCIPLES,
	AI_REASONS,
	AI_RELATED,
	AI_SECURITY,
	AI_STEPS,
	AI_TYPES,
	AI_USE_CASES,
} from './ai.const';

@Component({
	imports: [RouterLink, TranslatePipe],
	templateUrl: './ai.component.html',
	styleUrl: './ai.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiComponent {
	private readonly _seoService = inject(SeoService);

	protected readonly highlights = AI_HIGHLIGHTS;
	protected readonly types = AI_TYPES;
	protected readonly useCases = AI_USE_CASES;
	protected readonly steps = AI_STEPS;
	protected readonly principles = AI_PRINCIPLES;
	protected readonly security = AI_SECURITY;
	protected readonly reasons = AI_REASONS;
	protected readonly faqs = AI_FAQS;
	protected readonly related = AI_RELATED;

	constructor() {
		usePageTranslations('ai');
		this._seoService.apply({
			...AI_META,
			path: '/ai',
			mainEntity: `${SITE_ORIGIN}/ai#service`,
			breadcrumbs: [
				{ name: 'Home', path: '/' },
				{ name: 'AI development & business automation', path: '/ai' },
			],
			jsonLd: [
				{
					'@type': 'Service',
					'@id': `${SITE_ORIGIN}/ai#service`,
					image: AI_META.image,
					name: AI_META.title,
					description: AI_META.description,
					serviceType: 'AI development and business automation',
					url: `${SITE_ORIGIN}/ai`,
					provider: ORGANIZATION_REF,
					areaServed: 'Worldwide',
					keywords: AI_KEYWORDS.join(', '),
				},
				{
					'@type': 'FAQPage',
					mainEntity: this.faqs.map((faq) => ({
						'@type': 'Question',
						name: faq.question,
						acceptedAnswer: { '@type': 'Answer', text: faq.answer },
					})),
				},
			],
		});
	}
}
