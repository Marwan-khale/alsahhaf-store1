import * as React from "react";

import { ProductGrid } from "@/features/products/components/ProductGrid";
import { ProductSkeleton } from "@/features/products/components/ProductSkeleton";

export interface LoadingProductsProps {
  count?: number;
  className?: string;
}

function LoadingProducts({ count = 8, className }: LoadingProductsProps) {
  return (
    <ProductGrid className={className} aria-busy="true" aria-label="Loading products">
      {Array.from({ length: count }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </ProductGrid>
  );
}

export { LoadingProducts };
