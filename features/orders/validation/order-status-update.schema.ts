import { z } from "zod";

import { ORDER_STATUS } from "@/constants/order-status";
import type { Order } from "@/types/order";

const ORDER_STATUS_VALUES = Object.values(ORDER_STATUS) as [string, ...string[]];

// Reuses Order.status from the approved schema and ORDER_STATUS constants.
// Per v1.2 "ORDERS" security notes, status transitions are admin-controlled.
export const orderStatusUpdateSchema = z.object({
  status: z.enum(ORDER_STATUS_VALUES),
}) satisfies z.ZodType<Pick<Order, "status">>;

export type OrderStatusUpdateInput = z.infer<typeof orderStatusUpdateSchema>;
