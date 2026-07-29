import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ProductImage } from "@/features/products/components/ProductImage";
import { ProductPrice } from "@/features/products/components/ProductPrice";
import { ProductBadge, type ProductBadgeProps } from "@/features/products/components/ProductBadge";
import { ProductRating } from "@/features/products/components/ProductRating";
import { ProductActions } from "@/features/products/components/ProductActions";

export interface ProductCardProps {
  name: string;
  imageUrl?: string | null;
  price: number;
  comparePrice?: number;
  currency: string;
  rating?: { average: number; count?: number };
  badges?: { label: string; variant?: ProductBadgeProps["variant"] }[];
  /** No route pattern is assumed — pass the destination URL, or omit to render without a link. */
  href?: string;
  onAddToCart?: () => void;
  onToggleWishlist?: () => void;
  isWishlisted?: boolean;
  disabled?: boolean;
  className?: string;
}

function ProductCard({
  name,
  imageUrl,
  price,
  comparePrice,
  currency,
  rating,
  badges = [],
  href,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  disabled,
  className,
}: ProductCardProps) {
  const media = (
    <div className="relative">
      <ProductImage src={imageUrl} alt={name} />
      {badges.length > 0 && (
        <div className="absolute start-2 top-2 flex flex-col gap-1">
          {badges.map((badge) => (
            <ProductBadge key={badge.label} label={badge.label} variant={badge.variant} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <Card className={cn("overflow-hidden", className)}>
      {href ? (
        <Link href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          {media}
        </Link>
      ) : (
        media
      )}
      <div className="flex flex-col gap-2 p-3">
        {href ? (
          <Link href={href} className="line-clamp-2 text-sm font-semibold hover:underline">
            {name}
          </Link>
        ) : (
          <p className="line-clamp-2 text-sm font-semibold">{name}</p>
        )}
        {rating && <ProductRating average={rating.average} count={rating.count} />}
        <ProductPrice price={price} comparePrice={comparePrice} currency={currency} />
        <ProductActions
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isWishlisted={isWishlisted}
          disabled={disabled}
        />
      </div>
    </Card>
  );
}

export { ProductCard };
