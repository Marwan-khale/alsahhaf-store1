"use client";

import { useCallback, useState } from "react";
import { signOut } from "firebase/auth";

import { auth } from "@/firebase/auth";

/**
 * Signs the current user out of Firebase Authentication.
 * The auth store clears itself via useAuthListener's onAuthStateChanged
 * callback — this hook does not touch the store directly.
 */
export function useSignOut() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signOutUser = useCallback(async (): Promise<void> => {
    setIsSubmitting(true);
    try {
      await signOut(auth);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { signOut: signOutUser, isSubmitting };
}
