import * as React from "react";

import { cn } from "@/lib/utils";
import { SectionTitle } from "@/features/home/components/SectionTitle";

export interface FeaturedProductsSectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  seeAllLabel?: string;
  seeAllHref?: string;
  /** Product cards/grid — rendering products is out of this phase's scope. */
  children: React.ReactNode;
}

const FeaturedProductsSection = React.forwardRef<HTMLElement, FeaturedProductsSectionProps>(
  ({ title, description, seeAllLabel, seeAllHref, children, className, ...props }, ref) => (
    <section ref={ref} className={cn(className)} {...props}>
      <SectionTitle
        title={title}
        description={description}
        actionLabel={seeAllLabel}
        actionHref={seeAllHref}
      />
      {children}
    </section>
  )
);
FeaturedProductsSection.displayName = "FeaturedProductsSection";

export { FeaturedProductsSection };
