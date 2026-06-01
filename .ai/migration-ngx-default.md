# ngx-default Migration Guide

## Overview

This project has been upgraded to use the `ngx-default` architecture pattern. The key changes involve moving from custom translation implementation to the standardized `@wawjs/ngx-translate` library and incorporating modern Angular 21 patterns with signal-based state management.

## What Changed

### Translation System

**Before (wacom):**
- Translations stored as TypeScript objects in `.ts` files
- Long translations in `.long.ts` files requiring imports
- Custom translation pipe `TranslatePipe` from 'wacom'
- Manual language service implementation

**After (ngx-default):**
- Translations stored as JSON files in `src/i18n/`
- `@wawjs/ngx-translate` library handles all translation logic
- `TranslateDirective` for template-based translation via `translate` attribute
- Built-in `LanguageService` from `@wawjs/ngx-translate`
- Language configuration via environment variables with `defaultLanguage` and `languages` array

### Dependencies

**Removed:**
- `wacom`: 21.2.4 (custom library)
- `marked`: 17.0.4 (not used in ngx-default)
- `@tailwindcss/typography`: 0.5.19 (not essential)

**Added:**
- `@wawjs/ngx-translate`: 21.3.2 (new translation system)
- `@wawjs/ngx-core`: 21.3.2 (meta/SEO management)
- `@wawjs/ngx-ui`: 21.3.2 (theme service)

**Updated:**
- Angular: 21.2.4 → 21.2.14
- Angular SSR: 21.2.2 → 21.2.12
- Build tools: 21.2.2 → 21.2.12

### App Configuration

The `app.config.ts` now:
- Adds `provideNgxCore()` for meta/SEO support with route metadata
- Uses new `provideTranslate()` with config object instead of direct translation array
- Requires environment to define `languages` as `AppLanguage[]` array
- Sets up default language and translation folder path

### Language Management

Environment structure for languages:

```typescript
export interface AppLanguage {
  code: string;           // Language code (e.g., 'ua', 'en')
  name: string;          // English name (e.g., 'Ukrainian')
  nativeName: string;    // Native language name (e.g., 'Українська')
  flagSrc: string;       // Path to flag image
  htmlLang: string;      // HTML lang attribute (e.g., 'uk', 'en')
  population: number;    // Population (for sorting/display)
}
```

## File Changes

### New Files
- `.ai/migration-ngx-default.md` - This migration guide
- `src/app/feature/company/company.const.ts` - Company constants with fallback values
- `src/i18n/*.json` - JSON translation files (converted from TypeScript)

### Updated Files
- `package.json` - Updated dependencies
- `src/environments/environment.prod.ts` - Added languages array
- `src/app/app.config.ts` - New NgxCore and Translate setup
- `src/app/app.component.ts` - No changes (generic structure)
- `src/app/feature/company/company.interface.ts` - Extended with title, description, image
- `src/app/layouts/topbar/topbar.component.ts` - Uses new LanguageService and TranslateDirective
- `src/app/layouts/footer/footer.component.ts` - Uses TranslateDirective
- `src/app/pages/landing/landing.component.ts` - Uses TranslateDirective
- `src/app/pages/service/service.component.ts` - Uses TranslateDirective
- `src/app/pages/intern/intern.component.ts` - Uses new LanguageService and TranslateDirective
- `src/app/pages/partner/partner.component.ts` - Uses TranslateDirective

### Deprecated/Removed Files
- `src/app/feature/language/language.service.ts` - No longer needed (use @wawjs/ngx-translate instead)
- All `.long.ts` translation files - Merged into JSON files

## Migration Checklist

- [x] Update package.json with new dependencies
- [x] Update environment files with languages array
- [x] Convert TypeScript translations to JSON
- [x] Update app.config.ts with provideNgxCore and new provideTranslate
- [x] Update all components to use TranslateDirective
- [x] Create company.const.ts with COMPANY_FALLBACK
- [x] Update Company interface with extended fields
- [x] Create .ai/ documentation structure

## Template Migration Notes

When converting templates from TranslatePipe to TranslateDirective:

**Old (pipe syntax):**
```html
{{ 'Label text' | translate }}
```

**New (directive syntax):**
```html
<span translate>Label text</span>
```

Or for dynamic translations:
```html
<span [translate]="dynamicKey">{{ translation }}</span>
```

## Language Service Usage

The new `LanguageService` from `@wawjs/ngx-translate` provides:

```typescript
// Get current language signal
activeLanguage = this._languageService.language;

// Get available languages
languages = this._languageService.languages();

// Change language (async)
await this._translateService.setLanguage('en');

// Get language details
language = this._languageService.getLanguage('en');

// Translate text at runtime
translated = this._translateService.translate('Key text')();
```

## Translation File Loading

Translations are now loaded from JSON files in the `public/i18n/` folder at runtime:
- File pattern: `{language-code}.json`
- Folder: Set via `provideTranslate({ folder: '/i18n/' })`
- JSON structure: Flat key-value object where keys are source text

## Breaking Changes

1. **Custom LanguageService** - The old `src/app/feature/language/language.service.ts` is no longer used. Use the injected `LanguageService` from `@wawjs/ngx-translate`.

2. **Translation Import Removal** - You no longer need to import `translates` from `src/i18n`. Remove these imports from app.config.ts equivalents.

3. **Route Navigation on Language Change** - Language changes now require `await this._router.navigateByUrl()` for proper state updates (see topbar component).

4. **Theme Service Import** - `ThemeService` is now from `@wawjs/ngx-ui` instead of `wacom`.

## Environment Fallback

Both current and new setups use `environment.ts` for fallback data when APIs fail:
- Company data: Defined in `company.const.ts`
- Items/practices: Loaded from data files
- Languages: Defined in environment

Keep the environment configuration up-to-date as the source of truth for default values.
