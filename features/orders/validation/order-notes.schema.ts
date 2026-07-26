import { z } from "zod";

import type { Order } from "@/types/order";

export const orderNotesSchema = z.object({
  notes: z.string(),
}) satisfies z.ZodType<Pick<Order, "notes">>;

export type OrderNotesInput = z.infer<typeof orderNotesSchema>;
