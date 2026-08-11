# Aashish Logistics

Corporate website for an international freight forwarder. Next.js 15 (App
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
| `/services`         | Full service directory (6 practice areas, 17 services), featured solutions, project cargo |
| `/services/[slug]`  | One page per service — statically generated for all 17    |
| `/api/quote`        | Quote request endpoint (validates; delivery not yet wired) |
| `/sitemap.xml`      | Generated from the service content                        |

Service detail deliberately does **not** live on the homepage — the homepage
carries only the capability index that routes into `/services`.

## Where to edit content

All copy and data are in `content/` — components read from it, so no component
edits are needed for routine content changes.

| File                  | Contains                                                   |
| --------------------- | ---------------------------------------------------------- |
| `content/site.ts`     | Company name, navigation, contact details, footer links      |
| `content/services.ts` | The 17 services: descriptions, overview copy, highlights, icons. Slugs and index numbers are derived automatically |
| `content/solutions.ts`| The four featured solution sections on `/services`          |
| `content/process.ts`  | The five-step operating sequence                            |

Adding a service to `content/services.ts` automatically creates its page, its
directory row, its sitemap entry and its footer link.

### Placeholder values

The company name, address, phone and email are placeholders — replace them in
`content/site.ts` before publishing.

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

The global network section already uses real footage
(`public/media/global-network.webm`, 16:9). Placeholders still awaiting assets:
hero, each of the four featured solutions, project cargo, CTA background, and
one per service page. The digital operations section uses a minimal static
dashboard mock (`components/sections/digital.tsx`) rather than a media
placeholder — replace the whole component with a `MediaPlaceholder` if you
prefer a screenshot or screen recording.

## Design system

Tokens live in the `@theme` block of `app/globals.css` — Tailwind generates
utilities from them, so changing a token there restyles the whole site.

- **Surfaces** — a cool blue-grey ladder: `paper` (white) → `mist` → `bone` →
  `bone-deep`. Sections alternate through it to give the page tonal structure.
- **Navy** — `navy-50` … `navy-900`, used for type and the footer anchor.
- **Accent** — one professional blue (`accent`), used sparingly for eyebrows,
  icons, section rules and interactive states. `seafoam` is a secondary accent
  reserved for map nodes.
- **Type** — Inter via `next/font`, tight tracking on headings, `tnum` utility
  for tabular figures on all metrics.

`muted` and `faint` are both verified at ≥ 4.5:1 against the darkest surface in
the ladder, since micro-labels and index numbers carry meaning.

### Motion

Deliberately minimal: an 8px rise-and-fade on scroll (`components/ui/reveal.tsx`),
a navbar height transition, hover states on service rows, one count-up on the
network metrics, the map route draw, and a 2.5% parallax on the project cargo
media. Everything respects `prefers-reduced-motion`, which disables animation
globally via `app/globals.css`.

Service row descriptions expand on hover gated by `@media (hover: hover)`
rather than by viewport width, so touch tablets show the description outright
instead of hiding it behind an interaction they cannot perform.

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
