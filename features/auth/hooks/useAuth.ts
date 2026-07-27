"use client";

import { useAuthStore } from "@/features/auth/state/authStore";

/**
 * Read-only view of the current authentication state.
 * Does not trigger any Firebase or service calls itself.
 */
export function useAuth() {
  const session = useAuthStore((state) => state.session);
  const profile = useAuthStore((state) => state.profile);
  const adminProfile = useAuthStore((state) => state.adminProfile);
  const status = useAuthStore((state) => state.status);

  return {
    session,
    profile,
    adminProfile,
    status,
    isAuthenticated: status === "authenticated",
    isLoading: status === "idle" || status === "loading",
    isAdmin: adminProfile !== null,
  };
}
