// Matches DATABASE SCHEMA → COLLECTION: products

import type { AuditFields, Currency, SoftDeleteFields } from "@/types/common";

export interface Product extends AuditFields, SoftDeleteFields {
  name_ar: string;
  name_en: string;
  slug: string;
  description: string;
  categoryId: string;
  subCategoryId: string;
  sku: string;
  barcode: string;
  price: number;
  comparePrice: number;
  currency: Currency;
  stockQuantity: number;
  images: string[];
  thumbnail: string;
  brand: string;
  tags: string[];
  ratingAverage: number;
  ratingCount: number;
  isFeatured: boolean;
  isActive: boolean;
  searchKeywords: string[];
}
