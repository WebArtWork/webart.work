# Architecture Guide

## Overview

This repository contains an Angular 21 company website with service/partner/intern profiles and multilingual support. The architecture follows the ngx-default pattern, prioritizing clean page composition and prerender safety.

## Core Stack

- **Angular**: 21.2.14
- **TypeScript**: 5.9.2
- **Rendering**: Angular SSR/prerender
- **Styling**: Tailwind CSS 4.1.12 + SCSS
- **Translations**: @wawjs/ngx-translate 21.3.2
- **Core Features**: @wawjs/ngx-core 21.3.2, @wawjs/ngx-ui 21.3.2
- **Runtime**: Node.js Express 5.1.0

## Project Direction

- Optimize for static landing pages and detail views (prerendered)
- Keep page composition clear and scannable
- Use practical code reuse, not abstract patterns
- Preserve prerender safety by default
- Signal-based state management where needed
- Multilingual support with JSON-based translations

## Folder Structure

```
src/
├── app/
│   ├── pages/              # Page components (landing, service, intern, partner)
│   ├── layouts/            # Shared layout components (topbar, footer)
│   ├── feature/            # Feature-specific services (bootstrap, company, item, language)
│   ├── app.config.ts       # App-wide configuration and providers
│   ├── app.routes.ts       # Route definitions
│   └── app.component.ts    # Root component
├── data/                   # Local fallback data (JSON files)
├── environments/           # Environment configuration
├── i18n/                   # Translation files (JSON, loaded at runtime)
├── styles/                 # Global styles and theme variables
└── assets/                 # Static assets (images, flags, etc.)
```

## Page Structure

Each page component:
- Lives in `src/app/pages/<page-name>/`
- Has `.component.ts`, `.component.html`, `.component.scss`
- Uses `ChangeDetectionStrategy.OnPush` for performance
- Works with Angular SSR prerender by default

Supported pages:
- **landing**: Homepage with hero, services, technologies, workflow, partners, contact
- **service**: Detail view for individual services
- **intern**: Detail view for intern profiles (practices)
- **partner**: Detail view for partner profiles

## Routing and Prerendering

Routing defined in `src/app/app.routes.ts`:
- Simple, crawlable route patterns
- Prerender routes defined in `angular.json` build config
- Route metadata in `data.meta` for SEO (via @wawjs/ngx-core)
- Server-side rendering handles SSR/prerender builds

## Data Management

### Bootstrap Data
- Loaded via `BootstrapService` on app initialization
- Uses Transfer State for SSR hydration
- Refreshes in browser after SSR transfer

### Fallback Data
- Company data: `src/app/feature/company/company.const.ts` (COMPANY_FALLBACK)
- Items/practices: `src/data/*.json` files
- Languages: Defined in `src/environments/environment.prod.ts`

### Translation Data
- Stored as JSON files: `src/i18n/{language-code}.json`
- Loaded at runtime by @wawjs/ngx-translate
- Public folder path: `public/i18n/`

### Data Resolution Order
1. Bootstrap API response
2. Local fallback (environment or data files)
3. Empty/default value

## State Management

### Signals-Based
Used for:
- Theme mode (light/dark) via ThemeService
- Language/locale selection
- Menu open/close states
- Computed derived state (formatted text, lists)

### Services
- `BootstrapService`: App initialization, data loading
- `CompanyService`: Company data with fallback signal
- `ItemService`: Item/practice data
- `LanguageService`: (From @wawjs/ngx-translate) - language management
- `TranslateService`: Runtime translation lookups
- `ThemeService`: Theme mode management

## Translation System

### How It Works
- JSON files in `src/i18n/` contain key-value translations
- Keys are source text (English), values are translations
- @wawjs/ngx-translate library handles language switching
- Directive syntax: `<span translate>Label text</span>`
- Runtime translation: `this._translateService.translate('text')()`

### Supported Languages
- Ukrainian (ua), English (en), German (de), French (fr)
- Polish (pl), Romanian (ro), Hungarian (hu), Greek (el)
- Czech (cs), Italian (it), Spanish (es), Dutch (nl), Portuguese (pt), Swedish (sv)

### Adding a Language
1. Create `src/i18n/{code}.json` with translations
2. Add language to `environment.prod.ts` languages array
3. Add flag image to `src/assets/flags/{code}.svg`
4. Ensure translation completeness

## Styling

### Global Theme
- Token variables: `src/styles/_theme.scss`
- Entry point: `src/styles.scss`
- Framework: Tailwind CSS 4 (native CSS, no postcss)

### Component Styles
- Scoped SCSS files: `*.component.scss`
- Use Tailwind classes first, SCSS for complex layouts
- Theme variables available as CSS custom properties

## Performance Considerations

### Build Output
- Angular SSR prerenderers HTML at build time
- Express server serves prerendered pages
- Client-side hydration with event replay
- Zoneless change detection enabled

### Optimization
- Image optimization: NgOptimizedImage for lazy loading
- Code splitting: Route-based lazy loading
- Transfer State: SSR data hydration
- Change detection: OnPush strategy everywhere

## Testing & Verification

### Run Commands
```bash
npm start          # Dev server with HMR
npm run build      # Production build with prerender
npm run serve:ssr:app  # Test prerendered build
```

## SSR Safety Rules

1. **No Browser APIs in SSR** - Guard with `isPlatformBrowser()`
2. **No Window/Document Direct Access** - Inject DOCUMENT or check platform
3. **Avoid setTimeout in SSR** - Use safe patterns for timing
4. **Static Prerender Safe** - Pages must work without JS
5. **Meta Tags** - Set via route data or app.config defaults

## Component Patterns

### Page Component
```typescript
@Component({
  imports: [NgOptimizedImage, RouterLink, TranslateDirective],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  protected readonly data = computedSignal();
}
```

### Feature Service
```typescript
@Injectable({ providedIn: 'root' })
export class DataService {
  readonly data = signal<Data>(FALLBACK_DATA);
  // Fetch from API, update signal
}
```

## Code Style

- TypeScript: Strict mode enabled
- Angular: Standalone components, signal-based state
- CSS: Tailwind first, SCSS for complexity
- Formatting: Prettier (configured in `.prettierrc`)
- Line length: No hard limit, prefer readability

See `code-style.md` for detailed conventions.

## Future Patterns

When expanding:
- Keep pages predictable and simple
- Extract sections only when truly reused
- Use services for shared feature logic
- Prefer signals for local state
- Keep data resolution simple (API → fallback → empty)
