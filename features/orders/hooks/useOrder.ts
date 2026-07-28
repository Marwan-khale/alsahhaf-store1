"use client";

import { useQuery } from "@tanstack/react-query";

import { orderService } from "@/services/OrderService";
import { queryKeys } from "@/hooks/queryKeys";

export function useOrder(id: string) {
  return useQuery({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => orderService.getById(id),
    enabled: Boolean(id),
  });
}
