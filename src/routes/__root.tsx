import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ICF Switzerland Design System" },
      {
        name: "description",
        content:
          "Colour tokens, typography, components and page patterns of the ICF Switzerland design system.",
      },
      { name: "author", content: "ICF Switzerland" },
      { property: "og:title", content: "ICF Switzerland Design System" },
      {
        property: "og:description",
        content:
          "Colour tokens, typography, components and page patterns of the ICF Switzerland design system.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Style-guide-only navigation. This list documents the design system itself —
 * consuming projects pass their own routes to SiteHeader / SiteFooter.
 */
const STYLE_GUIDE_NAV = [
  { to: "/", label: "Overview" },
  { to: "/brand", label: "Brand" },
  { to: "/foundations", label: "Foundations" },
  { to: "/components", label: "Components" },
  { to: "/patterns", label: "Patterns" },
  { to: "/chrome", label: "Chrome" },
  { to: "/marks", label: "Marks" },
  { to: "/logos", label: "Logo" },
  { to: "/social", label: "Social" },
] as const;

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex min-h-screen flex-col">
          <SiteHeader
            items={STYLE_GUIDE_NAV}
            navLabel="Style guide sections"
            brandLabel="ICF Switzerland design system home"
            kicker={
              <>
                Design
                <br />
                System
              </>
            }
          />
          <div className="flex-1">
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
          </div>
          <SiteFooter
            links={[
              ...STYLE_GUIDE_NAV.filter((item) => item.to !== "/"),
              { href: "https://coachingfederation.org", label: "coachingfederation.org" },
            ]}
            copyright={`© ${new Date().getFullYear()} ICF Switzerland — design system reference`}
          />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
