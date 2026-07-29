import * as React from "react";

import { cn } from "@/lib/utils";

export interface ProductStockProps {
  inStock: boolean;
  inStockLabel?: string;
  outOfStockLabel?: string;
  className?: string;
}

/** Displays the given boolean state. Does not decide stock thresholds. */
function ProductStock({
  inStock,
  inStockLabel = "In stock",
  outOfStockLabel = "Out of stock",
  className,
}: ProductStockProps) {
  return (
    <span
      className={cn(
        "text-xs font-semibold",
        inStock ? "text-success" : "text-destructive",
        className
      )}
    >
      {inStock ? inStockLabel : outOfStockLabel}
    </span>
  );
}

export { ProductStock };
