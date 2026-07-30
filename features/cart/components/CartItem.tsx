import * as React from "react";
import { Minus, Plus, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/features/products/components/ProductImage";
import { ProductPrice } from "@/features/products/components/ProductPrice";

export interface CartItemProps {
  name: string;
  imageUrl?: string | null;
  price: number;
  currency: string;
  quantity: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onRemove?: () => void;
  className?: string;
}

/** Displays a given line item. Quantity/remove changes are forwarded via callbacks only — no cart state here. */
function CartItem({
  name,
  imageUrl,
  price,
  currency,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
  className,
}: CartItemProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <ProductImage src={imageUrl} alt={name} className="h-16 w-16 shrink-0 rounded-md" />
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-sm font-semibold">{name}</p>
        <ProductPrice price={price} currency={currency} className="mt-1" />
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <div className="flex items-center rounded-md border border-input">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onDecrease}
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </Button>
          <span className="w-6 text-center text-sm tabular-nums">{quantity}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onIncrease}
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
        {onRemove && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
            onClick={onRemove}
            aria-label="Remove item"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

export { CartItem };
