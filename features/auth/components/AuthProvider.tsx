"use client";

import type { ReactNode } from "react";

import { useAuthListener } from "@/features/auth/hooks/useAuthListener";

/**
 * Mounts the Firebase Authentication state listener so the auth store
 * stays in sync for the lifetime of the app. Renders children only —
 * no visual UI, no layout, no styling.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  useAuthListener();
  return <>{children}</>;
}
