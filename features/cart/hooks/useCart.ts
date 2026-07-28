"use client";

import { useMutation } from "@tanstack/react-query";

import { cartService } from "@/services/CartService";
import { mutationKeys } from "@/hooks/mutationKeys";

/**
 * "cart" is not a persisted Firestore collection (see CartService), so
 * there is no list/detail query here — only the on-demand availability
 * check a caller runs before adding an item to their (client-side) cart.
 */
export function useCart() {
  const validateAvailability = useMutation({
    mutationKey: mutationKeys.cart.validateAvailability,
    mutationFn: (productId: string) => cartService.validateProductAvailability(productId),
  });

  return { validateAvailability };
}
