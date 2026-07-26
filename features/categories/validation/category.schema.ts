import { z } from "zod";

import type { Category } from "@/types/category";

// Reuses Category fields from the approved schema.
// Excludes system-managed fields: productCount, isDeleted/deletedAt,
// createdAt/updatedAt.
export const categorySchema = z.object({
  name_ar: z.string().min(1),
  name_en: z.string().min(1),
  slug: z.string().min(1),
  icon: z.string(),
  imageUrl: z.string(),
  sortOrder: z.number().int(),
  isActive: z.boolean(),
}) satisfies z.ZodType<
  Pick<Category, "name_ar" | "name_en" | "slug" | "icon" | "imageUrl" | "sortOrder" | "isActive">
>;

export type CategoryInput = z.infer<typeof categorySchema>;
