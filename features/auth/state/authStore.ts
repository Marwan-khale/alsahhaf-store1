import { create } from "zustand";

import type { Admin } from "@/types/admin";
import type { WithId } from "@/types/common";
import type { User } from "@/types/user";

// Minimal, serializable representation of the signed-in Firebase user.
// Deliberately not the full Firebase Auth User object, to keep the store
// simple and serializable.
export interface AuthSession {
  uid: string;
  email: string | null;
  emailVerified: boolean;
}

export type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

interface AuthState {
  session: AuthSession | null;
  profile: WithId<User> | null;
  adminProfile: WithId<Admin> | null;
  status: AuthStatus;
}

interface AuthActions {
  setSession: (session: AuthSession | null) => void;
  setProfile: (profile: WithId<User> | null) => void;
  setAdminProfile: (adminProfile: WithId<Admin> | null) => void;
  setStatus: (status: AuthStatus) => void;
  reset: () => void;
}

const initialState: AuthState = {
  session: null,
  profile: null,
  adminProfile: null,
  status: "idle",
};

/**
 * Holds authentication state only. No Firebase calls, no service calls —
 * populated exclusively by features/auth/hooks/useAuthListener.
 */
export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  ...initialState,
  setSession: (session) => set({ session }),
  setProfile: (profile) => set({ profile }),
  setAdminProfile: (adminProfile) => set({ adminProfile }),
  setStatus: (status) => set({ status }),
  reset: () => set(initialState),
}));
