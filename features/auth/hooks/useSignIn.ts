"use client";

import { useCallback, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/firebase/auth";
import type { LoginInput } from "@/features/auth/validation/login.schema";

/**
 * Performs Firebase Authentication sign-in only.
 * Resulting session/profile state is populated separately by
 * useAuthListener via onAuthStateChanged — this hook does not touch the
 * auth store or AuthService directly.
 */
export function useSignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(async (input: LoginInput): Promise<void> => {
    setIsSubmitting(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, input.email, input.password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { signIn, isSubmitting, error };
}
