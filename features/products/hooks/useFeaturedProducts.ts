"use client";

import { useQuery } from "@tanstack/react-query";

import { productService } from "@/services/ProductService";
import { queryKeys } from "@/hooks/queryKeys";

export function useFeaturedProducts() {
  return useQuery({
    queryKey: queryKeys.products.featured(),
    queryFn: () => productService.getFeatured(),
  });
}
