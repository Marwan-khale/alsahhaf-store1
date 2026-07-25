import { QueryClient } from "@tanstack/react-query";

/**
 * Base TanStack Query client factory.
 * Infrastructure wiring only — no queries or business logic defined here.
 * Feature-level query hooks belong in features/<feature>/hooks.
 */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 1,
      },
    },
  });
}
