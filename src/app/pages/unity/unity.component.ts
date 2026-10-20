import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { usePageTranslations } from '../../feature/language/page-translations';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ORGANIZATION_REF, SITE_ORIGIN, SeoService } from '../../services/seo.service';
import {
	ENGINE_DOCS_URL,
	ENGINE_GITHUB_URL,
	ENGINE_URL,
	UNITY_BACKEND,
	UNITY_BUILDS,
	UNITY_CAMERAS,
	UNITY_ENGINE_BENEFITS,
	UNITY_ENGINE_LAYERS,
	UNITY_ENGINE_PARTS,
	UNITY_ENGINE_STATS,
	UNITY_FAQS,
	UNITY_HIGHLIGHTS,
	UNITY_INDUSTRIES,
	UNITY_KEYWORDS,
	UNITY_META,
	UNITY_PLATFORMS,
	UNITY_PROJECTS,
	UNITY_REASONS,
	UNITY_RELATED,
	UNITY_SCENE_USES,
	UNITY_SCOPE,
	UNITY_SERVICES,
	UNITY_STEPS,
	UNITY_TECH,
} from './unity.const';

@Component({
	imports: [NgOptimizedImage, RouterLink, TranslatePipe],
	templateUrl: './unity.component.html',
	styleUrl: './unity.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnityComponent {
	private readonly _seoService = inject(SeoService);

	protected readonly engineUrl = ENGINE_URL;
	protected readonly docsUrl = ENGINE_DOCS_URL;
	protected readonly githubUrl = ENGINE_GITHUB_URL;
	protected readonly highlights = UNITY_HIGHLIGHTS;
	protected readonly scope = UNITY_SCOPE;
	protected readonly builds = UNITY_BUILDS;
	protected readonly engineStats = UNITY_ENGINE_STATS;
	protected readonly engineLayers = UNITY_ENGINE_LAYERS;
	protected readonly engineParts = UNITY_ENGINE_PARTS;
	protected readonly cameras = UNITY_CAMERAS;
	protected readonly sceneUses = UNITY_SCENE_USES;
	protected readonly engineBenefits = UNITY_ENGINE_BENEFITS;
	protected readonly projects = UNITY_PROJECTS;
	protected readonly services = UNITY_SERVICES;
	protected readonly industries = UNITY_INDUSTRIES;
	protected readonly platforms = UNITY_PLATFORMS;
	protected readonly backend = UNITY_BACKEND;
	protected readonly tech = UNITY_TECH;
	protected readonly steps = UNITY_STEPS;
	protected readonly reasons = UNITY_REASONS;
	protected readonly faqs = UNITY_FAQS;
	protected readonly related = UNITY_RELATED;
	// Sample from 3d-scene-schema, shown as-is.
	protected readonly sceneJson = JSON.stringify(
		{
			id: 'anchor_door_entry',
			type: 'DOOR_FRAME',
			parentId: 'anchor_wall_north',
			transform: { position: { x: 1.5, y: 0, z: -3.0 } },
		},
		null,
		2,
	);

	constructor() {
		usePageTranslations('unity');
		this._seoService.apply({
			...UNITY_META,
			path: '/unity',
			mainEntity: `${SITE_ORIGIN}/unity#service`,
			breadcrumbs: [
				{ name: 'Home', path: '/' },
				{ name: 'Unity development', path: '/unity' },
			],
			jsonLd: [
				{
					'@type': 'Service',
					'@id': `${SITE_ORIGIN}/unity#service`,
					image: UNITY_META.image,
					name: UNITY_META.title,
					description: UNITY_META.description,
					serviceType: 'Unity development',
					url: `${SITE_ORIGIN}/unity`,
					provider: ORGANIZATION_REF,
					areaServed: 'Worldwide',
					keywords: UNITY_KEYWORDS.join(', '),
					hasOfferCatalog: {
						'@type': 'OfferCatalog',
						name: 'Unity development services',
						itemListElement: this.services.map((service) => ({
							'@type': 'Offer',
							itemOffered: { '@type': 'Service', name: service.title, description: service.text },
						})),
					},
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
