# Absorb consumer workarounds into the library

Five changes so the production site can delete its local overrides. Priority order as requested.

## 1. Button: on-dark variants

Add two variants to `buttonVariants` in `src/components/ui/button.tsx` (variants, not a surface wrapper — matches the library's "variants over context" rule):

- `inverse` — light surface (`bg-hero-foreground`-equivalent white token) with a Deep Blue label, the on-dark twin of `default` / `pill`.
- `inverse-ghost` — transparent, light border and light label, the on-dark twin of `outline` / `pill-ghost`.

Both take their colours from existing tokens only (no raw hex), work with `size="pill"` and `asChild`, and carry a focus ring tuned for Deep Blue (light ring + offset that reads on `bg-hero`, matching the existing on-dark focus rule already in `styles.css`).

Documented on the components page as "use on `bg-hero` / `bg-primary` surfaces only", plus schema enrichment (`usage`, `examples`, `antipatterns`) for both variants so consumer agents pick them up.

## 2. `eyebrow` becomes colour-neutral

Drop `color` from `@utility eyebrow` so it inherits `currentColor`, and add two companions:

- `eyebrow-accent` — Yellow on Deep Blue, the ICF-sanctioned small-text accent pairing.
- `eyebrow-inverse` — `hero-foreground` for plain on-dark eyebrows.

Existing style-guide call sites that relied on the implicit primary colour get an explicit `text-primary` so nothing in the docs site changes visually.

## 3. `btn-mono` becomes colour-neutral

Drop `color` from `@utility btn-mono` — it is a small mono metadata face, colour belongs to the surface. Add `btn-mono-muted` (muted-foreground) for the common metadata case. Docs call sites get explicit colour classes.

Both utility changes are documented as a one-line migration note (colour is now inherited).

## 4. BrushMark: aliases + inline-SVG mode

In `src/components/brush/marks.ts`:

- Add `MARK_ALIASES` mapping short lowercase names to canonical ones (`arrow1`→`Arrow01`, `highlight1`→`TextHighlighMark01`, `stroke4`→`ThinnerStrokeMark04`, legacy `star`→`Star01`, and the same pattern across all 30 marks).
- Export `resolveMarkName()` and a `MarkNameOrAlias` union so a CMS placement editor can enumerate and stored values keep resolving.

In `src/components/brush/BrushMark.tsx`:

- `name` accepts `MarkNameOrAlias`.
- New `render?: "mask" | "inline"` prop, default `"mask"` (unchanged behaviour). `render="inline"` fetches that one mark's SVG at mount, strips any script/event content, forces `fill="currentColor"`, and inlines it — so `html-to-image` rasterisation works. Fetch results are memoised per mark URL in a module-level cache; nothing is eagerly bundled, so each mark still costs one lazy request only when used.
- `MarkedText` gains the same `render` pass-through.

## 5. Menu-row recipe

Add a `@utility menu-item` carrying the exact treatment (min height 11, padding, 12px semibold, `text-foreground/80`, `hover:bg-muted hover:text-foreground`) and a thin `MenuRow` primitive in `src/components/ui/menu-row.tsx` that applies it via `asChild`, so a plain `<a>` or router `Link` inside a `shadow-soft` card gets the same skin as `DropdownMenuItem` without Radix.

## Exports

`src/index.ts` gains: `MenuRow`, `MARK_ALIASES`, `resolveMarkName`, `MarkNameOrAlias`, `BrushMarkRender`. Button/utility changes need no new export.

## Your question 6 — callout imports

There is no separate canonical path: after attach, the library's own files are the canonical ones. Import them directly as `@/design-system/{slug}/components/callout` and `.../components/callout-shades` (or from the barrel, which I will extend to also export `CALLOUT_ALIASES` and `calloutShadeFrom` so the shims have nothing left to add). The re-export shims can then be deleted.

---

## PR note

**Summary** — Absorb five real consumer workarounds into the design system: on-dark Button variants, colour-neutral `eyebrow` / `btn-mono`, BrushMark short-name aliases plus an export-safe inline-SVG mode, and a menu-row recipe.

**Changes**
- UI: `button.tsx` (+`inverse`, `inverse-ghost`), new `ui/menu-row.tsx`.
- Theme: `styles.css` — `eyebrow` / `btn-mono` colour dropped, `eyebrow-accent`, `eyebrow-inverse`, `btn-mono-muted`, `menu-item` added.
- Brush: `marks.ts` alias map + resolver, `BrushMark.tsx` `render` mode.
- Docs/showcase routes updated; explicit colour classes added where the removed defaults were relied on.
- `src/index.ts` exports; `.lovable/design-system.json` enrichment for the new APIs.

**Backend / schema changes** — None.

**Testing & verification** — Build plus a browser pass over `/components`, `/marks`, `/chrome` and the overview: inverse variants on a Deep Blue band (mouse and keyboard focus), inline-mode marks rendering identically to mask mode, alias resolution for `arrow1` / `highlight1` / `stroke4` / `star`, and no visual drift on the docs pages after the utility colour removal.

**Risks & rollback** — Only genuinely breaking bit: `eyebrow` / `btn-mono` no longer set a colour, so any consumer relying on the implicit primary sees inherited colour instead; called out in the migration note. Revert is a single change, no data involved.

**Follow-ups / known debt** — Inline mode does one fetch per distinct mark; if a share-card path needs many marks at once we can add a prefetch helper later.
