import * as React from "react";

import { cn } from "@/lib/utils";

export interface BenefitItem {
  icon?: React.ReactNode;
  title: string;
  description?: string;
}

export interface BenefitsSectionProps extends React.HTMLAttributes<HTMLElement> {
  items: BenefitItem[];
}

const BenefitsSection = React.forwardRef<HTMLElement, BenefitsSectionProps>(
  ({ items, className, ...props }, ref) => (
    <section ref={ref} className={cn(className)} {...props}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            {item.icon && (
              <span aria-hidden="true" className="shrink-0 text-secondary">
                {item.icon}
              </span>
            )}
            <div>
              <h3 className="text-sm font-bold">{item.title}</h3>
              {item.description && (
                <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
);
BenefitsSection.displayName = "BenefitsSection";

export { BenefitsSection };
