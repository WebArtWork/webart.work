# HoReCa Proposal Page

## Overview

Professional proposal page for HoReCa (Hotel, Restaurant, Café) clients. Displays detailed proposal information fetched from the backend API with a clean, responsive design.

## Route

- **URL**: `/proposal?id={proposalId}`
- **Auto-redirect**: If no `id` parameter provided, redirects to `/`
- **Query parameter**: `id` accepts the proposal MongoDB `_id`

## Data Flow

1. Component loads with query parameter `id`
2. Validates parameter exists, redirects if missing
3. Calls API: `POST https://it.webart.work/api/proposal/fetch`
4. Sends body: `{ "_id": "proposalIdFromRoute" }`
5. Displays loaded data in professional layout

## Page Sections

### 1. Hero Block
- **Shows**: Client name, proposal title, subtitle
- **Optional**: Status badge, CTA button
- **Fields**: clientName, title, subtitle, status, ctaText, ctaUrl

### 2. Websites Section
- **Shows**: All websites in horizontal scroll cards (2+ supported)
- **Card content**: Preview image, title, description, type, tags, visit link
- **Responsive**: Cards are compact, smooth horizontal scroll
- **Fields**: websites[], with title, url, type, description, previewImage, tags

### 3. Explanation Block
- **Shows**: Title, main text, key points as list
- **Purpose**: Explain HoReCa business value and solution
- **Fields**: explanation.title, explanation.text, explanation.points[]

### 4. Cost Section
- **Shows**: Individual cost cards with pricing breakdown
- **Features**: 
  - Recommended/highlighted cost block support
  - Optional costs can be shown/hidden
  - Included items listed per cost
  - Total price summary at bottom
- **Fields**: costs[], with title, description, price, period, items[], isRecommended, isOptional

### 5. Contact Block
- **Shows**: Brand name, contact person, phone, email
- **Purpose**: Call-to-action for proposal discussion
- **Fields**: brandName, contactName, contactPhone, contactEmail

## Component Structure

```
src/app/pages/proposal/
├── proposal.component.ts       # Main component, data loading
├── proposal.component.html     # Template with all sections
├── proposal.component.scss     # Styling (dark theme)
├── proposal.service.ts         # API communication
└── proposal.interface.ts       # TypeScript interfaces
```

## Key Features

✅ **Clean Design**
- Dark professional theme
- Subtle animations and transitions
- Responsive on mobile/tablet/desktop
- Full translation support

✅ **Horizontal Scroll**
- Websites section with smooth scrolling
- Hidden scrollbar for clean look
- Mobile-friendly

✅ **Cost Comparison**
- Easy to compare pricing options
- Highlight recommended tier
- Support for optional/add-on costs

✅ **Safe Data Handling**
- All optional fields handled gracefully
- Missing sections don't break layout
- Proper null/undefined checks

✅ **Performance**
- Lazy-loaded route
- Minimal re-renders with signals
- Efficient image handling

## API Contract

**Request**:
```json
POST /api/proposal/fetch
{
  "_id": "proposalId"
}
```

**Response**:
```typescript
{
  _id: string;
  clientName: string;
  clientSlug?: string;
  title: string;
  subtitle?: string;
  status?: string;
  currency?: string;
  websites?: Website[];
  explanation?: Explanation;
  costs?: Cost[];
  totalPrice?: number;
  ctaText?: string;
  ctaUrl?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  brandName?: string;
  createdAt?: string;
  updatedAt?: string;
}
```

## Usage Examples

### Basic proposal
```
/proposal?id=507f1f77bcf86cd799439011
```

### With CTA
Proposal with call-to-action button leading to contact form or booking system.

### Multi-website proposal
Proposal showing 2+ website designs with different types and features.

### Pricing tiers
Cost section with recommended tier highlighted and optional add-on services.

## Translations

New translation keys added:
- "Loading" - Loading indicator text
- "What We Will Build" - Websites section title
- "Visit Website" - Link text for website URLs
- "Investment" - Cost section title
- "Recommended" - Badge for recommended cost tier
- "Total Investment" - Total price label
- "Let's Build Your Digital Future" - Contact section CTA

Add these keys to all language files in `src/i18n/{code}.json` for full translation support.

## Styling Notes

- **Background**: Dark gradient with subtle depth
- **Cards**: Glass-morphism effect (backdrop blur, semi-transparent backgrounds)
- **Scrollbar**: Hidden on websites section for cleaner appearance
- **Colors**: White/transparency scale for consistent dark theme
- **Spacing**: Mobile-first responsive spacing with proper breakpoints

## Browser Support

- Modern browsers with CSS Grid, Flexbox, and CSS Variables
- Graceful degradation for older browsers
- Mobile-first responsive design

## Future Enhancements

- PDF export functionality
- Print-optimized styles
- Multi-language proposal content
- Analytics tracking
- Proposal comparison mode
- Digital signature integration
