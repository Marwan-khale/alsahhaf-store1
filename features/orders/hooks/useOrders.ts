"use client";

import { useQuery } from "@tanstack/react-query";

import { orderService } from "@/services/OrderService";
import { queryKeys } from "@/hooks/queryKeys";

export function useOrders(userId: string) {
  return useQuery({
    queryKey: queryKeys.orders.listByUser(userId),
    queryFn: () => orderService.getByUser(userId),
    enabled: Boolean(userId),
  });
}
