import * as React from "react";

import { Badge, type BadgeProps } from "@/components/ui/badge";
import { ORDER_STATUS } from "@/constants/order-status";
import type { OrderStatus } from "@/types/order";

export interface OrderStatusBadgeProps {
  status: OrderStatus;
  label?: string;
  className?: string;
}

const STATUS_VARIANT: Record<OrderStatus, BadgeProps["variant"]> = {
  [ORDER_STATUS.PENDING]: "outline",
  [ORDER_STATUS.CONFIRMED]: "secondary",
  [ORDER_STATUS.PROCESSING]: "secondary",
  [ORDER_STATUS.SHIPPED]: "default",
  [ORDER_STATUS.DELIVERED]: "success",
  [ORDER_STATUS.CANCELLED]: "destructive",
};

/** Visual mapping only — the given status decides the badge color, nothing is computed. */
function OrderStatusBadge({ status, label, className }: OrderStatusBadgeProps) {
  return (
    <Badge variant={STATUS_VARIANT[status]} className={className}>
      {label ?? status}
    </Badge>
  );
}

export { OrderStatusBadge };
