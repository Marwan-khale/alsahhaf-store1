import * as React from "react";

import { cn } from "@/lib/utils";

export interface ProductPriceProps {
  price: number;
  comparePrice?: number;
  currency: string;
  className?: string;
}

/** Pure display — formatting only, no discount/percentage calculation. */
function ProductPrice({ price, comparePrice, currency, className }: ProductPriceProps) {
  const showCompare = typeof comparePrice === "number" && comparePrice > price;

  return (
    <div className={cn("flex items-baseline gap-2 text-tabular", className)}>
      <span className="text-sm font-bold">
        {price.toLocaleString()} {currency}
      </span>
      {showCompare && (
        <span className="text-xs text-muted-foreground line-through">
          {comparePrice!.toLocaleString()} {currency}
        </span>
      )}
    </div>
  );
}

export { ProductPrice };
