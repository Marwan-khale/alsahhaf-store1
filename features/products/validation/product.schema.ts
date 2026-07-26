import { z } from "zod";

import { CURRENCIES } from "@/constants/currencies";
import type { Product } from "@/types/product";

const CURRENCY_VALUES = Object.values(CURRENCIES) as [string, ...string[]];

// Reuses Product fields from the approved schema.
// Excludes system-managed fields: ratingAverage, ratingCount,
// searchKeywords (auto-generated), isDeleted/deletedAt (soft delete),
// createdAt/updatedAt (server timestamps).
export const productSchema = z.object({
  name_ar: z.string().min(1),
  name_en: z.string().min(1),
  slug: z.string().min(1),
  description: z.string(),
  categoryId: z.string().min(1),
  subCategoryId: z.string().min(1),
  sku: z.string().min(1),
  barcode: z.string(),
  price: z.number().nonnegative(),
  comparePrice: z.number().nonnegative(),
  currency: z.enum(CURRENCY_VALUES),
  stockQuantity: z.number().int().nonnegative(),
  images: z.array(z.string()),
  thumbnail: z.string(),
  brand: z.string(),
  tags: z.array(z.string()),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
}) satisfies z.ZodType<
  Pick<
    Product,
    | "name_ar"
    | "name_en"
    | "slug"
    | "description"
    | "categoryId"
    | "subCategoryId"
    | "sku"
    | "barcode"
    | "price"
    | "comparePrice"
    | "currency"
    | "stockQuantity"
    | "images"
    | "thumbnail"
    | "brand"
    | "tags"
    | "isFeatured"
    | "isActive"
  >
>;

export type ProductInput = z.infer<typeof productSchema>;
