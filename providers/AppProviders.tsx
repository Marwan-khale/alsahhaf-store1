"use client";

import { useState, type ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import { createQueryClient } from "@/lib/query-client";
import { AuthProvider } from "@/features/auth/components/AuthProvider";

/**
 * Root application providers.
 * Wires up cross-cutting libraries only (currently: TanStack Query and
 * the Authentication foundation). Does not contain business logic or
 * store-specific providers — those belong in their respective feature
 * folders. Zustand requires no provider (see features/auth/state).
 */
export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
