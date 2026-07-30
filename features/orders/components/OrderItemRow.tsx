import * as React from "react";

import { cn } from "@/lib/utils";
import { ProductImage } from "@/features/products/components/ProductImage";
import { ProductPrice } from "@/features/products/components/ProductPrice";

export interface OrderItemRowProps {
  name: string;
  imageUrl?: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  currency: string;
  className?: string;
}

/** Pure display of a given order item snapshot — no price/total computation. */
function OrderItemRow({
  name,
  imageUrl,
  quantity,
  unitPrice,
  totalPrice,
  currency,
  className,
}: OrderItemRowProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <ProductImage src={imageUrl} alt={name} className="h-14 w-14 shrink-0 rounded-md" />
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-sm font-semibold">{name}</p>
        <p className="text-tabular text-xs text-muted-foreground">
          {quantity} × {unitPrice.toLocaleString()} {currency}
        </p>
      </div>
      <ProductPrice price={totalPrice} currency={currency} className="shrink-0" />
    </div>
  );
}

export { OrderItemRow };
