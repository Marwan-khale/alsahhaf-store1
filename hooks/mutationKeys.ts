/**
 * Centralized mutation keys for TanStack Query.
 * Mirrors the mutating operations exposed by the Service layer, so
 * mutation state (isPending/isError) can be tracked consistently
 * wherever the same mutation is triggered from.
 */
export const mutationKeys = {
  products: {
    create: ["products", "create"] as const,
    update: ["products", "update"] as const,
    softDelete: ["products", "softDelete"] as const,
    restore: ["products", "restore"] as const,
  },
  categories: {
    create: ["categories", "create"] as const,
    update: ["categories", "update"] as const,
    softDelete: ["categories", "softDelete"] as const,
    restore: ["categories", "restore"] as const,
  },
  cart: {
    validateAvailability: ["cart", "validateAvailability"] as const,
  },
  orders: {
    updateStatus: ["orders", "updateStatus"] as const,
    cancel: ["orders", "cancel"] as const,
  },
  profile: {
    update: ["profile", "update"] as const,
  },
} as const;
