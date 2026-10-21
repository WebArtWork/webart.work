import { ViewportScroller, isPlatformBrowser } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	PLATFORM_ID,
	effect,
	inject,
	signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { PageTranslationState } from './feature/language/page-translation-state';
import { FooterComponent } from './layouts/footer/footer.component';
import { MobileNavComponent } from './layouts/mobile-nav/mobile-nav.component';
import { TopbarComponent } from './layouts/topbar/topbar.component';
import { ThemeState } from './theme/theme-state';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, TopbarComponent, FooterComponent, MobileNavComponent],
	template: '<app-topbar /> <router-outlet /> <app-footer /> <app-mobile-nav />',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
	private readonly _platformId = inject(PLATFORM_ID);
	private readonly _themeState = inject(ThemeState);
	private readonly _pageTranslationState = inject(PageTranslationState);
	private readonly _viewportScroller = inject(ViewportScroller);

	private readonly _initialNavigationDone = toSignal(
		inject(Router).events.pipe(
			filter((event) => event instanceof NavigationEnd),
			map(() => true),
		),
		{ initialValue: false },
	);

	private readonly _iconsReady = signal(false);

	constructor() {
		if (!isPlatformBrowser(this._platformId)) {
			return;
		}

		// Anchor links should land below the sticky topbar, not under it.
		this._viewportScroller.setOffset(() => [
			0,
			(document.querySelector('app-topbar header')?.clientHeight ?? 0) + 24,
		]);

		// Without this the icons render as their ligature names until the font arrives.
		// The timeout keeps a failed font request from holding the overlay forever.
		Promise.race([
			document.fonts.load('24px "Material Symbols Outlined"', 'home'),
			new Promise((resolve) => setTimeout(resolve, 5000)),
		]).finally(() => this._iconsReady.set(true));

		effect(() => {
			const themeReady = !!this._themeState.mode();
			const navigationDone = this._initialNavigationDone();
			const translationsReady = this._pageTranslationState.ready();

			if (themeReady && navigationDone && translationsReady && this._iconsReady()) {
				document.getElementById('app-preload')?.remove();
			}
		});
	}
}
