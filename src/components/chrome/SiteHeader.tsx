/**
 * Site header shell, ported from the ICF site chrome: dark hero bar, yellow
 * active underline, negative brand lockup and a responsive mobile menu.
 *
 * The navigation is DATA, not part of the design: consumers pass their own
 * routes via `items`. The design system's own sections are only the fallback
 * used by this project's style guide preview.
 */
import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

export type SiteNavItem = {
  /** Route path, e.g. `/about`. Must exist in the consuming project. */
  to: string;
  label: string;
};

export interface SiteHeaderProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Navigation links for the consuming project. Required in real apps. */
  items?: readonly SiteNavItem[];
  /** Where the brand lockup links to. Defaults to `/`. */
  homeTo?: string;
  /** Accessible name of the nav landmark. */
  navLabel?: string;
  /** Small kicker rendered beside the lockup, e.g. a sub-brand or section. */
  kicker?: React.ReactNode;
  /** Accessible label on the brand link. */
  brandLabel?: string;
  /** Optional trailing slot for a CTA, locale switcher, or account menu. */
  rightSlot?: React.ReactNode;
}

const LINK =
  "relative inline-flex h-10 items-center px-3 text-[12px] font-semibold text-white/75 transition after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:rounded-full after:bg-accent after:opacity-0 after:transition hover:text-white data-[status=active]:text-white data-[status=active]:after:opacity-100";

export const SiteHeader = React.forwardRef<HTMLDivElement, SiteHeaderProps>(function SiteHeader(
  {
    items = [],
    homeTo = "/",
    navLabel = "Main",
    kicker,
    brandLabel = "ICF Switzerland home",
    rightSlot,
    className,
    ...props
  },
  ref,
) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div ref={ref} className={cn("bg-hero text-hero-foreground", className)} {...props}>
      <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* WCAG 2.4.1: lets keyboard users bypass the header on every page. */}
          <a
            href="#main"
            className="sr-only left-0 top-0 z-50 rounded-full bg-white text-sm font-semibold text-primary focus:not-sr-only focus:absolute focus:!px-4 focus:!py-2.5"
          >
            Skip to content
          </a>
          <Link to={homeTo} aria-label={brandLabel} className="inline-flex items-center gap-4">
            {/* Negative lockup: the header sits on the Deep Blue hero band. */}
            <Logo orientation="horizontal" tone="negative" decorative className="w-36 sm:w-44" />
            {kicker ? (
              <span className="hidden border-l border-white/25 pl-4 text-[10px] font-bold uppercase leading-[1.35] tracking-[0.22em] text-accent sm:inline-block">
                {kicker}
              </span>
            ) : null}
          </Link>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {items.length > 0 && (
              <nav aria-label={navLabel} className="hidden items-center gap-1 md:inline-flex">
                {items.map((item) => (
                  <Link key={item.to} to={item.to} activeOptions={{ exact: true }} className={LINK}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            )}
            {rightSlot}
            {items.length > 0 && (
              <button
                type="button"
                aria-expanded={menuOpen}
                aria-controls="site-mobile-nav"
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
            )}
          </div>
        </div>
        {menuOpen && items.length > 0 && (
          <nav
            id="site-mobile-nav"
            aria-label={navLabel}
            className="mt-4 flex flex-col border-t border-white/15 pt-3 md:hidden"
          >
            {items.map((item) => (
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
});
