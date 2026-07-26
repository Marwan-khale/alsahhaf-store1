// Matches DATABASE SCHEMA → COLLECTION: categories

import type { AuditFields, SoftDeleteFields } from "@/types/common";

export interface Category extends AuditFields, SoftDeleteFields {
  name_ar: string;
  name_en: string;
  slug: string;
  icon: string;
  imageUrl: string;
  sortOrder: number;
  isActive: boolean;
  productCount: number;
}

// Subcollection: categories/{categoryId}/subcategories/{subCategoryId}
export interface SubCategory extends AuditFields {
  name_ar: string;
  name_en: string;
  slug: string;
  sortOrder: number;
  isActive: boolean;
}
