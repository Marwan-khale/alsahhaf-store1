import { ProductRepository } from "@/repositories/ProductRepository";
import type { Product } from "@/types/product";
import type { WithId } from "@/types/common";

/**
 * Orchestrates ProductRepository only.
 * Per PRODUCTS security section: "Hard Delete is prohibited" — no hard
 * delete method is exposed. Stock/price/discount decisions remain
 * server-authoritative and are never computed here.
 */
export class ProductService {
  constructor(private readonly productRepository: ProductRepository = new ProductRepository()) {}

  getById(id: string): Promise<WithId<Product> | null> {
    return this.productRepository.findById(id);
  }

  getAll(): Promise<WithId<Product>[]> {
    return this.productRepository.findAll();
  }

  getByCategory(categoryId: string): Promise<WithId<Product>[]> {
    return this.productRepository.findByCategory(categoryId);
  }

  getBySubCategory(subCategoryId: string): Promise<WithId<Product>[]> {
    return this.productRepository.findBySubCategory(subCategoryId);
  }

  getActive(): Promise<WithId<Product>[]> {
    return this.productRepository.findActive();
  }

  getFeatured(): Promise<WithId<Product>[]> {
    return this.productRepository.findFeatured();
  }

  create(data: Product): Promise<string> {
    return this.productRepository.create(data);
  }

  update(id: string, data: Partial<Product>): Promise<void> {
    return this.productRepository.update(id, data);
  }

  softDelete(id: string): Promise<void> {
    return this.productRepository.softDelete(id);
  }

  restore(id: string): Promise<void> {
    return this.productRepository.restore(id);
  }

  /** Reflects the documented rule: out-of-stock products cannot be purchased. */
  async isInStock(id: string): Promise<boolean> {
    const product = await this.productRepository.findById(id);
    return product !== null && product.stockQuantity > 0;
  }
}

export const productService = new ProductService();
