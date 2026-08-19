# Header and footer navigation should be consumer-defined

Right now `SiteHeader` and `SiteFooter` hardcode the design-system's own routes (Overview, Brand, Foundations, Components, Patterns, Marks, Logo, Social). Any project that attaches this library gets that navigation verbatim, and the instructions never say those links are reference-only. Fix both: make the nav data a prop, and say so in the knowledge files.

## Changes

**1. `src/components/chrome/SiteHeader.tsx`**
- Add a `items?: { to: string; label: string }[]` prop (plus optional `homeTo`, `eyebrow`/kicker text next to the logo, and `rightSlot` for a CTA or locale switcher).
- Keep the current design-system list only as the fallback used by this project's own preview, defined in the showcase (`__root.tsx`), not inside the component.
- Component keeps all styling behaviour: hero band, yellow active underline, mobile menu, skip-to-content link.

**2. `src/components/chrome/SiteFooter.tsx`**
- Same treatment: `items?`, `copyright?` (or `orgName`), optional `externalLinks?`.
- Default rendering shows nothing hardcoded about the style guide when items are supplied.

**3. `src/routes/__root.tsx`**
- Pass the design-system's own route list into both components, so the style guide looks unchanged.

**4. `.lovable/system.md`**
- New short "Site chrome" rule: the header/footer nav in this library is a layout shell, not an information architecture. Consumers must pass their own routes; never copy the design-system's Brand/Foundations/Components/Patterns/Marks/Logo/Social links into a product app, and never link to routes the project doesn't have.

**5. `.lovable/design-system.json`**
- Fill `usage`, `examples`, and `antipatterns` for `SiteHeader` and `SiteFooter` so the rendered `components.md` shows a real example with project routes and lists "reusing the design-system's own nav links" as an antipattern.

## PR note

**Summary** — Header and footer nav becomes data passed in by the consuming project instead of hardcoded design-system routes, and the library instructions state that explicitly.

**Changes**
- UI: `SiteHeader` / `SiteFooter` gain nav-item and label props; defaults move to the style guide's root route.
- Knowledge: new site-chrome rule in `system.md`; component `usage`/`examples`/`antipatterns` enriched in `design-system.json`.

**Backend / schema changes** — None.

**Testing & verification** — Style guide renders identically at desktop and mobile widths (nav, active underline, mobile menu toggle, footer links) via browser check; typecheck clean.

**Risks & rollback** — Low; props are optional so existing usage keeps compiling. Revert the two component files and the two knowledge files.

**Follow-ups** — Consumers already attached to this library only pick the change up after a new publish and accepting the update.
