import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/siteConfig";
import { ROUTES } from "@/constants/routes";

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  withText?: boolean;
  href?: string;
}

/**
 * Single-color mark (a geometric "ص" merged with a page-fold shape, per
 * the approved brand identity), rendered inline as SVG.
 */
function LogoMark({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-10 w-10 items-center justify-center rounded-md bg-primary", className)}>
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
          stroke="hsl(var(--primary-foreground))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
          stroke="hsl(var(--primary-foreground))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
  ({ withText = true, href = ROUTES.HOME, className, ...props }, ref) => (
    <div ref={ref} className={cn("inline-flex items-center gap-2.5", className)} {...props}>
      <Link href={href} className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md">
        <LogoMark />
        {withText && (
          <span className="flex flex-col leading-tight">
            <span className="text-h3">{siteConfig.name}</span>
            <span className="text-caption uppercase tracking-wide text-muted-foreground">
              {siteConfig.technicalName}
            </span>
          </span>
        )}
      </Link>
    </div>
  )
);
Logo.displayName = "Logo";

export { Logo, LogoMark };
