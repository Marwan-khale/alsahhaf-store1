import { z } from "zod";

import { CURRENCIES } from "@/constants/currencies";
import type { User } from "@/types/user";

const CURRENCY_VALUES = Object.values(CURRENCIES) as [string, ...string[]];

// Reuses User fields from the approved schema.
// Excludes system-managed fields: uid, role, isBlocked, totalOrders,
// totalSpent, createdAt/updatedAt, lastLoginAt, emailVerified,
// wishlistCount, cartItemsCount.
export const profileUpdateSchema = z.object({
  name: z.string().min(1),
  phone: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  preferredCurrency: z.enum(CURRENCY_VALUES),
  preferredLanguage: z.literal("ar"),
}) satisfies z.ZodType<
  Pick<User, "name" | "phone" | "avatarUrl" | "preferredCurrency" | "preferredLanguage">
>;

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
