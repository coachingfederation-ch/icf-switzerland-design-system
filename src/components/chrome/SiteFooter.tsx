/**
 * Site footer shell, ported from the ICF site chrome: dark hero band, muted
 * white links, copyright on the left.
 *
 * Like `SiteHeader`, the links are data supplied by the consuming project —
 * nothing about the design system's own sections is baked in.
 */
import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";
import type { SiteNavItem } from "@/components/chrome/SiteHeader";

export type SiteFooterExternalLink = {
  href: string;
  label: string;
};

export interface SiteFooterProps extends React.ComponentPropsWithoutRef<"footer"> {
  /** In-app footer links for the consuming project. */
  items?: readonly SiteNavItem[];
  /** External links (opened in a new tab). */
  externalLinks?: readonly SiteFooterExternalLink[];
  /** Line under the lockup. Defaults to `© <year> ICF Switzerland`. */
  copyright?: React.ReactNode;
  /** Accessible name of the nav landmark. */
  navLabel?: string;
}

const LINK = "inline-flex min-h-6 items-center text-white/80 hover:text-white";

export const SiteFooter = React.forwardRef<HTMLElement, SiteFooterProps>(function SiteFooter(
  { items = [], externalLinks = [], copyright, navLabel = "Footer", className, ...props },
  ref,
) {
  const hasLinks = items.length > 0 || externalLinks.length > 0;

  return (
    <footer ref={ref} className={cn("bg-hero text-hero-foreground", className)} {...props}>
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-5 py-8 text-xs sm:flex-row sm:items-center sm:px-8">
        <div className="flex flex-col gap-3">
          <Logo orientation="horizontal" tone="white" decorative className="w-40" />
          <p className="text-white/70">
            {copyright ?? `© ${new Date().getFullYear()} ICF Switzerland`}
          </p>
        </div>
        {hasLinks && (
          <nav aria-label={navLabel} className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {items.map((item) => (
              <Link key={item.to} to={item.to} className={LINK}>
                {item.label}
              </Link>
            ))}
            {externalLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
});
