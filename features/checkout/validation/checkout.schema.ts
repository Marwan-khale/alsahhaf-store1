import { z } from "zod";

import { ACTIVE_PAYMENT_METHODS } from "@/constants/payment-methods";
import type { Order } from "@/types/order";

const ACTIVE_PAYMENT_METHOD_VALUES = ACTIVE_PAYMENT_METHODS as unknown as [string, ...string[]];

// Reuses Order fields from the approved schema.
// paymentMethod is restricted to ACTIVE_PAYMENT_METHODS, matching the
// documented "Current Method: Manual Bank Transfer" (v1.2 PAYMENTS).
export const checkoutSchema = z.object({
  paymentMethod: z.enum(ACTIVE_PAYMENT_METHOD_VALUES),
  bankTransferReference: z.string(),
  notes: z.string(),
}) satisfies z.ZodType<Pick<Order, "paymentMethod" | "bankTransferReference" | "notes">>;

export type CheckoutInput = z.infer<typeof checkoutSchema>;
