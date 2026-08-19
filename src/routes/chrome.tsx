import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";

export const Route = createFileRoute("/chrome")({
  head: () => ({
    meta: [
      { title: "Site chrome — ICF Switzerland Design System" },
      {
        name: "description",
        content:
          "The abstracted ICF Switzerland header and footer: lockup placement, tone per band, primary versus secondary links, the single accent CTA and the mobile sheet.",
      },
      { property: "og:title", content: "Site chrome — ICF Switzerland Design System" },
      {
        property: "og:description",
        content:
          "Header and footer anatomy: where the lockup sits, which links belong where, and the one accent call to action.",
      },
    ],
  }),
  component: Chrome,
});

/** Example product navigation — deliberately not the style guide's own routes. */
const APP_NAV = [
  { to: "/", label: "Home" },
  { to: "/brand", label: "About" },
  { to: "/patterns", label: "For coaches" },
  { to: "/components", label: "Insights" },
  { to: "/foundations", label: "Events" },
] as const;

const APP_FOOTER = [
  { to: "/brand", label: "About" },
  { to: "/components", label: "Insights" },
  { to: "/logos", label: "Imprint" },
  { to: "/social", label: "Privacy" },
] as const;

const HEADER_RULES = [
  {
    title: "Lockup, top left, negative tone",
    body: 'The horizontal negative lockup always sits at the leading edge of the Deep Blue band and always links home. `variant="hero"` enlarges it for the landing page; `compact` is the inner-page size. Never centre it, never swap in the positive lockup on this band, and never place a second logo in the bar.',
  },
  {
    title: "Primary links, right, four to six of them",
    body: "The header carries only primary destinations. Beyond six entries the bar wraps and the active underline stops reading as navigation — group deeper pages under a section page instead.",
  },
  {
    title: "One accent pill, always last",
    body: "The Yellow pill is the single call to action and sits at the trailing edge, after the utility controls. Utility controls (language, account, search) are ghost-outlined pills only — a second Yellow pill breaks the 10% accent ratio and the visual hierarchy.",
  },
  {
    title: "Active state is the underline",
    body: "The current page is marked by the Yellow underline plus full-white text. Never mark it by colour alone, and never underline non-active links — an underline elsewhere reads as a broken link.",
  },
  {
    title: "Below `lg`, everything collapses into the sheet",
    body: "Nav, CTA and the `mobileSlot` block move into the sheet under the bar. The burger keeps a 44px target, Escape closes, and the skip link stays first in the DOM on every page.",
  },
];

const FOOTER_RULES = [
  {
    title: "White lockup, then the copyright",
    body: "The footer band is the same Deep Blue, so the lockup is the white tone, stacked above the copyright line at the leading edge.",
  },
  {
    title: "Secondary links only — no mirror of the header",
    body: "Legal, contact, ethics and deeper destinations belong here. The footer intentionally does not repeat the header set, and it may link to pages the header never shows.",
  },
  {
    title: "External links are marked as external",
    body: 'Pass them through `externalLinks`: they open in a new tab with `rel="noopener noreferrer"`. Never mix an external URL into `items`.',
  },
  {
    title: "One wrapping row, no columns",
    body: "The footer stays a single wrapping row. If the link set needs columns, the content belongs on a sitemap or section page instead.",
  },
];

function RuleList({ rules }: { rules: { title: string; body: string }[] }) {
  return (
    <ol className="mt-8 grid gap-4 sm:grid-cols-2">
      {rules.map((rule, index) => (
        <li key={rule.title} className="rounded-3xl border border-border bg-card p-6">
          <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
          <h3 className="mt-3 text-lg">{rule.title}</h3>
          <p className="mt-3 text-[15px] leading-[1.65] text-muted-foreground">{rule.body}</p>
        </li>
      ))}
    </ol>
  );
}

function Chrome() {
  return (
    <main id="main">
      <SiteHeader
        variant="hero"
        items={APP_NAV}
        navLabel="Example product navigation"
        cta={{ to: "/components", label: "Find a coach" }}
        utilitySlot={
          <span className="hidden h-10 items-center rounded-full border border-white/25 px-4 text-[11px] font-semibold uppercase tracking-wider text-white sm:inline-flex">
            EN
          </span>
        }
      />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <p className="eyebrow">Chrome</p>
        <h1 className="display-lg mt-3">Header and footer</h1>
        <p className="mt-4 max-w-2xl text-[17px] leading-[1.65] text-muted-foreground">
          Both pieces are abstracted from the live ICF Switzerland site: the band, the lockup
          placement, the active underline and the accent pill are fixed, while every link is data
          the app supplies. The bar above is a product example — five app routes, one language
          control, one Yellow call to action — not this style guide&rsquo;s own navigation.
        </p>

        <section aria-labelledby="header-rules" className="mt-14">
          <p className="eyebrow">Header</p>
          <h2 id="header-rules" className="display-lg mt-3">
            Logo and link placement
          </h2>
          <RuleList rules={HEADER_RULES} />
        </section>

        <section aria-labelledby="header-api" className="mt-16">
          <h2 id="header-api" className="text-xl">
            Header in an app
          </h2>
          <pre className="mt-4 overflow-x-auto rounded-2xl bg-foreground p-5 font-mono text-[12px] leading-[1.7] text-white">
            {`<SiteHeader
  variant="compact"
  items={[
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/events", label: "Events" },
  ]}
  cta={{ to: "/find-a-coach", label: "Find a coach" }}
  utilitySlot={<LanguageSwitcher />}
  mobileSlot={<AccountLinks />}
/>`}
          </pre>
        </section>

        <section aria-labelledby="footer-rules" className="mt-16">
          <p className="eyebrow">Footer</p>
          <h2 id="footer-rules" className="display-lg mt-3">
            What belongs in the footer
          </h2>
          <RuleList rules={FOOTER_RULES} />
        </section>

        <section aria-labelledby="footer-api" className="mt-16">
          <h2 id="footer-api" className="text-xl">
            Footer in an app
          </h2>
          <pre className="mt-4 overflow-x-auto rounded-2xl bg-foreground p-5 font-mono text-[12px] leading-[1.7] text-white">
            {`<SiteFooter
  items={[
    { to: "/about", label: "About" },
    { to: "/imprint", label: "Imprint" },
    { to: "/privacy", label: "Privacy" },
  ]}
  externalLinks={[
    { href: "https://coachingfederation.org", label: "coachingfederation.org" },
  ]}
/>`}
          </pre>
        </section>
      </div>

      <section aria-labelledby="footer-live" className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
          <p className="eyebrow">Live</p>
          <h2 id="footer-live" className="display-lg mt-3">
            The footer band
          </h2>
          <p className="mt-4 max-w-2xl pb-8 text-[17px] leading-[1.65] text-muted-foreground">
            Same product example: white lockup, chapter copyright, secondary links and one external
            link.
          </p>
        </div>
        <SiteFooter
          links={[
            ...APP_FOOTER,
            {
              href: "https://coachingfederation.org",
              label: "coachingfederation.org",
              icon: <ExternalLink />,
            },
          ]}
          copyright={`© ${new Date().getFullYear()} ICF Switzerland Charter Chapter`}
        />
      </section>
    </main>
  );
}
