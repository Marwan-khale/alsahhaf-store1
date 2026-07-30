import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { OrderStatusBadge } from "@/features/orders/components/OrderStatusBadge";
import type { OrderStatus } from "@/types/order";

export interface OrderCardProps {
  orderNumber: string;
  date: string;
  status: OrderStatus;
  statusLabel?: string;
  total: number;
  currency: string;
  itemCount?: number;
  href?: string;
  className?: string;
}

function OrderCard({
  orderNumber,
  date,
  status,
  statusLabel,
  total,
  currency,
  itemCount,
  href,
  className,
}: OrderCardProps) {
  const body = (
    <CardContent className="flex items-center justify-between gap-4 p-4">
      <div>
        <p className="text-sm font-bold">{orderNumber}</p>
        <p className="text-xs text-muted-foreground">
          {date}
          {typeof itemCount === "number" && ` · ${itemCount}`}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <OrderStatusBadge status={status} label={statusLabel} />
        <span className="text-tabular text-sm font-bold">
          {total.toLocaleString()} {currency}
        </span>
      </div>
    </CardContent>
  );

  if (href) {
    return (
      <Link href={href} className={cn("block rounded-md transition-shadow hover:shadow-brand-md", className)}>
        <Card>{body}</Card>
      </Link>
    );
  }

  return <Card className={className}>{body}</Card>;
}

export { OrderCard };
