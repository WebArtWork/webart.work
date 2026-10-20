import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal, untracked } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { MetaService } from '@wawjs/ngx-core';
import { LanguageService, TranslateService } from '@wawjs/ngx-translate';
import { environment } from '../../environments/environment';
import { SeoPage } from '../interfaces/seo-page.interface';

export const SITE_ORIGIN = 'https://webart.work';
export const ORGANIZATION_REF = { '@id': `${SITE_ORIGIN}/#organization` };

const WEBSITE_REF = { '@id': `${SITE_ORIGIN}/#website` };
const DESCRIPTION_LIMIT = 160;
const CARD_PREFIX = `${SITE_ORIGIN}/seo/`;
const TRANSLATED_SCHEMA_FIELDS = new Set([
	'name',
	'description',
	'text',
	'slogan',
	'caption',
	'serviceType',
]);
const OG_LOCALES: Record<string, string> = {
	en: 'en_US',
	uk: 'uk_UA',
	de: 'de_DE',
	fr: 'fr_FR',
	pl: 'pl_PL',
	ro: 'ro_RO',
	hu: 'hu_HU',
	el: 'el_GR',
	cs: 'cs_CZ',
	es: 'es_ES',
	it: 'it_IT',
	nl: 'nl_NL',
	pt: 'pt_PT',
	sv: 'sv_SE',
};

export const toAbsoluteUrl = (url: string) =>
	/^https?:\/\//.test(url) ? url : `${SITE_ORIGIN}${url.startsWith('/') ? '' : '/'}${url}`;

/** Generated 1200 × 630 share card for a route, see scripts/generate-seo.mjs. */
export const seoCardImage = (path: string) =>
	`${CARD_PREFIX}${path === '/' ? 'home' : path.slice(1).replaceAll('/', '-')}.jpg`;

export const truncateText = (text: string, maxLength = DESCRIPTION_LIMIT) => {
	const clean = text.replace(/\s+/g, ' ').trim();
	if (clean.length <= maxLength) {
		return clean;
	}

	const cut = clean.slice(0, maxLength - 1);
	const lastSpace = cut.lastIndexOf(' ');
	return `${(lastSpace > maxLength * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:]+$/, '')}…`;
};

/**
 * Single entry point for per-page SEO: title, description, share image, canonical,
 * Open Graph extras and JSON-LD. Writes through DOCUMENT so the prerendered HTML
 * that crawlers read first already carries the page-specific values.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
	private readonly _metaService = inject(MetaService);
	private readonly _meta = inject(Meta);
	private readonly _translateService = inject(TranslateService);
	private readonly _languageService = inject(LanguageService);
	private readonly _document = inject(DOCUMENT);

	private readonly _page = signal<SeoPage | null>(null);

	constructor() {
		// Re-render when translations load or the language changes.
		effect(() => {
			const page = this._page();
			if (page) {
				this._render(page);
			}
		});
	}

	apply(page: SeoPage) {
		this._page.set(page);
		untracked(() => this._render(page));
	}

	private _render(page: SeoPage) {
		const t = (text: string) => this._translateService.translate(text)();
		const url = this._url(page.path);
		const title = t(page.title);
		const description = truncateText(t(page.description));
		const image = toAbsoluteUrl(page.image ?? seoCardImage(page.path));
		const imageAlt = page.imageAlt ? t(page.imageAlt) : title;
		const language = this._language();

		this._metaService.applyMeta({
			title,
			titleSuffix: page.titleSuffix,
			description,
			image,
			robots: page.robots,
		});

		this._meta.updateTag({ property: 'og:url', content: url });
		this._meta.updateTag({ property: 'og:type', content: page.type ?? 'website' });
		this._meta.updateTag({ property: 'og:locale', content: OG_LOCALES[language] ?? 'en_US' });
		this._meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
		this._meta.updateTag({ property: 'og:image:alt', content: imageAlt });
		this._meta.updateTag({ name: 'twitter:image', content: image });
		this._meta.updateTag({ name: 'twitter:image:alt', content: imageAlt });

		if (image.startsWith(CARD_PREFIX)) {
			this._meta.updateTag({ property: 'og:image:width', content: '1200' });
			this._meta.updateTag({ property: 'og:image:height', content: '630' });
			this._meta.updateTag({ property: 'og:image:type', content: 'image/jpeg' });
		} else {
			this._meta.removeTag('property="og:image:width"');
			this._meta.removeTag('property="og:image:height"');
			this._meta.removeTag('property="og:image:type"');
		}

		this._setCanonical(url);
		this._setJsonLd(page, { url, title, description, image, imageAlt });
	}

	private _setCanonical(href: string) {
		let link = this._document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
		if (!link) {
			link = this._document.createElement('link');
			link.setAttribute('rel', 'canonical');
			this._document.head.appendChild(link);
		}
		link.setAttribute('href', href);
	}

	private _setJsonLd(
		page: SeoPage,
		resolved: {
			url: string;
			title: string;
			description: string;
			image: string;
			imageAlt: string;
		},
	) {
		const t = (text: string) => this._translateService.translate(text)();
		const imageRef = { '@id': `${resolved.url}#primaryimage` };
		const graph: Record<string, unknown>[] = [
			{
				'@type': 'ImageObject',
				...imageRef,
				url: resolved.image,
				contentUrl: resolved.image,
				caption: resolved.imageAlt,
				...(resolved.image.startsWith(CARD_PREFIX)
					? { width: 1200, height: 630, encodingFormat: 'image/jpeg' }
					: {}),
			},
			{
				'@type': 'Organization',
				...ORGANIZATION_REF,
				name: 'Web Art Work',
				url: SITE_ORIGIN,
				logo: `${SITE_ORIGIN}/logo.png`,
				image: seoCardImage('/'),
				description: t(
					"Web freelancer's community based in Ukraine with over 10 years in app and web development.",
				),
				sameAs: [
					'https://www.linkedin.com/company/wawjs',
					'https://www.upwork.com/agencies/webartwork/',
					'https://www.instagram.com/webart.work/',
				],
			},
			{
				'@type': 'WebSite',
				...WEBSITE_REF,
				name: 'Web Art Work',
				url: SITE_ORIGIN,
				publisher: ORGANIZATION_REF,
			},
			{
				'@type': page.type === 'profile' ? 'ProfilePage' : 'WebPage',
				'@id': `${resolved.url}#webpage`,
				url: resolved.url,
				name: resolved.title,
				description: resolved.description,
				isPartOf: WEBSITE_REF,
				primaryImageOfPage: imageRef,
				inLanguage: this._language(),
				...(page.mainEntity ? { mainEntity: { '@id': page.mainEntity } } : {}),
			},
		];

		if (page.breadcrumbs?.length) {
			graph.push({
				'@type': 'BreadcrumbList',
				itemListElement: page.breadcrumbs.map((crumb, index) => ({
					'@type': 'ListItem',
					position: index + 1,
					name: t(crumb.name),
					item: this._url(crumb.path),
				})),
			});
		}

		graph.push(
			...(page.jsonLd ?? []).map((entity) => ({
				...entity,
				...(page.mainEntity && entity['@id'] === page.mainEntity
					? { mainEntityOfPage: { '@id': `${resolved.url}#webpage` }, image: imageRef }
					: {}),
			})),
		);

		// Prerendered HTML already has the script; reuse it so hydration never duplicates it.
		let script = this._document.head.querySelector<HTMLScriptElement>(
			'script[type="application/ld+json"][data-ld="page"]',
		);
		if (!script) {
			script = this._document.createElement('script');
			script.type = 'application/ld+json';
			script.setAttribute('data-ld', 'page');
			this._document.head.appendChild(script);
		}
		script.text = JSON.stringify(
			{ '@context': 'https://schema.org', '@graph': graph },
			(key, value) =>
				TRANSLATED_SCHEMA_FIELDS.has(key) && typeof value === 'string' ? t(value) : value,
		);
	}

	private _url(path: string) {
		return path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
	}

	private _language() {
		const code = this._languageService.language() || environment.defaultLanguage;
		return environment.languages.find((language) => language.code === code)?.htmlLang ?? 'en';
	}
}
