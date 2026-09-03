import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'app-theme-mode';

/**
 * App-owned replacement for `@wawjs/ngx-ui`'s `ThemeService`. Toggles the
 * `data-mode` attribute on `<html>` that `src/styles/_theme.scss` already
 * reacts to, so none of the app's existing `--c-*` custom-property styling
 * needs to change.
 */
@Injectable({ providedIn: 'root' })
export class ThemeState {
	private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

	readonly mode = signal<ThemeMode>('light');

	constructor() {
		if (this.isBrowser) {
			this.restore();
		}
	}

	setMode(mode: ThemeMode): void {
		this.mode.set(mode);
		document.documentElement.setAttribute('data-mode', mode);
		this.persist();
	}

	private restore(): void {
		let stored: ThemeMode | null = null;
		try {
			stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
		} catch {
			stored = null;
		}

		const mode = stored ?? (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
		this.mode.set(mode);
		document.documentElement.setAttribute('data-mode', mode);
	}

	private persist(): void {
		try {
			localStorage.setItem(STORAGE_KEY, this.mode());
		} catch {
			// ignore write failures (e.g. storage disabled/full)
		}
	}
}
