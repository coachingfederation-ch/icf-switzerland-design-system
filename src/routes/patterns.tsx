import { createFileRoute } from "@tanstack/react-router";
import {
  CalloutSet,
  ChipRow,
  CompactHero,
  Marquee,
  PillarCards,
} from "@/components/patterns/StyleGuidePatterns";

export const Route = createFileRoute("/patterns")({
  head: () => ({
    meta: [
      { title: "Patterns — ICF Switzerland Design System" },
      {
        name: "description",
        content:
          "Page-level ICF Switzerland compositions: the dark hero band, pillar cards, filter chips, callouts and the CSS-only partner marquee.",
      },
      { property: "og:title", content: "Patterns — ICF Switzerland Design System" },
      {
        property: "og:description",
        content: "Hero band, pillar cards, filter chips, callouts and the partner marquee.",
      },
    ],
  }),
  component: Patterns,
});

function Patterns() {
  return (
    <main id="main">
      <CompactHero
        eyebrow="Pattern"
        title="The hero band"
        lede="Deep Blue fills the band, the eyebrow switches to yellow, display-xl carries the headline and the CTA is an accent pill. Used on every inner page of the site."
        ctaLabel="Primary action"
      />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <section aria-labelledby="pillars">
          <p className="eyebrow text-primary">Pattern</p>
          <h2 id="pillars" className="display-lg mt-3">
            Pillar cards
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-[1.65] text-muted-foreground">
            A card per strategic pillar, keyed by a 2px colour rail at the top. The rail is the only
            place the pillar colours appear as large fills.
          </p>
          <div className="mt-8">
            <PillarCards />
          </div>
        </section>

        <section aria-labelledby="chips" className="mt-20">
          <p className="eyebrow text-primary">Pattern</p>
          <h2 id="chips" className="display-lg mt-3">
            Filter chips
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-[1.65] text-muted-foreground">
            Directory and event filters. The selected chip is marked by the Light Blue border, never
            by text colour alone — Light Blue is not a text-safe colour.
          </p>
          <div className="mt-8">
            <ChipRow />
          </div>
        </section>

        <section aria-labelledby="callouts" className="mt-20">
          <p className="eyebrow text-primary">Pattern</p>
          <h2 id="callouts" className="display-lg mt-3">
            Callouts
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-[1.65] text-muted-foreground">
            Editorial callouts for long-form content, in three shades. Each pairs a soft fill with a
            solid rail and an emoji chip.
          </p>
          <div className="mt-8 max-w-3xl">
            <CalloutSet />
          </div>
        </section>
      </div>

      <section aria-labelledby="marquee" className="border-y border-border bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="eyebrow text-primary">Pattern</p>
          <h2 id="marquee" className="display-lg mt-3">
            Partner marquee
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-[1.65] text-muted-foreground">
            A CSS-only loop: the track is rendered twice and translated by -50%. Motion pauses on
            hover and focus, and is disabled entirely under reduced-motion, where the band becomes a
            plain scrollable row.
          </p>
        </div>
        <div className="mt-8">
          <Marquee />
        </div>
      </section>
    </main>
  );
}
