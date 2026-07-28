/**
 * Centralized query keys for TanStack Query.
 * Hierarchical structure so invalidating a parent key invalidates all
 * of its children (e.g. queryClient.invalidateQueries({ queryKey: queryKeys.products.all })).
 */
export const queryKeys = {
  products: {
    all: ["products"] as const,
    lists: () => [...queryKeys.products.all, "list"] as const,
    details: () => [...queryKeys.products.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.products.details(), id] as const,
    byCategory: (categoryId: string) => [...queryKeys.products.all, "byCategory", categoryId] as const,
    featured: () => [...queryKeys.products.all, "featured"] as const,
  },
  categories: {
    all: ["categories"] as const,
    lists: () => [...queryKeys.categories.all, "list"] as const,
    detail: (id: string) => [...queryKeys.categories.all, "detail", id] as const,
  },
  cart: {
    all: ["cart"] as const,
    availability: (productId: string) => [...queryKeys.cart.all, "availability", productId] as const,
  },
  orders: {
    all: ["orders"] as const,
    lists: () => [...queryKeys.orders.all, "list"] as const,
    listByUser: (userId: string) => [...queryKeys.orders.lists(), "user", userId] as const,
    details: () => [...queryKeys.orders.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.orders.details(), id] as const,
  },
  profile: {
    all: ["profile"] as const,
    detail: (uid: string) => [...queryKeys.profile.all, uid] as const,
  },
} as const;
