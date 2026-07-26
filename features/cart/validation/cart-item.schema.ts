import { z } from "zod";

import type { OrderItem } from "@/types/order";

// "cart" is not one of the OFFICIAL COLLECTIONS in the approved schema.
// This schema reuses only the documented, analogous OrderItem fields
// (productId, quantity) that are relevant before checkout — no new
// field names are invented.
export const cartItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive(),
}) satisfies z.ZodType<Pick<OrderItem, "productId" | "quantity">>;

export type CartItemInput = z.infer<typeof cartItemSchema>;
