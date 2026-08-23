import { createFileRoute } from "@tanstack/react-router";
import { BrushMark, MarkedText } from "@/components/brush/BrushMark";
import {
  MARKS,
  MARK_ALIASES,
  MARK_CATEGORY_LABELS,
  MARK_NAMES,
  type MarkAlias,
  type MarkCategory,
  type MarkName,
} from "@/components/brush/marks";
import { CompactHero } from "@/components/patterns/StyleGuidePatterns";

export const Route = createFileRoute("/marks")({
  head: () => ({
    meta: [
      { title: "Brush Marks — ICF Switzerland Design System" },
      {
        name: "description",
        content:
          "The ICF brush-mark library: hand-drawn underlines, strokes, asterisks, arrows and circles, painted as CSS masks so every mark inherits a design token colour.",
      },
      { property: "og:title", content: "Brush Marks — ICF Switzerland Design System" },
      {
        property: "og:description",
        content:
          "Hand-drawn brush marks as design elements: underlines, strokes, asterisks, arrows and circles, tinted with ICF colour tokens.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Marks,
});

const CATEGORY_ORDER: MarkCategory[] = ["line", "stroke", "star", "arrow", "circle", "other"];

const TINTS: { label: string; className: string }[] = [
  { label: "text-primary", className: "text-primary" },
  { label: "text-accent", className: "text-accent" },
  { label: "text-highlight", className: "text-highlight" },
  { label: "text-foreground", className: "text-foreground" },
];

/*
 * Canonical name -> its numbered short alias. Legacy and duplicate spellings
 * (`star`, `circular*`) are skipped so each tile shows one canonical short
 * alias — the value a placement editor writes.
 */
const ALIAS_BY_NAME = Object.entries(MARK_ALIASES).reduce<Partial<Record<MarkName, MarkAlias>>>(
  (acc, [alias, name]) => {
    if (alias !== "star" && !acc[name]) acc[name] = alias as MarkAlias;
    return acc;
  },
  {},
);


function MarkTile({ name }: { name: MarkName }) {
  const mark = MARKS[name];

  return (
    <figure className="flex flex-col rounded-2xl border border-border bg-card p-5">
      <div className="flex h-28 items-center justify-center">
        {/* A masked span has no intrinsic size: it needs an explicit axis
            (here the height) — max-* alone collapses it to 0×0. */}
        <BrushMark name={name} className="h-24 max-w-full text-primary" />
      </div>
      <figcaption className="mt-4 border-t border-border pt-3">
        <p className="font-mono text-xs text-muted-foreground">{name}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {mark.width} × {mark.height}
          {ALIAS_BY_NAME[name] ? ` · ${ALIAS_BY_NAME[name]}` : ""}
        </p>
      </figcaption>
    </figure>
  );
}

function Marks() {
  return (
    <>
      <CompactHero
        eyebrow="Brush marks"
        title={
          <>
            Hand-drawn marks,
            <br />
            token-coloured
          </>
        }
        lede="Thirty brush marks give the system its handmade counterpoint: underlines under headlines, asterisks beside eyebrows, arrows and rings for annotation. Each one is masked, so it takes its colour from the surrounding token — never from the artwork."
        ctaLabel="30 marks · CSS mask · aria-hidden by default"
      />

      <main id="main" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <section aria-labelledby="usage">
          <p className="eyebrow text-primary">Usage</p>
          <h2 id="usage" className="display-lg mt-3">
            Three ways to use a mark
          </h2>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl border border-border bg-card p-6">
              <p className="section-label">Underline a phrase</p>
              <p className="mt-4 text-2xl">
                Coaching that <MarkedText>moves</MarkedText> Switzerland
              </p>
              <p className="mt-6 font-mono text-xs text-muted-foreground">
                {"<MarkedText>moves</MarkedText>"}
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <p className="section-label">Accent a label</p>
              <p className="mt-4 flex items-center gap-2">
                <BrushMark name="Asterisk02" className="h-5 text-accent" />
                <span className="eyebrow text-primary">Sustainable growth</span>
              </p>
              <p className="mt-6 font-mono text-xs text-muted-foreground">
                {'<BrushMark name="Asterisk02" className="h-5 text-accent" />'}
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <p className="section-label">Annotate</p>
              <p className="mt-4 flex items-center gap-3">
                <BrushMark name="Arrow03" className="h-8 text-highlight" />
                <span className="text-sm text-muted-foreground">Point at what matters</span>
              </p>
              <p className="mt-6 font-mono text-xs text-muted-foreground">
                {'<BrushMark name="Arrow03" className="h-8 text-highlight" />'}
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="tints" className="mt-20">
          <p className="eyebrow text-primary">Colour</p>
          <h2 id="tints" className="display-lg mt-3">
            One mark, any token
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-[1.65] text-muted-foreground">
            Marks are masks filled with <code className="font-mono text-sm">currentColor</code>, so
            a colour token is the only way to tint them.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TINTS.map((tint) => (
              <div
                key={tint.className}
                className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-5"
              >
                <BrushMark name="Line01" className={`h-16 ${tint.className}`} />
                <p className="font-mono text-xs text-muted-foreground">{tint.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="naming" className="mt-20">
          <p className="eyebrow text-primary">Naming & export</p>
          <h2 id="naming" className="display-lg mt-3">
            Aliases and inline rendering
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg">Short aliases</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Every mark answers to a short lowercase alias as well as its canonical name, so
                CMS-stored placements stay compact and legacy values keep resolving. Enumerate them
                with <code className="btn-mono text-primary">MARK_ALIASES</code> and normalise a
                stored value with <code className="btn-mono text-primary">resolveMarkName()</code>.
                Ring marks answer to both <code className="btn-mono text-primary">circle1</code> and{" "}
                <code className="btn-mono text-primary">circular1</code>; aliases are never removed.
              </p>
              <p className="mt-4 font-mono text-xs text-muted-foreground">
                {'<BrushMark name="highlight1" /> · "stroke4" · "arrow1" · "circular2" · "star"'}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg">Inline mode for canvas export</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                DOM-to-canvas rasterisers do not reproduce masked backgrounds. Pass{" "}
                <code className="btn-mono text-primary">render="inline"</code> and the artwork is
                fetched once per mark and inlined with{" "}
                <code className="btn-mono text-primary">fill="currentColor"</code> — same token
                guarantee, survives export. Nothing is bundled eagerly.
              </p>
              <div className="mt-5 flex items-center gap-6">
                <BrushMark name="arrow1" render="inline" className="h-16 text-primary" />
                <BrushMark name="star1" render="inline" className="h-16 text-highlight" />
                <MarkedText render="inline" className="text-lg">
                  inline underline
                </MarkedText>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg">Awaitable artwork loader</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Renderers that draw straight to a canvas need the markup, not a component.{" "}
                <code className="btn-mono text-primary">loadMarkSvg(name)</code> returns the same
                sanitised, <code className="btn-mono text-primary">currentColor</code>-painted SVG
                string that inline mode uses, through the same per-URL cache — so a share card and
                an on-page mark cost one request together.
              </p>
              <p className="mt-4 font-mono text-xs text-muted-foreground">
                {'const svg = await loadMarkSvg("circular2");'}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg">Artwork origin</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                The 30 SVGs ship inside the library and resolve through the bundler, so they are
                served from your own origin — no cross-origin fetch, and a canvas that draws them
                stays untainted. To serve them from elsewhere, call{" "}
                <code className="btn-mono text-primary">configureMarkUrls()</code> once at start-up;
                both render modes and the loader follow it.
              </p>
              <p className="mt-4 font-mono text-xs text-muted-foreground">
                {'configureMarkUrls((name) => `/brand/marks/${name}.svg`);'}
              </p>
            </div>
          </div>
        </section>


        {CATEGORY_ORDER.map((category) => {
          const names = MARK_NAMES.filter((name) => MARKS[name].category === category);
          if (names.length === 0) return null;

          return (
            <section key={category} aria-labelledby={`cat-${category}`} className="mt-20">
              <p className="eyebrow text-primary">Library</p>
              <h2 id={`cat-${category}`} className="display-lg mt-3">
                {MARK_CATEGORY_LABELS[category]}
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {names.map((name) => (
                  <MarkTile key={name} name={name} />
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </>
  );
}
