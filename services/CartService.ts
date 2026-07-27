import { ProductRepository } from "@/repositories/ProductRepository";
import type { Product } from "@/types/product";
import type { WithId } from "@/types/common";

/**
 * "cart" is not one of the OFFICIAL COLLECTIONS in the approved schema —
 * there is no CartRepository. This service only orchestrates
 * ProductRepository to validate that a product is available before a
 * cart item is added, matching the documented rule that out-of-stock
 * products cannot be purchased. Cart storage itself lives outside the
 * repository/service layers.
 */
export class CartService {
  constructor(private readonly productRepository: ProductRepository = new ProductRepository()) {}

  /** Returns the product if it can currently be added to a cart, otherwise null. */
  async validateProductAvailability(productId: string): Promise<WithId<Product> | null> {
    const product = await this.productRepository.findById(productId);
    if (!product || !product.isActive || product.isDeleted || product.stockQuantity <= 0) {
      return null;
    }
    return product;
  }
}

export const cartService = new CartService();
