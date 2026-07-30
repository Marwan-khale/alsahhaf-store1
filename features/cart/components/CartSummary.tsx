import * as React from "react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export interface CartSummaryRow {
  label: string;
  amount: number;
}

export interface CartSummaryProps {
  currency: string;
  rows: CartSummaryRow[];
  total: number;
  totalLabel?: string;
  checkoutLabel?: string;
  onCheckout?: () => void;
  checkoutDisabled?: boolean;
  className?: string;
}

/** Pure display of given amounts — subtotal/discount/shipping/total are computed server-side, not here. */
function CartSummary({
  currency,
  rows,
  total,
  totalLabel = "Total",
  checkoutLabel = "Checkout",
  onCheckout,
  checkoutDisabled,
  className,
}: CartSummaryProps) {
  return (
    <div className={cn("flex flex-col gap-2 text-sm", className)}>
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between text-muted-foreground">
          <span>{row.label}</span>
          <span className="text-tabular">
            {row.amount.toLocaleString()} {currency}
          </span>
        </div>
      ))}
      <Separator className="my-1" />
      <div className="flex items-center justify-between text-base font-bold">
        <span>{totalLabel}</span>
        <span className="text-tabular">
          {total.toLocaleString()} {currency}
        </span>
      </div>
      {onCheckout && (
        <Button className="mt-2 w-full" onClick={onCheckout} disabled={checkoutDisabled}>
          {checkoutLabel}
        </Button>
      )}
    </div>
  );
}

export { CartSummary };
