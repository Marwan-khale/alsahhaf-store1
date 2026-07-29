import * as React from "react";

import { cn } from "@/lib/utils";

export interface ProductGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ProductGrid = React.forwardRef<HTMLDivElement, ProductGridProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4", className)}
      {...props}
    >
      {children}
    </div>
  )
);
ProductGrid.displayName = "ProductGrid";

export { ProductGrid };
