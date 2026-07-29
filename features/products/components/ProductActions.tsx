import * as React from "react";
import { Heart, ShoppingCart } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface ProductActionsProps {
  onAddToCart?: () => void;
  onToggleWishlist?: () => void;
  isWishlisted?: boolean;
  addToCartLabel?: string;
  disabled?: boolean;
  className?: string;
}

/** Renders buttons and forwards clicks — no cart/wishlist state or logic lives here. */
function ProductActions({
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  addToCartLabel = "Add to cart",
  disabled,
  className,
}: ProductActionsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button size="sm" className="flex-1" onClick={onAddToCart} disabled={disabled}>
        <ShoppingCart className="h-4 w-4" aria-hidden="true" />
        {addToCartLabel}
      </Button>
      {onToggleWishlist && (
        <Button
          size="icon"
          variant="outline"
          onClick={onToggleWishlist}
          aria-pressed={isWishlisted}
          aria-label="Toggle wishlist"
        >
          <Heart className={cn("h-4 w-4", isWishlisted && "fill-destructive text-destructive")} aria-hidden="true" />
        </Button>
      )}
    </div>
  );
}

export { ProductActions };
