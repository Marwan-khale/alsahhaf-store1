import * as React from "react";

import { cn } from "@/lib/utils";

export interface ProductListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ProductList = React.forwardRef<HTMLDivElement, ProductListProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-3", className)} {...props}>
      {children}
    </div>
  )
);
ProductList.displayName = "ProductList";

export { ProductList };
