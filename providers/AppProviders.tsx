"use client";

import { useState, type ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import { createQueryClient } from "@/lib/query-client";

/**
 * Root application providers.
 * Wires up cross-cutting libraries only (currently: TanStack Query).
 * Does not contain business logic, auth state, or store-specific providers —
 * those belong in their respective feature folders.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
