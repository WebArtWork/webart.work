import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService, TranslateService } from '@wawjs/ngx-translate';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { environment } from '../../../environments/environment';
import type { AppLanguage } from '../../../environments/environment.prod';
import { CompanyService } from '../../feature/company/company.service';
import { ThemeState } from '../../theme/theme-state';
import { filter, map } from 'rxjs';
import { NAV_LINKS, PAGE_NAMES } from '../navigation.const';

@Component({
	selector: 'app-topbar',
	imports: [NgOptimizedImage, RouterLink, RouterLinkActive, TranslatePipe],
	templateUrl: './topbar.component.html',
	styleUrl: './topbar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
	private readonly _translateService = inject(TranslateService);
	private readonly _themeService = inject(ThemeState);
	private readonly _languageService = inject(LanguageService);
	private readonly _companyService = inject(CompanyService);
	private readonly _router = inject(Router);

	protected readonly navLinks = NAV_LINKS;
	protected readonly pageName = computed(() => {
		this.activeLanguage();
		const key = PAGE_NAMES['/' + (this._url().split(/[?#]/)[0]!.split('/')[1] ?? '')];
		return key ? this._translateService.translate(key)() : '';
	});
	protected readonly mode = computed(() => this._themeService.mode() ?? 'light');
	protected readonly languageMenuOpen = signal(false);
	protected readonly languages = signal<AppLanguage[]>(environment.languages);
	protected readonly company = this._companyService.company;
	protected readonly activeLanguage = this._languageService.language;
	protected readonly currentLanguage = computed(() => {
		const languages = this.languages();
		return languages.find((lang) => lang.code === this.activeLanguage()) || languages[0]!;
	});
	protected readonly toggleIcon = computed(() =>
		this.mode() === 'dark' ? 'light_mode' : 'dark_mode',
	);
	protected readonly toggleLabel = computed(() => {
		this.activeLanguage();
		return this.mode() === 'dark'
			? this._translateService.translate('Switch to light mode')()
			: this._translateService.translate('Switch to dark mode')();
	});
	protected readonly languageMenuLabel = computed(() => {
		this.activeLanguage();
		return this._translateService.translate('Open language menu')();
	});
	protected readonly languageCycleLabel = computed(() => {
		this.activeLanguage();
		return `${this._translateService.translate('Switch language to')()} ${this.getNextLanguage().nativeName}`;
	});

	private readonly _url = toSignal(
		this._router.events.pipe(
			filter((event) => event instanceof NavigationEnd),
			map((event) => event.urlAfterRedirects),
		),
		{ initialValue: this._router.url },
	);

	protected toggleMode() {
		const nextMode = this.mode() === 'dark' ? 'light' : 'dark';
		this._themeService.setMode(nextMode);
	}

	protected async nextLanguage() {
		const nextLanguage = this.getNextLanguage();
		await this._translateService.setLanguage(nextLanguage.code);
		await this._router.navigateByUrl(this._router.url);
		this.languageMenuOpen.set(false);
	}

	protected toggleLanguageMenu() {
		this.languageMenuOpen.update((open) => !open);
	}

	protected async setLanguage(language: AppLanguage) {
		await this._translateService.setLanguage(language.code);
		await this._router.navigateByUrl(this._router.url);
		this.languageMenuOpen.set(false);
	}

	protected getNextLanguage() {
		const languages = this.languages();
		const currentCode = this.currentLanguage().code;
		const currentIndex = languages.findIndex((language) => language.code === currentCode);

		return languages[(currentIndex + 1) % languages.length] ?? languages[0]!;
	}
}
