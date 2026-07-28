"use client";

import { useQuery } from "@tanstack/react-query";

import { productService } from "@/services/ProductService";
import { queryKeys } from "@/hooks/queryKeys";

export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => productService.getById(id),
    enabled: Boolean(id),
  });
}
