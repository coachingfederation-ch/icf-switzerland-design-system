import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { Logo } from "@/components/brand/Logo";
import { CompactHero } from "@/components/patterns/StyleGuidePatterns";
import {
  SOCIAL_FORMATS,
  SOCIAL_FORMAT_NAMES,
  SocialBanner,
} from "@/components/social/SocialBanner";

export const Route = createFileRoute("/social")({
  head: () => ({
    meta: [
      { title: "Social Banners — ICF Switzerland Design System" },
      {
        name: "description",
        content:
          "Profile header banners for LinkedIn, X and Facebook: export sizes, the tagline lockup, the cyan highlight pill and the brush mark bleed, all built from ICF tokens.",
      },
      { property: "og:title", content: "Social Banners — ICF Switzerland Design System" },
      {
        property: "og:description",
        content:
          "Token-built ICF Switzerland profile banners with the export size, safe area and tagline rules for each platform.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Social,
});

const RULES = [
  "One line of Quicksand, sentence case, closing word in the cyan pill. Never two lines.",
  "The brush mark bleeds off the right edge and stays a shade of ICF Blue on Deep Blue.",
  "Keep the Deep Blue field — the banner is never set on Bone, White or a photo.",
  "The lockup is not repeated in the banner: the profile avatar already carries it.",
];

function Social() {
  return (
    <>
      <CompactHero
        eyebrow="Social"
        title={
          <>
            Profile
            <br />
            banners
          </>
        }
        lede="Three crops, one composition: a Deep Blue field, the chapter tagline in Quicksand, a cyan pill on the closing word and a brush mark bleeding off the right edge."
        ctaLabel="3 formats · built from tokens"
      />

      <main id="main" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <section aria-labelledby="formats">
          <p className="eyebrow text-primary">Formats</p>
          <h2 id="formats" className="mt-3 font-heading text-3xl font-bold tracking-tight">
            Export at the platform size
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            The banner scales off its container, so the same component renders the
            LinkedIn, X and Facebook crops. Export each one at the exact pixel size
            below — every platform re-crops anything else.
          </p>

          <div className="mt-8 space-y-10">
            {SOCIAL_FORMAT_NAMES.map((name) => {
              const format = SOCIAL_FORMATS[name];
              return (
                <figure key={name}>
                  <SocialBanner format={name} className="rounded-2xl" />
                  <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-heading font-bold">{format.label}</span>
                    <code className="font-mono text-sm text-primary">
                      {format.width} × {format.height}
                    </code>
                    <span className="text-sm text-muted-foreground">{format.note}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="tagline" className="mt-20">
          <p className="eyebrow text-primary">Tagline</p>
          <h2 id="tagline" className="mt-3 font-heading text-3xl font-bold tracking-tight">
            The closing word carries the pill
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            The pill marks the payoff word, so there is only ever one per banner.
            Swap the wording for a campaign or a language, keeping the same shape.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <SocialBanner format="facebook" className="rounded-2xl" />
            <SocialBanner
              format="facebook"
              highlight="Wachsen."
              mark="Star01"
              className="rounded-2xl"
            >
              Inspirieren. Verändern.
            </SocialBanner>
          </div>
        </section>

        <section aria-labelledby="avatar" className="mt-20">
          <p className="eyebrow text-primary">Avatar</p>
          <h2 id="avatar" className="mt-3 font-heading text-3xl font-bold tracking-tight">
            Pair the banner with the vertical lockup
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Profile pictures are square, so the vertical lockup goes in the avatar —
            negative on Deep Blue, or positive on White. That is why the banner
            itself carries no logo.
          </p>

          <div className="mt-8 flex flex-wrap gap-6">
            <div className="flex size-40 items-center justify-center rounded-full bg-hero p-7">
              <Logo orientation="vertical" tone="negative" decorative />
            </div>
            <div className="flex size-40 items-center justify-center rounded-full bg-card p-7 shadow-[var(--shadow-soft)]">
              <Logo orientation="vertical" tone="positive" decorative />
            </div>
          </div>
        </section>

        <section aria-labelledby="rules" className="mt-20">
          <p className="eyebrow text-primary">Rules</p>
          <h2 id="rules" className="mt-3 font-heading text-3xl font-bold tracking-tight">
            What stays fixed
          </h2>
          <Callout shade="warning" emoji="⛔">
            <ul className="list-disc space-y-1 pl-5">
              {RULES.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </Callout>
        </section>
      </main>
    </>
  );
}
