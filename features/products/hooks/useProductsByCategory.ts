"use client";

import { useQuery } from "@tanstack/react-query";

import { productService } from "@/services/ProductService";
import { queryKeys } from "@/hooks/queryKeys";

export function useProductsByCategory(categoryId: string) {
  return useQuery({
    queryKey: queryKeys.products.byCategory(categoryId),
    queryFn: () => productService.getByCategory(categoryId),
    enabled: Boolean(categoryId),
  });
}
