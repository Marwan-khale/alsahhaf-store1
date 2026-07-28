import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";

export interface HeroCta {
  label: string;
  href: string;
  variant?: ButtonProps["variant"];
}

export interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  ctas?: HeroCta[];
  visual?: React.ReactNode;
}

/** Homepage banner. All copy, links, and visual content are supplied via props. */
const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(
  ({ eyebrow, title, description, ctas = [], visual, className, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(
        "grid grid-cols-1 items-center gap-6 rounded-lg bg-primary p-8 text-primary-foreground md:grid-cols-2 md:p-14",
        className
      )}
      {...props}
    >
      <div>
        {eyebrow && (
          <span className="mb-4 inline-flex rounded-full bg-secondary/20 px-3 py-1.5 text-xs font-bold text-secondary">
            {eyebrow}
          </span>
        )}
        <h1 className="text-display">{title}</h1>
        {description && <p className="mt-3 max-w-md text-sm text-primary-foreground/70">{description}</p>}
        {ctas.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {ctas.map((cta) => (
              <Button key={cta.href} asChild variant={cta.variant ?? "secondary"}>
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            ))}
          </div>
        )}
      </div>
      {visual && <div className="flex items-center justify-center">{visual}</div>}
    </section>
  )
);
HeroSection.displayName = "HeroSection";

export { HeroSection };
