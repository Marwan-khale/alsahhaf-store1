"use client";

import { useQuery } from "@tanstack/react-query";

import { categoryService } from "@/services/CategoryService";
import { queryKeys } from "@/hooks/queryKeys";

/** Customer-facing category list: active categories only. */
export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.lists(),
    queryFn: () => categoryService.getActive(),
  });
}
