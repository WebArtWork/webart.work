import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, PLATFORM_ID, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { PageTranslationState } from './feature/language/page-translation-state';
import { FooterComponent } from './layouts/footer/footer.component';
import { TopbarComponent } from './layouts/topbar/topbar.component';
import { ThemeState } from './theme/theme-state';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, TopbarComponent, FooterComponent],
	template: '<app-topbar /> <router-outlet /> <app-footer />',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
	private readonly _platformId = inject(PLATFORM_ID);
	private readonly _themeState = inject(ThemeState);
	private readonly _pageTranslationState = inject(PageTranslationState);

	private readonly _initialNavigationDone = toSignal(
		inject(Router).events.pipe(
			filter((event) => event instanceof NavigationEnd),
			map(() => true),
		),
		{ initialValue: false },
	);

	constructor() {
		if (!isPlatformBrowser(this._platformId)) {
			return;
		}

		effect(() => {
			const themeReady = !!this._themeState.mode();
			const navigationDone = this._initialNavigationDone();
			const translationsReady = this._pageTranslationState.ready();

			if (themeReady && navigationDone && translationsReady) {
				document.getElementById('app-preload')?.remove();
			}
		});
	}
}
