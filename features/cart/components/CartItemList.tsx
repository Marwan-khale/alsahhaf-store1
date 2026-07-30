import * as React from "react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export interface CartItemListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/** Lays out CartItem children with separators between them. */
const CartItemList = React.forwardRef<HTMLDivElement, CartItemListProps>(
  ({ children, className, ...props }, ref) => {
    const items = React.Children.toArray(children);
    return (
      <div ref={ref} className={cn("flex flex-col", className)} {...props}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <Separator className="my-3" />}
            {item}
          </React.Fragment>
        ))}
      </div>
    );
  }
);
CartItemList.displayName = "CartItemList";

export { CartItemList };
