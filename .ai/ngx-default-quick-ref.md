# ngx-default Quick Reference

## Key Differences from Previous Setup

| Aspect | Before | After |
|--------|--------|-------|
| Translation lib | wacom | @wawjs/ngx-translate |
| Translation files | `.ts` objects | `.json` flat files |
| Translation in templates | `\| translate` pipe | `translate` directive |
| Runtime translation | Custom pipe | `TranslateService.translate()` |
| Language service | Custom feature service | @wawjs/ngx-translate built-in |
| Theme service | From wacom | From @wawjs/ngx-ui |
| Meta/SEO | Not managed | @wawjs/ngx-core |
| Angular version | 21.2.4 | 21.2.14 |

## Common Tasks

### Add Translation Key

**In template:**
```html
<span translate>New key text</span>
```

**Then add to each language file** `src/i18n/{code}.json`:
```json
{
  "New key text": "translated text"
}
```

### Change Language at Runtime

```typescript
// Inject services
private _translateService = inject(TranslateService);
private _router = inject(Router);

// Change language (async)
async changeLanguage(code: string) {
  await this._translateService.setLanguage(code);
  await this._router.navigateByUrl(this._router.url);
}
```

### Get Translation in Component

```typescript
const translated = this._translateService.translate('Key text')();
```

### Check Current Language

```typescript
private _languageService = inject(LanguageService);

// Signal-based
currentLanguage = this._languageService.language; // 'en', 'ua', etc.

// Get language details
language = this._languageService.getLanguage(code); // { code, name, nativeName, ... }
```

### Add New Page

1. **Create page component** at `src/app/pages/{name}/`:
```typescript
import { TranslateDirective } from '@wawjs/ngx-translate';

@Component({
  imports: [TranslateDirective, ...],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {}
```

2. **Add route** in `src/app/app.routes.ts`:
```typescript
{ path: 'page', component: PageComponent }
```

3. **Use translate directive** in template:
```html
<h1 translate>Page Title</h1>
```

4. **Add translations** to `src/i18n/{lang}.json` for each language

### Add New Language

1. **Create JSON file** `src/i18n/{code}.json` with all key-value pairs
2. **Add to environment** `src/environments/environment.prod.ts`:
```typescript
{
  code: 'fr',
  name: 'French',
  nativeName: 'Français',
  flagSrc: 'flags/france.svg',
  htmlLang: 'fr',
  population: 110,
}
```
3. **Add flag image** to `src/assets/flags/{code}.svg`

### Configure App Defaults

In `src/app/app.config.ts`:

```typescript
provideNgxCore({
  meta: {
    applyFromRoutes: true,
    useTitleSuffix: true,
    defaults: {
      title: 'Default Title',
      titleSuffix: ' | Company Name',
      description: 'Default description',
      image: '/og-image.jpg',
      robots: 'index, follow',
    },
  },
}),
```

### Set Route-Specific Meta

In `src/app/app.routes.ts`:

```typescript
{
  path: 'service/:id',
  component: ServiceComponent,
  data: {
    meta: {
      title: 'Service Details',
      description: 'Service page description',
    },
  },
}
```

### Guard SSR-Only Code

```typescript
import { isPlatformBrowser } from '@angular/common';

constructor() {
  private platformId = inject(PLATFORM_ID);
  
  if (isPlatformBrowser(this.platformId)) {
    // Browser-only code here
    window.localStorage.setItem('key', 'value');
  }
}
```

### Update Fallback Company Data

Edit `src/app/feature/company/company.const.ts`:

```typescript
export const COMPANY_FALLBACK: Company = {
  _id: '',
  name: 'Company Name',
  title: 'Company Title',
  description: 'Description...',
  image: '/images/company.jpg',
};
```

## File Locations

| What | Where |
|------|-------|
| Routes | `src/app/app.routes.ts` |
| App config | `src/app/app.config.ts` |
| Translations | `src/i18n/{code}.json` |
| Environment | `src/environments/environment.prod.ts` |
| Pages | `src/app/pages/{name}/` |
| Layouts | `src/app/layouts/` |
| Features | `src/app/feature/{name}/` |
| Styles theme | `src/styles/_theme.scss` |
| Assets | `src/assets/` |

## Imports Checklist

**For pages/components:**
```typescript
import { TranslateDirective } from '@wawjs/ngx-translate';
import { ThemeService } from '@wawjs/ngx-ui';
```

**For translation service:**
```typescript
import { LanguageService, TranslateService } from '@wawjs/ngx-translate';
```

**For theme service:**
```typescript
import { ThemeService } from '@wawjs/ngx-ui';
```

## Dependencies to Know

- `@wawjs/ngx-translate` - Translation library
- `@wawjs/ngx-core` - Meta/SEO management
- `@wawjs/ngx-ui` - Theme & UI utilities
- `@angular/ssr` - Server-side rendering
- `tailwindcss` - Utility-first CSS
- `express` - Dev/production server

## Common Gotchas

1. **Forget `await` on language change** - Set language returns a Promise
2. **Missing translations** - Add keys to ALL language files, not just one
3. **Browser APIs in SSR** - Check platform before using window/localStorage
4. **Route changes don't refresh** - Navigate after language change
5. **JSON syntax in translations** - Ensure valid JSON (quotes, commas, etc.)
6. **Static analysis doesn't catch missing keys** - Test all languages

## Performance Tips

- Use `OnPush` change detection everywhere
- Prefer computed signals for derived state
- Lazy load images with `ngSrcset`
- Keep bundle small: no unused imports
- Prerender heavy computation at build time
- Use Transfer State for SSR data

## Debugging

### Check Current Language
```
Open DevTools Console:
inject(LanguageService).language()
```

### Check Available Languages
```
inject(LanguageService).languages()
```

### Check Translation
```
inject(TranslateService).translate('Key text')()
```

### Check Build Errors
```bash
npm run build -- --verbose
```

### Test Prerender
```bash
npm run build
npm run serve:ssr:app
# Visit http://localhost:4000
```
