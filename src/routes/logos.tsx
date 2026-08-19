import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { LOGOS, LOGO_MIN_SIZE, LOGO_NAMES } from "@/components/brand/logos";
import { CompactHero } from "@/components/patterns/StyleGuidePatterns";
import { Callout } from "@/components/callout";

export const Route = createFileRoute("/logos")({
  head: () => ({
    meta: [
      { title: "Logo — ICF Switzerland Design System" },
      {
        name: "description",
        content:
          "The official ICF Switzerland Charter Chapter lockups: horizontal and vertical, positive, negative and white, with clear space, minimum sizes and misuse rules.",
      },
      { property: "og:title", content: "Logo — ICF Switzerland Design System" },
      {
        property: "og:description",
        content:
          "Approved ICF Switzerland Charter Chapter logo variants with clear space, minimum sizes and misuse rules.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Logos,
});

const MISUSE = [
  "Do not recolour, tint or apply a token colour to the artwork.",
  "Do not stretch, rotate, skew or add effects such as shadows or outlines.",
  "Do not rebuild the lockup, change the spacing between mark and wordmark, or set the words in Quicksand.",
  "Do not place the positive lockup on Deep Blue, or the negative lockup on the Bone background.",
];

/** Backgrounds each tone is cleared for, so tiles preview on a true surface. */
const TONE_SURFACE: Record<string, string> = {
  positive: "bg-card",
  negative: "bg-hero",
  white: "bg-primary",
};

function Logos() {
  return (
    <>
      <CompactHero
        eyebrow="Logo"
        title={
          <>
            The chapter
            <br />
            lockup
          </>
        }
        lede="Two orientations, three tones. The artwork is fixed: it carries the ICF Blue mark and the cyan chapter wordmark, so it is placed — never recoloured, redrawn or rebuilt."
        ctaLabel="6 approved variants · PNG · RGB"
      />

      <main id="main" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <section aria-labelledby="primary">
          <p className="eyebrow">Primary</p>
          <h2 id="primary" className="display-lg mt-3">
            Horizontal is the default
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-[1.65] text-muted-foreground">
            Use the horizontal lockup wherever there is width — headers, footers, documents and
            email signatures. Switch to vertical only for narrow or square spaces such as social
            avatars and roll-ups.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="flex items-center justify-center rounded-3xl border border-border bg-card p-12">
              <Logo orientation="horizontal" tone="positive" className="max-w-md" />
            </div>
            <div className="flex items-center justify-center rounded-3xl bg-hero p-12">
              <Logo orientation="horizontal" tone="negative" className="max-w-md" />
            </div>
          </div>
        </section>

        <section aria-labelledby="variants" className="mt-20">
          <p className="eyebrow">Variants</p>
          <h2 id="variants" className="display-lg mt-3">
            Pick the tone for the surface
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LOGO_NAMES.map((name) => {
              const spec = LOGOS[name];
              return (
                <figure key={name} className="flex flex-col rounded-2xl border border-border">
                  <div
                    className={`flex min-h-44 flex-1 items-center justify-center rounded-t-2xl p-8 ${
                      TONE_SURFACE[spec.tone]
                    }`}
                  >
                    <Logo
                      orientation={spec.orientation}
                      tone={spec.tone}
                      className={spec.orientation === "horizontal" ? "max-w-56" : "max-w-28"}
                    />
                  </div>
                  <figcaption className="rounded-b-2xl bg-card p-5">
                    <p className="font-mono text-xs text-muted-foreground">{name}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{spec.on}</p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="space" className="mt-20">
          <p className="eyebrow">Clear space & size</p>
          <h2 id="space" className="display-lg mt-3">
            Give it room
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-[1.65] text-muted-foreground">
            Keep clear space of at least the height of the dot on every side, and never reproduce
            the lockup below its minimum width.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-8">
              <p className="section-label">Clear space</p>
              {/* The dashed frame marks the exclusion zone; the padding on the
                  inner box is the minimum clear space, keyed to the dot. */}
              <div className="mt-5 rounded-2xl border-2 border-dashed border-chip-active-border p-8">
                <Logo orientation="horizontal" tone="positive" className="max-w-xs" />
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8">
              <p className="section-label">Minimum size</p>
              <div className="mt-5 flex flex-wrap items-end gap-10">
                <div>
                  <Logo
                    orientation="horizontal"
                    tone="positive"
                    style={{ width: LOGO_MIN_SIZE.horizontal }}
                  />
                  <p className="mt-3 font-mono text-xs text-muted-foreground">
                    horizontal · {LOGO_MIN_SIZE.horizontal}px
                  </p>
                </div>
                <div>
                  <Logo
                    orientation="vertical"
                    tone="positive"
                    style={{ width: LOGO_MIN_SIZE.vertical }}
                  />
                  <p className="mt-3 font-mono text-xs text-muted-foreground">
                    vertical · {LOGO_MIN_SIZE.vertical}px
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="misuse" className="mt-20">
          <p className="eyebrow">Misuse</p>
          <h2 id="misuse" className="display-lg mt-3">
            Never do this
          </h2>
          <div className="mt-8 max-w-3xl">
            <Callout variant="warning" title="The artwork is fixed">
              <ul className="list-disc space-y-2 pl-5">
                {MISUSE.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            </Callout>
          </div>
        </section>
      </main>
    </>
  );
}
