import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

const ORIGIN = 'https://webart.work';

/**
 * Updates the canonical <link> tag directly via DOCUMENT rather than
 * MetaService.setLink(), which is a browser-only no-op and would leave the
 * prerendered/SSR HTML (what crawlers see first) pointing at the homepage.
 */
@Injectable({ providedIn: 'root' })
export class CanonicalService {
	private readonly _router = inject(Router);
	private readonly _document = inject(DOCUMENT);

	sync() {
		const path = this._router.url.split('?')[0].split('#')[0];
		const href = path === '/' ? ORIGIN : `${ORIGIN}${path}`;

		let link = this._document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
		if (!link) {
			link = this._document.createElement('link');
			link.setAttribute('rel', 'canonical');
			this._document.head.appendChild(link);
		}
		link.setAttribute('href', href);
	}
}
