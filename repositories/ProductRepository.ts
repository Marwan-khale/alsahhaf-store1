import type { UpdateData } from "firebase/firestore";

import { BaseRepository } from "@/repositories/BaseRepository";
import type { Product } from "@/types/product";

/** COLLECTION: products — soft delete required (SOFT DELETE rule). */
export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super("products");
  }

  findByCategory(categoryId: string) {
    return this.findWhere("categoryId", "==", categoryId);
  }

  findBySubCategory(subCategoryId: string) {
    return this.findWhere("subCategoryId", "==", subCategoryId);
  }

  findActive() {
    return this.findWhere("isActive", "==", true);
  }

  findFeatured() {
    return this.findWhere("isFeatured", "==", true);
  }

  /** Marks the product as deleted instead of removing the document. */
  softDelete(id: string) {
    const data: UpdateData<Product> = { isDeleted: true, deletedAt: new Date().toISOString() };
    return this.update(id, data);
  }

  restore(id: string) {
    const data: UpdateData<Product> = { isDeleted: false, deletedAt: null };
    return this.update(id, data);
  }
}
