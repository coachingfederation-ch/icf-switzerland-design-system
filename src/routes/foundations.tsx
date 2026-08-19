import { createFileRoute } from "@tanstack/react-router";
import { COLOR_GROUPS, RADII, TYPE_SCALE } from "@/lib/design-tokens";

export const Route = createFileRoute("/foundations")({
  head: () => ({
    meta: [
      { title: "Foundations — ICF Switzerland Design System" },
      {
        name: "description",
        content:
          "Colour tokens by role, the Quicksand and Plus Jakarta Sans type scale, radii, elevation and focus states of the ICF Switzerland design system.",
      },
      { property: "og:title", content: "Foundations — ICF Switzerland Design System" },
      {
        property: "og:description",
        content: "Colour, typography, radii, elevation and focus states, with token names.",
      },
    ],
  }),
  component: Foundations,
});

function Foundations() {
  return (
    <main id="main" className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <p className="eyebrow">Foundations</p>
      <h1 className="display-lg mt-3">Colour, type and shape</h1>
      <p className="mt-4 max-w-2xl text-[17px] leading-[1.65] text-muted-foreground">
        Every value below is a CSS custom property in{" "}
        <code className="btn-mono">src/styles.css</code> exposed as a Tailwind utility. Swatches
        paint with the real utility, so this page cannot drift from the stylesheet.
      </p>

      <section aria-labelledby="colour" className="mt-14">
        <h2 id="colour" className="text-2xl">
          Colour
        </h2>
        <div className="mt-6 grid gap-10">
          {COLOR_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="text-lg">{group.title}</h3>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{group.description}</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.swatches.map((swatch) => (
                  <div
                    key={swatch.token}
                    className="overflow-hidden rounded-2xl border border-border bg-card"
                  >
                    <div
                      className={`flex h-24 items-end p-4 ${swatch.className} ${swatch.onClassName ?? ""}`}
                    >
                      {swatch.onClassName && <span className="text-sm font-semibold">Aa</span>}
                    </div>
                    <div className="p-4">
                      <p className="font-mono text-xs text-primary">{swatch.token}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{swatch.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="type" className="mt-20">
        <h2 id="type" className="text-2xl">
          Typography
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Quicksand carries every heading and display step; Plus Jakarta Sans carries body and UI
          text. Both are single variable WOFF2 files served from our own origin — no external font
          CDN, anywhere.
        </p>
        <div className="mt-6 divide-y divide-border rounded-3xl border border-border bg-card">
          {TYPE_SCALE.map((step) => (
            <div key={step.meta} className="p-6">
              <p className={step.className}>{step.sample}</p>
              <p className="mt-3 font-mono text-xs text-muted-foreground">{step.meta}</p>
            </div>
          ))}
          <div className="p-6">
            <p className="eyebrow">Eyebrow label</p>
            <p className="section-label mt-3">Section label</p>
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              eyebrow (primary) / section-label (muted) · 11px · 700 · tracking 0.16em · uppercase
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="shape" className="mt-20">
        <h2 id="shape" className="text-2xl">
          Radii and elevation
        </h2>
        <div className="mt-6 flex flex-wrap gap-4">
          {RADII.map((radius) => (
            <div key={radius.token} className="w-44">
              <div className={`h-20 border border-border bg-secondary ${radius.className}`} />
              <p className="mt-2 font-mono text-xs text-primary">{radius.className}</p>
              <p className="text-xs text-muted-foreground">{radius.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 max-w-md rounded-2xl bg-card p-6 shadow-soft">
          <p className="text-sm font-semibold">shadow-soft</p>
          <p className="mt-2 text-sm text-muted-foreground">
            The single elevation token: two stacked deep-blue shadows at 5% opacity. Cards and
            popovers use it instead of ad-hoc shadows.
          </p>
        </div>
      </section>

      <section aria-labelledby="focus" className="mt-20">
        <h2 id="focus" className="text-2xl">
          Focus states
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          A base-layer rule gives every interactive element a 2px ring in <code>--ring</code> with a
          2px offset, so utilities that clear the outline cannot remove the only keyboard indicator.
          On dark hero bands the ring switches to the hero foreground. Tab through the examples.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="section-label">On light</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                className="h-10 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
              >
                Focus me
              </button>
              <a
                href="#focus"
                className="inline-flex h-10 items-center text-sm font-semibold text-primary"
              >
                And me
              </a>
            </div>
          </div>
          <div className="rounded-2xl bg-hero p-6 text-hero-foreground">
            <p className="section-label !text-white/70">On hero</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                className="h-10 rounded-full bg-accent px-5 text-sm font-semibold text-accent-foreground"
              >
                Focus me
              </button>
              <a href="#focus" className="inline-flex h-10 items-center text-sm font-semibold">
                And me
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
