# ICF Design System

Extract the visual language of "ICF Switzerland Welcome" into this project as a standalone design system: the token foundation plus a browsable style guide that documents it.

## What gets built

### 1. Foundation (ported from the source project)

- **Tokens**: the full ICF token set in `src/styles.css` — cream background, deep-blue foreground, ICF Blue primary, yellow accent, light-blue highlight/ring, plus the extended families: `hero`, `pillar-sg/oe/ce`, `chip`, `mark-*`, `teal*`, `warn*`, charts, sidebar. `--radius: 0.75rem` and the `shadow-soft` token carry over unchanged, in OKLCH.
- **Typography**: Quicksand (headings/display) and Plus Jakarta Sans (body), self-hosted from `/public/fonts` exactly as in the source — no external font CDN. Base layer keeps heading weight 600, `-0.02em` tracking, balanced/pretty text wrapping.
- **Custom utilities**: `eyebrow`, `section-label`, `btn-mono`, `display-xl`, `display-lg`, `marquee-track` (with reduced-motion guard) and the token-based `:focus-visible` accessibility rules.
- **Components**: the full `src/components/ui` shadcn set as styled in the source, plus the required Radix/utility dependencies.

### 2. Style guide site

A multi-route site (each route with its own head metadata), navigated by a header built from the source project's chrome:

- `/` — overview: brand statement, palette highlights, entry points into each section.
- `/foundations` — colour swatches with token names and roles, typography scale (display-xl through body and eyebrow/section-label), spacing, radii, shadow, focus-state demo.
- `/components` — live examples of buttons, inputs, selects, checkboxes/switches, badges, cards, tabs, accordion, dialog/sheet, tooltip, table, alerts, pagination, skeleton, sonner toasts.
- `/patterns` — page-level compositions ported from the source: hero band (`bg-hero`), pillar cards using the three pillar colours, chip/filter rows, callout variants (info / highlight / warning), sponsor marquee, header and footer chrome.

### 3. Deliberately excluded

- No photography or logo files (per your choice) — image slots in patterns render as neutral token-coloured blocks.
- The ICF brush-stroke mark library is brand artwork, so it is not copied; the `mark-*` colour tokens are still documented.
- No backend: no Supabase, auth, i18n, CMS or server functions. Ported chrome components become presentational only (static nav links, language switcher rendered as a plain dropdown).

## Technical notes

- Tokens live in `src/styles.css` via `@theme inline` + `:root`/`.dark`; the source's dark block is generic shadcn, so it is carried over as-is and flagged as a follow-up rather than invented.
- Font WOFF2 files and OFL licence text are copied from the source `public/fonts` into this project's `public/fonts`.
- Routes follow TanStack file-based routing; `src/routes/index.tsx` becomes the style guide home.
- Component code is copied verbatim where it is self-contained, and stripped of data/auth/i18n imports where it is not (Header, Footer, MobileMenu, SponsorMarquee, Callout).

## PR note

**Summary** — Adds an ICF-branded design system foundation (tokens, self-hosted typefaces, custom utilities, shadcn UI set) plus a four-route style guide documenting foundations, components and page patterns.

**Changes**
- Styling: full ICF token set, font-face declarations, base layer, custom utilities in `src/styles.css`.
- Assets: `public/fonts/quicksand-variable.woff2`, `plus-jakarta-sans-variable.woff2`, `Quicksand-OFL.txt`.
- UI: `src/components/ui/*` shadcn set; presentational `Header`, `Footer`, `MobileMenu`, `Callout`, `SponsorMarquee`.
- Routes: `/`, `/foundations`, `/components`, `/patterns`, each with own head metadata; header nav in `__root.tsx`.
- Config: Radix + utility dependencies added to `package.json`.

**Backend / Schema Changes** — None.

**Testing & Verification** — Build and typecheck; each route rendered and reviewed at desktop and mobile widths; keyboard focus indicators checked on interactive samples; verified fonts load from the local origin with no external font requests.

**Risks & Rollback** — New project surface only, no existing behaviour touched. Rollback is reverting the commit; no migrations.

**Follow-ups / Known Debt** — Dark mode values are inherited generic shadcn defaults, not ICF-tuned. No brand imagery or mark library. Light Blue remains non-text-only (~3.9:1) and is documented as such.
