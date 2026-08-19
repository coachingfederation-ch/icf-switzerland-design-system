import { createFileRoute, Link } from "@tanstack/react-router";
import { COLOR_GROUPS } from "@/lib/design-tokens";
import { CompactHero, PillarCards } from "@/components/patterns/StyleGuidePatterns";
import { BrushMark, MarkedText } from "@/components/brush/BrushMark";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ICF Switzerland Design System" },
      {
        name: "description",
        content:
          "The ICF Switzerland design system: OKLCH colour tokens, self-hosted Quicksand and Plus Jakarta Sans typography, components and page patterns.",
      },
      { property: "og:title", content: "ICF Switzerland Design System" },
      {
        property: "og:description",
        content:
          "Colour tokens, typography, components and page patterns for the ICF Switzerland chapter.",
      },
    ],
  }),
  component: Overview,
});

const SECTIONS = [
  {
    to: "/brand" as const,
    label: "Brand",
    body: "Strategy, tone of voice, verbal devices, editorial master styles, colour ratio and type roles from the brand guidelines.",
  },
  {
    to: "/foundations" as const,
    label: "Foundations",
    body: "Colour tokens by role, the Quicksand and Plus Jakarta Sans type scale, radii, shadow and focus states.",
  },
  {
    to: "/components" as const,
    label: "Components",
    body: "The shadcn component set as styled for ICF: buttons, forms, overlays, tables and feedback.",
  },
  {
    to: "/patterns" as const,
    label: "Patterns",
    body: "Page-level compositions: hero band, pillar cards, filter chips, callouts and the marquee.",
  },
  {
    to: "/logos" as const,
    label: "Logo",
    body: "The approved chapter lockups: orientations, tones, clear space, minimum sizes and misuse.",
  },
  {
    to: "/social" as const,
    label: "Social",
    body: "Profile banners for LinkedIn, X and Facebook: export sizes, tagline lockup and safe areas.",
  },
  {
    to: "/chrome" as const,
    label: "Chrome",
    body: "The header and footer shells: lockup placement per band, primary versus secondary links, the single accent CTA and the mobile sheet.",
  },
  {
    to: "/marks" as const,
    label: "Marks",
    body: "The hand-drawn brush-mark library: underlines, strokes, asterisks, arrows and rings, tinted with tokens.",
  },
];

function Overview() {
  const brand = COLOR_GROUPS.find((group) => group.title === "Brand")!;

  return (
    <>
      <CompactHero
        eyebrow="Design system"
        title={
          <>
            One visual language for
            <br />
            <MarkedText name="TextHighlighMark01" markClassName="-bottom-2 h-[0.22em]">
              ICF Switzerland
            </MarkedText>
          </>
        }
        lede="Every colour, type step and component in this reference comes from the live ICF Switzerland site. Values are OKLCH tokens, typefaces are self-hosted, and nothing depends on an external CDN."
        ctaLabel="Built on the official ICF palette"
      />

      <main id="main" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <section aria-labelledby="palette">
          <p className="eyebrow">Palette</p>
          <h2 id="palette" className="display-lg mt-3">
            The official ICF colours
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-[1.65] text-muted-foreground">
            {brand.description}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {brand.swatches.map((swatch) => (
              <div
                key={swatch.token}
                className={`flex min-h-40 flex-col justify-end rounded-2xl p-5 shadow-soft ${swatch.className} ${swatch.onClassName ?? ""}`}
              >
                <p className="font-mono text-xs opacity-80">{swatch.token}</p>
                <p className="mt-1 text-sm font-semibold">{swatch.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="pillars" className="mt-20">
          <p className="eyebrow">Pillars</p>
          <h2 id="pillars" className="display-lg mt-3">
            Three fixed pillar colours
          </h2>
          <div className="mt-8">
            <PillarCards />
          </div>
        </section>

        <section aria-labelledby="explore" className="mt-20">
          <p className="eyebrow">Explore</p>
          <h2 id="explore" className="display-lg mt-3">
            Where to go next
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SECTIONS.map((section) => (
              <Link
                key={section.to}
                to={section.to}
                className="group flex flex-col rounded-3xl border border-border bg-card p-6 transition hover:border-chip-active-border"
              >
                <h3 className="text-xl">{section.label}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-[1.65] text-muted-foreground">
                  {section.body}
                </p>
                <span className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary">
                  Open {section.label.toLowerCase()}
                  <BrushMark
                    name="Arrow03"
                    className="h-3 text-primary transition group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
