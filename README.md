# Aashish Logistics

Corporate website for a cargo consolidation agent and NVOCC operator. Next.js 15 (App
Router), TypeScript, Tailwind CSS v4, Framer Motion, Lucide icons.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run typecheck
```

## Site structure

| Route               | Purpose                                                  |
| ------------------- | -------------------------------------------------------- |
| `/`                 | Company showcase — hero, capabilities index, network, process, digital operations, about, CTA, quote form |
| `/services`         | Full service directory (5 practice areas, 14 services) plus the featured Sea Freight and Air Freight blocks |
| `/api/quote`        | Quote request endpoint (validates; delivery not yet wired) |
| `/sitemap.xml`      | Generated from the service content                        |

Services are listed in full on `/services`; there are no per-service pages.
The homepage carries only the capability index that routes into it.

## Where to edit content

All copy and data are in `content/` — components read from it, so no component
edits are needed for routine content changes.

| File                  | Contains                                                   |
| --------------------- | ---------------------------------------------------------- |
| `content/site.ts`     | Company name, navigation, contact details, footer links      |
| `content/services.ts` | The 14 services: descriptions, overview copy, highlights, icons. Index numbers are derived automatically |
| `content/solutions.ts`| The two featured solution blocks on `/services`             |
| `content/process.ts`  | The five-step operating sequence                            |

Adding a service to `content/services.ts` adds it to the directory and the
navbar mega-menu, and renumbers the list. Counts quoted in copy are derived
from the content, so headings follow automatically.

### Placeholder values

The address and phone in `content/site.ts` are real. The email
(`info@example.com`) and `site.url` are still placeholders — replace both
before publishing, since `site.url` drives `metadataBase`, canonicals and the
sitemap.

## Media placeholders

Every major visual uses one component, `components/ui/media-placeholder.tsx`,
which renders a correctly-proportioned marked placeholder until an asset is
supplied. Because the placeholder and the real asset share the same aspect
ratio, swapping one in never reflows the layout.

```tsx
{/* Placeholder */}
<MediaPlaceholder label="HERO IMAGE / VIDEO" alt="…" ratio="4/3" />

{/* Image — jpg / png / webp / avif */}
<MediaPlaceholder src="/media/hero.webp" alt="…" ratio="4/3" priority />

{/* Video */}
<MediaPlaceholder src="/media/hero.mp4" type="video" alt="…" ratio="4/3" />

{/* YouTube / Vimeo */}
<MediaPlaceholder src="https://player.vimeo.com/video/…" type="embed" alt="…" />
```

Images lazy-load with a calm tonal loading state; `priority` opts the hero out
of lazy loading. Remote asset hosts must be added to `images.remotePatterns` in
`next.config.ts`.

Assets in `public/media/` are wired up for the hero, services hero, global
network, Sea Freight, Air Freight (video plus inset photo), the quote section
and the CTA background. The only remaining marked placeholder is the Sea
Freight block's secondary slot.

## Design system

Tokens live in the `@theme` block of `app/globals.css` — Tailwind generates
utilities from them, so changing a token there restyles the whole site.

- **Surfaces** — a cool blue-grey ladder: `paper` (white) → `mist` → `bone` →
  `bone-deep`. Sections alternate through it to give the page tonal structure.
- **Navy** — `navy-50` … `navy-900`, used for type and the footer anchor.
- **Accent** — one professional blue (`accent`), used sparingly for eyebrows,
  icons and interactive states. `seafoam-bright` is a secondary accent used
  for the step markers on the navy process band.
- **Type** — Inter via `next/font`, tight tracking on headings, `tnum` utility
  for tabular figures on all metrics.

`muted` and `faint` are both verified at ≥ 4.5:1 against the darkest surface in
the ladder, since micro-labels and index numbers carry meaning.

### Motion

Deliberately minimal: an 8px rise-and-fade on scroll (`components/ui/reveal.tsx`),
a scroll-driven navbar height transition, and hover states on the capability
rows and mega-menu. Everything respects `prefers-reduced-motion`, which
disables animation globally via `app/globals.css`.

The navbar height is deliberately **not** tied to the mega-menu being open:
shrinking the bar on hover moved the trigger out from under the cursor and
made the menu flicker open and closed.

## Wiring the quote form

`app/api/quote/route.ts` validates submissions and returns 200, but does not
yet deliver them anywhere — submissions are logged server-side only. Replace
the block marked `TODO(delivery)` with your CRM webhook, transactional email or
ticket queue. The request shape is stable.

## SEO

Metadata, Open Graph and Twitter cards are configured in `app/layout.tsx`, with
per-page overrides via `generateMetadata`. The Open Graph image is generated at
`app/opengraph-image.tsx` (`next/og`) — replace that route with a static image
when brand artwork exists. Organization JSON-LD ships in the root layout. Set
the real domain in `site.url` (`content/site.ts`); it drives `metadataBase`,
canonicals and the sitemap.
