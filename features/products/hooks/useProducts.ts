"use client";

import { useQuery } from "@tanstack/react-query";

import { productService } from "@/services/ProductService";
import { queryKeys } from "@/hooks/queryKeys";

/** Customer-facing product list: active products only. */
export function useProducts() {
  return useQuery({
    queryKey: queryKeys.products.lists(),
    queryFn: () => productService.getActive(),
  });
}
