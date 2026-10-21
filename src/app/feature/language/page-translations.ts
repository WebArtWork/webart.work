import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, effect, inject } from '@angular/core';
import { LanguageService, TranslateService } from '@wawjs/ngx-translate';
import { PageTranslationState } from './page-translation-state';

/**
 * Merges `/i18n/<page>/<language>.json` into the active dictionary for the calling page,
 * and again after every language switch. Call it from a component constructor.
 */
export function usePageTranslations(page: string) {
	const translateService = inject(TranslateService);
	const languageService = inject(LanguageService);

	if (!isPlatformBrowser(inject(PLATFORM_ID))) {
		return;
	}

	// Registered synchronously, during construction, so the root component's
	// readiness check (which waits for the initial route to activate) always
	// sees this page as pending before it can conclude there is nothing to wait for.
	const pageTranslationState = inject(PageTranslationState);
	pageTranslationState.begin();
	let settled = false;

	effect(() => {
		const language = languageService.language();

		if (!language) {
			return;
		}

		// Wait for the base dictionary, otherwise the library caches the page file on its own.
		void translateService
			.loadTranslations(language)
			.then(() => translateService.loadExtraTranslations([`/i18n/${page}/`], { language }))
			.finally(() => {
				if (!settled) {
					settled = true;
					pageTranslationState.end();
				}
			});
	});
}
