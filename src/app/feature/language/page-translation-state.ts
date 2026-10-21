import { Injectable, computed, signal } from '@angular/core';

/**
 * Tracks in-flight page-specific translation loads kicked off by
 * `usePageTranslations`. Lets the root component know when it is safe to
 * reveal the page: `ready()` is true only once every page that started a
 * load has finished it (pages that never call `usePageTranslations` do not
 * affect the count).
 */
@Injectable({ providedIn: 'root' })
export class PageTranslationState {
	private readonly _pending = signal(0);

	readonly ready = computed(() => this._pending() === 0);

	begin(): void {
		this._pending.update((count) => count + 1);
	}

	end(): void {
		this._pending.update((count) => Math.max(0, count - 1));
	}
}
