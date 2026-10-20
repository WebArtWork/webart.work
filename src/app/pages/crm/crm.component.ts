import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { usePageTranslations } from '../../feature/language/page-translations';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ORGANIZATION_REF, SITE_ORIGIN, SeoService } from '../../services/seo.service';
import {
	CRM_AUTOMATION_EXAMPLES,
	CRM_CAPABILITIES,
	CRM_DEPLOYMENT,
	CRM_FAQS,
	CRM_FOCUS,
	CRM_HIGHLIGHTS,
	CRM_INTEGRATIONS,
	CRM_KEYWORDS,
	CRM_META,
	CRM_PHASES,
	CRM_REASONS,
	CRM_RELATED,
	CRM_STEPS,
	CRM_TECH,
	CRM_TYPES,
} from './crm.const';

@Component({
	imports: [RouterLink, TranslatePipe],
	templateUrl: './crm.component.html',
	styleUrl: './crm.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrmComponent {
	private readonly _seoService = inject(SeoService);

	protected readonly highlights = CRM_HIGHLIGHTS;
	protected readonly focus = CRM_FOCUS;
	protected readonly types = CRM_TYPES;
	protected readonly capabilities = CRM_CAPABILITIES;
	protected readonly automationExamples = CRM_AUTOMATION_EXAMPLES;
	protected readonly deployment = CRM_DEPLOYMENT;
	protected readonly integrations = CRM_INTEGRATIONS;
	protected readonly tech = CRM_TECH;
	protected readonly phases = CRM_PHASES;
	protected readonly steps = CRM_STEPS;
	protected readonly reasons = CRM_REASONS;
	protected readonly faqs = CRM_FAQS;
	protected readonly related = CRM_RELATED;

	constructor() {
		usePageTranslations('crm');
		this._seoService.apply({
			...CRM_META,
			path: '/crm',
			mainEntity: `${SITE_ORIGIN}/crm#service`,
			breadcrumbs: [
				{ name: 'Home', path: '/' },
				{ name: 'CRM & business software development', path: '/crm' },
			],
			jsonLd: [
				{
					'@type': 'Service',
					'@id': `${SITE_ORIGIN}/crm#service`,
					image: CRM_META.image,
					name: CRM_META.title,
					description: CRM_META.description,
					serviceType: 'CRM and business management software development',
					url: `${SITE_ORIGIN}/crm`,
					provider: ORGANIZATION_REF,
					areaServed: 'Worldwide',
					keywords: CRM_KEYWORDS.join(', '),
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
