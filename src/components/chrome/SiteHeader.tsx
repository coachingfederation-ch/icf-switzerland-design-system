/**
 * Style guide header, ported from the ICF site chrome as a presentational
 * component: same dark hero bar, yellow active underline and pill CTA, but the
 * nav links point at the style guide's own routes and there is no auth, i18n or
 * logo asset behind it (a text lockup stands in for the brand mark).
 */
import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Overview" },
  { to: "/foundations", label: "Foundations" },
  { to: "/components", label: "Components" },
  { to: "/patterns", label: "Patterns" },
] as const;

function Wordmark() {
  return (
    <Link to="/" aria-label="ICF design system home" className="inline-flex flex-col">
      <span className="font-heading text-lg font-bold leading-none tracking-tight">
        ICF Switzerland
      </span>
      <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
        Design System
      </span>
    </Link>
  );
}

const LINK =
  "relative inline-flex h-10 items-center px-3 text-[12px] font-semibold text-white/75 transition after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:rounded-full after:bg-accent after:opacity-0 after:transition hover:text-white data-[status=active]:text-white data-[status=active]:after:opacity-100";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className="bg-hero text-hero-foreground">
      <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* WCAG 2.4.1: lets keyboard users bypass the header on every page. */}
          <a
            href="#main"
            className="sr-only left-0 top-0 z-50 rounded-full bg-white text-sm font-semibold text-primary focus:not-sr-only focus:absolute focus:!px-4 focus:!py-2.5"
          >
            Skip to content
          </a>
          <Wordmark />
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <nav
              aria-label="Style guide sections"
              className="hidden items-center gap-1 md:inline-flex"
            >
              {NAV.map((item) => (
                <Link key={item.to} to={item.to} activeOptions={{ exact: true }} className={LINK}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="styleguide-mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition hover:bg-white/10 md:hidden"
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            id="styleguide-mobile-nav"
            aria-label="Style guide sections"
            className="mt-4 flex flex-col border-t border-white/15 pt-3 md:hidden"
          >
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: true }}
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-11 items-center text-sm font-semibold text-white/80 data-[status=active]:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}
