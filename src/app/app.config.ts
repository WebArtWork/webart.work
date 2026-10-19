import {
	APP_INITIALIZER,
	ApplicationConfig,
	provideBrowserGlobalErrorListeners,
	provideZonelessChangeDetection,
} from '@angular/core';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideNgxCore } from '@wawjs/ngx-core';
import { provideTranslate } from '@wawjs/ngx-translate';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { BootstrapService } from './feature/bootstrap/bootstrap.service';
import { COMPANY_FALLBACK } from './feature/company/company.const';

const initializeBootstrapData = (bootstrapService: BootstrapService) => () =>
	bootstrapService.initialize();

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZonelessChangeDetection(),
		provideHttpClient(withFetch()),
		provideNgxCore({
			meta: {
				// Pages apply their own meta through SeoService.
				applyFromRoutes: false,
				useTitleSuffix: true,
				defaults: {
					title: COMPANY_FALLBACK.title,
					titleSuffix: ` | ${COMPANY_FALLBACK.name}`,
					description: COMPANY_FALLBACK.description,
					image: COMPANY_FALLBACK.image,
					robots: 'index, follow',
				},
			},
		}),
		provideRouter(
			routes,
			withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
		),
		provideClientHydration(withEventReplay()),
		provideTranslate({
			defaultLanguage: environment.defaultLanguage,
			languages: environment.languages,
			folder: '/i18n/',
		}),
		{
			provide: APP_INITIALIZER,
			useFactory: initializeBootstrapData,
			deps: [BootstrapService],
			multi: true,
		},
	],
};
