import * as React from "react";

import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ as: Component = "section", className, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn("mt-12 md:mt-20", className)} // matches --space-section-gap tokens
      {...props}
    />
  )
);
Section.displayName = "Section";

export { Section };
