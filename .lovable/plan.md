# BrushMark: alias parity, awaitable loader, same-origin artwork

Three closing changes so the local `marks.tsx` component can be deleted.

## 1. `circular1/2/3` aliases

Add `circular1` → `CircularMark01`, `circular2` → `CircularMark02`, `circular3` → `CircularMark03` to `MARK_ALIASES` in `src/components/brush/marks.ts`, alongside the existing `circle1/2/3` (both keep working, exactly like the legacy `star` alias). `MarkAlias` / `MarkNameOrAlias` and `MARK_ALIAS_NAMES` pick them up automatically, so `resolveMarkName("circular2")` starts resolving with no data migration.

Alias-heavy note: the alias map gains a short comment recording that the `circular*` family is the CMS-persisted spelling and must never be removed.

## 2. `loadMarkSvg(name)` — exported awaitable loader

Extract the existing private `fetchInlineSvg` / `sanitizeSvg` pair out of `src/components/brush/BrushMark.tsx` into `src/components/brush/mark-svg.ts`, and export:

```ts
loadMarkSvg(name: MarkNameOrAlias): Promise<string>
```

It resolves the alias, looks up the mark URL, and returns the same sanitised, `currentColor`-forced markup, sharing the same module-level per-URL promise cache that `render="inline"` uses — so a canvas renderer and an inline component that use the same mark trigger one fetch total. `BrushMark` imports from the new module; its behaviour is unchanged. No new fetching: still lazy, still one request per distinct mark actually used.

## 3. Same-origin artwork

Ship the raw SVGs in the library so a bundler resolves them from the consumer's own origin:

- Download the 30 optimised artworks from the CDN into `src/assets/marks/*.svg` (they stay next to the existing `.asset.json` pointers).
- `marks.ts` switches to `import url from "@/assets/marks/Arrow01.svg?url"` style URL imports. These emit hashed asset files into the consumer's build output and are *referenced*, never inlined — nothing is eagerly downloaded, each mark still costs one lazy request on first use, identical to today.
- Add a documented escape hatch for consumers who serve artwork from their own path (a CDN prefix, a CMS bucket):

```ts
configureMarkUrls((name, defaultUrl) => `/brand/marks/${name}.svg`)
```

  A module-level resolver override, read by `MARKS`' accessors and by `loadMarkSvg`, so `MARKS[name].url` and both render modes follow it. Calling it resets the fetch cache for any changed URL.

Because both the bundled files and `loadMarkSvg` are then same-origin, the newsletter flattener and LinkedIn card canvases stay untainted.

## Exports and docs

`src/index.ts` gains `loadMarkSvg` and `configureMarkUrls`. `/marks` documents the alias families (including `circular*`), the loader with a short canvas-drawing example, and the URL override. `.lovable/design-system.json` enrichment (`usage`, `examples`, `antipatterns`) is updated for `BrushMark` to cover the loader and the origin override.

---

## PR note

**Summary** — Close the last three BrushMark gaps blocking a consumer migration: CMS `circular*` alias parity, an exported awaitable `loadMarkSvg`, and same-origin artwork delivery with a documented URL override.

**Changes**
- Brush: `marks.ts` (+`circular1/2/3` aliases, bundler URL imports, `configureMarkUrls`), new `mark-svg.ts` (`loadMarkSvg` + sanitiser + cache), `BrushMark.tsx` re-points at it.
- Assets: 30 raw `.svg` files added under `src/assets/marks/`.
- Docs: `/marks` route; `src/index.ts` exports; `.lovable/design-system.json` enrichment.

**Backend / schema changes** — None.

**Testing & verification** — Build, then a browser pass over `/marks`: every mark renders in mask and inline mode from the new same-origin URLs, `circular2` and `circle2` resolve to the same artwork, `loadMarkSvg` returns sanitised markup and fires one network request per mark (checked in the network panel), and no request goes to an external origin.

**Risks & rollback** — Adds ~2.2 MB of source SVG to the repo; build output is unchanged in behaviour since files are referenced lazily. Revert is contained to the brush folder plus the asset files.

**Follow-ups / known debt** — The `.asset.json` pointers stay in place for now; they can be removed once no consumer reads them.
