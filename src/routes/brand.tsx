import { createFileRoute } from "@tanstack/react-router";
import { CompactHero } from "@/components/patterns/StyleGuidePatterns";
import { Callout } from "@/components/callout";
import { MarkedText } from "@/components/brush/BrushMark";
import { AiBadge, AiPhoto } from "@/components/photography/AiPhoto";
import coachingConversation from "@/assets/photography/coaching-conversation.jpg";
import honestPortrait from "@/assets/photography/honest-portrait.jpg";
import communityCircle from "@/assets/photography/community-circle.jpg";
import focusInAction from "@/assets/photography/focus-in-action.jpg";
import {
  AI_PHOTOGRAPHY,
  BEHAVIORS,
  BRAND_STRATEGY,
  COLOR_RATIO,
  FORMAL_DEVICES,
  HIGHLIGHT_RULES,
  MASTER_STYLES,
  PHOTOGRAPHY,
  STYLISTIC_DEVICES,
  TEXT_COLOR_CLASS,
  TEXT_COMBINATIONS,
  TYPE_ROLES,
  VOICE_STAGES,
} from "@/lib/brand-guidelines";

/** Reference frames generated under the AI photography rules above. */
const AI_EXAMPLES = [
  {
    src: coachingConversation,
    width: 1280,
    height: 854,
    alt: "A coach listening to a client across a table in a daylit office",
    caption: "Candid coaching moment — window light, unposed, honest expressions.",
  },
  {
    src: communityCircle,
    width: 1280,
    height: 854,
    alt: "A diverse group of adults laughing together in a workshop circle",
    caption: "Community in a circle — genuine laughter, deliberate diversity, plain room.",
  },
  {
    src: honestPortrait,
    width: 1024,
    height: 1024,
    alt: "Portrait of a man with a calm, honest expression in soft window light",
    caption: "Honest portrait — natural skin texture, no studio gloss, no retouching.",
  },
  {
    src: focusInAction,
    width: 1280,
    height: 854,
    alt: "Close-up of hands taking notes in a notebook during a coaching session",
    caption: "Focus in action — detail shot of engagement rather than a staged pose.",
  },
] as const;

export const Route = createFileRoute("/brand")({
  head: () => ({
    meta: [
      { title: "Brand Rules — ICF Switzerland Design System" },
      {
        name: "description",
        content:
          "The ICF brand guidelines distilled for builders: strategy, tone of voice, verbal devices, editorial master styles, colour ratio, text pairings, type roles and photography direction.",
      },
      { property: "og:title", content: "Brand Rules — ICF Switzerland Design System" },
      {
        property: "og:description",
        content:
          "Strategy, tone of voice, editorial styles, colour ratio and type roles extracted from the ICF Brand Guidelines.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Brand,
});

const H2 = "text-3xl sm:text-4xl";
const SECTION = "mt-16 first:mt-0";
const CARD = "rounded-3xl border border-border bg-card p-6";
const LEDE = "mt-3 max-w-3xl text-[15px] leading-[1.65] text-muted-foreground";

function Brand() {
  return (
    <>
      <CompactHero
        eyebrow="Brand rules"
        title={
          <>
            Inspire. Transform.
            <br />
            Thrive.
          </>
        }
        lede="The parts of the ICF Brand Guidelines (September 2025) that govern how anything built on this system speaks, sets type and distributes colour. The tokens implement the palette; this page carries the rules around it."
        ctaLabel="Strategy · Voice · Editorial · Colour · Type"
      />

      <main id="main" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        {/* ---------------------------------------------------------------- */}
        <section className={SECTION} aria-labelledby="strategy">
          <h2 id="strategy" className={H2}>
            Strategy
          </h2>
          <p className={LEDE}>
            Purpose, ambition and trajectory sit behind every piece of copy. The brand idea is the
            one-line summary of all three.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { label: "Purpose — why we exist", body: BRAND_STRATEGY.purpose },
              { label: "Ambition — what we want to achieve", body: BRAND_STRATEGY.ambition },
              { label: "Trajectory — how we get there", body: BRAND_STRATEGY.trajectory },
            ].map((item) => (
              <div key={item.label} className={CARD}>
                <p className="eyebrow">{item.label}</p>
                <p className="mt-3 text-[15px] leading-[1.65]">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {BRAND_STRATEGY.ideaParts.map((part) => (
              <div key={part.word} className="rounded-3xl bg-hero p-6 text-hero-foreground">
                <p className="font-heading text-2xl">{part.word}</p>
                <p className="mt-2 text-[14px] leading-[1.65] text-white/75">{part.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        <section className={SECTION} aria-labelledby="voice">
          <h2 id="voice" className={H2}>
            Tone of voice
          </h2>
          <p className={LEDE}>
            Each brand behaviour becomes a voice principle and a verbal device. Everything we write
            reflects more than one principle; the context decides which leads.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {BEHAVIORS.map((behavior) => (
              <div key={behavior.name} className={CARD}>
                <p className="eyebrow">{behavior.name}</p>
                <h3 className="mt-2 text-xl">{behavior.voice}</h3>
                <p className="mt-1 text-[13px] font-semibold text-primary">{behavior.device}</p>
                <ul className="mt-4 space-y-2 text-[14px] leading-[1.6] text-muted-foreground">
                  {behavior.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-4 overflow-x-auto rounded-3xl border border-border bg-card">
            <table className="w-full min-w-[42rem] text-left text-[14px]">
              <caption className="sr-only">
                Which tone-of-voice principle leads at each stage
              </caption>
              <thead className="bg-secondary/60 text-[12px] uppercase tracking-[0.14em]">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">Stage</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Leading principle</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Goal</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Touchpoints</th>
                </tr>
              </thead>
              <tbody>
                {VOICE_STAGES.map((row) => (
                  <tr key={row.stage} className="border-t border-border align-top">
                    <th scope="row" className="px-5 py-4 font-semibold">{row.stage}</th>
                    <td className="px-5 py-4 text-primary">{row.principle}</td>
                    <td className="px-5 py-4 text-muted-foreground">{row.goal}</td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {row.touchpoints.join(" · ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        <section className={SECTION} aria-labelledby="devices">
          <h2 id="devices" className={H2}>
            Verbal devices
          </h2>
          <p className={LEDE}>
            Formal devices apply unconditionally, whatever the audience or channel. Stylistic devices
            are for campaigns, social and brand advertising.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className={CARD}>
              <p className="eyebrow">Formal devices — always</p>
              <dl className="mt-4 divide-y divide-border">
                {FORMAL_DEVICES.map((device) => (
                  <div key={device.label} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr]">
                    <dt className="text-[13px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                      {device.label}
                    </dt>
                    <dd className="text-[14px] leading-[1.6]">
                      <span className="font-semibold">{device.value}</span>
                      <span className="text-muted-foreground"> — {device.note}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="grid content-start gap-4">
              {STYLISTIC_DEVICES.map((device) => (
                <div key={device.name} className={CARD}>
                  <h3 className="text-xl">{device.name}</h3>
                  <p className="mt-2 text-[14px] leading-[1.65] text-muted-foreground">
                    {device.body}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {device.examples.map((example) => (
                      <li
                        key={example}
                        className="rounded-2xl bg-secondary/70 px-4 py-3 font-heading text-[15px]"
                      >
                        “{example}”
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        <section className={SECTION} aria-labelledby="editorial">
          <h2 id="editorial" className={H2}>
            Editorial master styles
          </h2>
          <p className={LEDE}>
            American English, AP Stylebook as the fallback. These are the rules that shape UI copy:
            labels, dates, numbers and emphasis.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {MASTER_STYLES.map((group) => (
              <div key={group.title} className={CARD}>
                <h3 className="text-xl">{group.title}</h3>
                <ul className="mt-4 space-y-2 text-[14px] leading-[1.6] text-muted-foreground">
                  {group.rules.map((rule) => (
                    <li key={rule} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-highlight" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        <section className={SECTION} aria-labelledby="ratio">
          <h2 id="ratio" className={H2}>
            Colour ratio
          </h2>
          <p className={LEDE}>
            Deep Blue, Blue and Bone carry the identity. Yellow is an accent: the brand must read
            blueish, never yellow. The percentages are a reference, not a budget.
          </p>

          <div
            className="mt-6 flex h-16 w-full overflow-hidden rounded-2xl border border-border"
            role="img"
            aria-label={COLOR_RATIO.map((c) => `${c.name} ${c.share}%`).join(", ")}
          >
            {COLOR_RATIO.map((colour) => (
              <div
                key={colour.name}
                className={colour.className}
                style={{ width: `${colour.share}%` }}
              />
            ))}
          </div>
          <dl className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {COLOR_RATIO.map((colour) => (
              <div key={colour.name} className="rounded-2xl border border-border bg-card p-4">
                <dt className="text-[14px] font-semibold">{colour.name}</dt>
                <dd className="text-[13px] text-muted-foreground">
                  {colour.share}% · <code>--{colour.token}</code>
                </dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-10 text-2xl">Text on background</h3>
          <p className={LEDE}>
            The combination matrix, applied to both type families. Light Blue is never text on Blue
            or Deep Blue; Yellow on Deep Blue is the one small-text accent that clears contrast.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TEXT_COMBINATIONS.map((row) => (
              <div key={row.background} className="overflow-hidden rounded-3xl border border-border">
                <div className={`${row.className} space-y-1 px-5 py-6`}>
                  {row.allowed.map((name) => (
                    <p
                      key={name}
                      className={`font-heading text-lg ${TEXT_COLOR_CLASS[name] ?? "text-foreground"}`}
                    >
                      Aa — {name}
                    </p>
                  ))}
                </div>
                <div className="bg-card px-5 py-4">
                  <p className="text-[14px] font-semibold">{row.background} background</p>
                  <p className="mt-1 text-[13px] leading-[1.55] text-muted-foreground">
                    Text may be: {row.allowed.join(", ")}.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        <section className={SECTION} aria-labelledby="type">
          <h2 id="type" className={H2}>
            Type roles
          </h2>
          <p className={LEDE}>
            Hoss Round Regular for headlines, Plus Jakarta Sans for body copy — humanity and warmth
            over a practical, readable base.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {TYPE_ROLES.map((role) => (
              <div key={role.role} className={CARD}>
                <p className="eyebrow">{role.role}</p>
                <h3 className="mt-2 text-2xl">{role.family}</h3>
                <p className="mt-1 text-[13px] font-semibold text-primary">
                  In this system: {role.substitute}
                </p>
                <p className="mt-3 text-[14px] leading-[1.65] text-muted-foreground">{role.note}</p>
              </div>
            ))}
          </div>

          <Callout shade="info" emoji="ℹ️">
            <p>
              Hoss Round is a licensed typeface and is not distributed with this system. Quicksand is
              the substitute: same rounded, warm character, self-hosted and open-licensed. Swap{" "}
              <code>--font-heading</code> for Hoss Round in any project that holds the licence — no
              component changes needed.
            </p>
          </Callout>

          <h3 className="mt-10 text-2xl">
            Highlighting <MarkedText>words</MarkedText>
          </h3>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {HIGHLIGHT_RULES.map((rule) => (
              <li key={rule} className="rounded-2xl border border-border bg-card p-5 text-[14px] leading-[1.6]">
                {rule}
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------------------- */}
        <section className={SECTION} aria-labelledby="photography">
          <h2 id="photography" className={H2}>
            Photography
          </h2>
          <p className={LEDE}>{PHOTOGRAPHY.intro}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {PHOTOGRAPHY.styles.map((style) => (
              <div key={style.name} className={CARD}>
                <h3 className="text-xl">{style.name}</h3>
                <p className="mt-2 text-[14px] leading-[1.65] text-muted-foreground">{style.body}</p>
              </div>
            ))}
          </div>

          <Callout shade="warning" emoji="⚠️">
            <p>{PHOTOGRAPHY.note}</p>
          </Callout>
        </section>

        {/* ---------------------------------------------------------------- */}
        <section className={SECTION} aria-labelledby="ai-photography">
          <h2 id="ai-photography" className={H2}>
            AI-generated photography
          </h2>
          <p className={LEDE}>{AI_PHOTOGRAPHY.intro}</p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {AI_EXAMPLES.map((example) => (
              <AiPhoto
                key={example.src}
                src={example.src}
                alt={example.alt}
                caption={example.caption}
                width={example.width}
                height={example.height}
                className="aspect-[3/2]"
              />
            ))}
          </div>

          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {AI_PHOTOGRAPHY.rules.map((rule) => (
              <li key={rule} className="rounded-2xl border border-border bg-card p-5 text-[14px] leading-[1.6]">
                {rule}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-5">
            <AiBadge />
            <p className="max-w-xl text-[14px] leading-[1.6] text-muted-foreground">
              {AI_PHOTOGRAPHY.badge.usage}
            </p>
          </div>
        </section>
      </main>

    </>
  );
}
