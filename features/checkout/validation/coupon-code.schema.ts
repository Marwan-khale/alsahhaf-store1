import { z } from "zod";

import type { Coupon } from "@/types/coupon";

export const couponCodeSchema = z.object({
  code: z.string().min(1),
}) satisfies z.ZodType<Pick<Coupon, "code">>;

export type CouponCodeInput = z.infer<typeof couponCodeSchema>;
