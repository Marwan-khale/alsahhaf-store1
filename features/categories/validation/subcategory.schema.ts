import { z } from "zod";

import type { SubCategory } from "@/types/category";

// Reuses SubCategory fields from the approved schema.
// Excludes system-managed fields: createdAt/updatedAt.
export const subcategorySchema = z.object({
  name_ar: z.string().min(1),
  name_en: z.string().min(1),
  slug: z.string().min(1),
  sortOrder: z.number().int(),
  isActive: z.boolean(),
}) satisfies z.ZodType<Pick<SubCategory, "name_ar" | "name_en" | "slug" | "sortOrder" | "isActive">>;

export type SubcategoryInput = z.infer<typeof subcategorySchema>;
