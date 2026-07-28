import * as React from "react";

import { cn } from "@/lib/utils";
import { SectionTitle } from "@/features/home/components/SectionTitle";

export interface OffersSectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  badge?: string;
  /** Offer cards — content/pricing is out of this phase's scope. */
  children: React.ReactNode;
}

const OffersSection = React.forwardRef<HTMLElement, OffersSectionProps>(
  ({ title, description, badge, children, className, ...props }, ref) => (
    <section ref={ref} className={cn("rounded-lg bg-accent p-6 md:p-8", className)} {...props}>
      <div className="mb-5 flex items-center justify-between gap-4">
        <SectionTitle title={title} description={description} className="mb-0" />
        {badge && (
          <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
            {badge}
          </span>
        )}
      </div>
      {children}
    </section>
  )
);
OffersSection.displayName = "OffersSection";

export { OffersSection };
