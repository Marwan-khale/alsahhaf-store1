"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/firebase/auth";
import { authService } from "@/services/AuthService";
import { useAuthStore } from "@/features/auth/state/authStore";

/**
 * Subscribes to Firebase Authentication state changes and keeps the auth
 * store in sync. Firestore profile lookups go through AuthService only.
 * Intended to be mounted once, by AuthProvider.
 */
export function useAuthListener(): void {
  const setSession = useAuthStore((state) => state.setSession);
  const setProfile = useAuthStore((state) => state.setProfile);
  const setAdminProfile = useAuthStore((state) => state.setAdminProfile);
  const setStatus = useAuthStore((state) => state.setStatus);

  useEffect(() => {
    setStatus("loading");

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setSession(null);
        setProfile(null);
        setAdminProfile(null);
        setStatus("unauthenticated");
        return;
      }

      setSession({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        emailVerified: firebaseUser.emailVerified,
      });

      const [profile, adminProfile] = await Promise.all([
        authService.getUserProfile(firebaseUser.uid),
        authService.getAdminProfile(firebaseUser.uid),
      ]);

      setProfile(profile);
      setAdminProfile(adminProfile);
      setStatus("authenticated");
    });

    return unsubscribe;
  }, [setSession, setProfile, setAdminProfile, setStatus]);
}
