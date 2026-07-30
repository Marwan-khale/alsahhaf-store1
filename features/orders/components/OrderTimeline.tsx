import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { ORDER_STATUS, ORDER_STATUS_FLOW } from "@/constants/order-status";
import type { OrderStatus } from "@/types/order";

export interface OrderTimelineProps {
  status: OrderStatus;
  labels?: Partial<Record<OrderStatus, string>>;
  className?: string;
}

/**
 * Displays position within the documented ORDER_STATUS_FLOW.
 * If status is "cancelled" (an exception to the normal flow, per docs),
 * the flow is shown as interrupted rather than progressed.
 */
function OrderTimeline({ status, labels, className }: OrderTimelineProps) {
  const isCancelled = status === ORDER_STATUS.CANCELLED;
  const currentIndex = ORDER_STATUS_FLOW.indexOf(status as (typeof ORDER_STATUS_FLOW)[number]);

  return (
    <ol className={cn("flex items-center", className)}>
      {ORDER_STATUS_FLOW.map((step, index) => {
        const isDone = !isCancelled && currentIndex >= index;
        const isLast = index === ORDER_STATUS_FLOW.length - 1;

        return (
          <li key={step} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold",
                  isDone ? "border-success bg-success text-white" : "border-border text-muted-foreground",
                  isCancelled && "border-destructive/40 text-destructive/60"
                )}
              >
                {isDone ? <Check className="h-3.5 w-3.5" /> : index + 1}
              </span>
              <span className="text-[11px] text-muted-foreground">{labels?.[step] ?? step}</span>
            </div>
            {!isLast && (
              <span
                className={cn("mx-1.5 h-px flex-1", isDone ? "bg-success" : "bg-border")}
                aria-hidden="true"
              />
            )}
          </li>
        );
      })}
      {isCancelled && <span className="ms-3 text-xs font-bold text-destructive">{labels?.cancelled ?? "Cancelled"}</span>}
    </ol>
  );
}

export { OrderTimeline };
