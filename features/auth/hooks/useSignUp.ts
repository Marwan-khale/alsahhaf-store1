"use client";

import { useCallback, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/firebase/auth";
import { authService } from "@/services/AuthService";
import { CURRENCIES } from "@/constants/currencies";
import type { RegisterInput } from "@/features/auth/validation/register.schema";
import type { User } from "@/types/user";

/**
 * Creates the Firebase Authentication credential, then creates the
 * matching Firestore user profile through AuthService only.
 *
 * Default field values below (isBlocked, counters, preferences) are the
 * documented initial state for a new customer profile — not computed
 * business logic. Timestamps use a client-generated ISO string, matching
 * the existing repository convention (see docs/ARCHITECTURE_AUDIT.md,
 * which already flags this project-wide pattern as a follow-up item).
 */
export function useSignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = useCallback(async (input: RegisterInput): Promise<void> => {
    setIsSubmitting(true);
    setError(null);
    try {
      const credential = await createUserWithEmailAndPassword(auth, input.email, input.password);
      const now = new Date().toISOString();

      const newUser: User = {
        uid: credential.user.uid,
        name: input.name,
        email: input.email,
        phone: input.phone,
        role: "customer",
        isBlocked: false,
        addresses: [],
        totalOrders: 0,
        totalSpent: 0,
        lastLoginAt: now,
        emailVerified: credential.user.emailVerified,
        preferredCurrency: CURRENCIES.YER,
        preferredLanguage: "ar",
        avatarUrl: null,
        wishlistCount: 0,
        cartItemsCount: 0,
        createdAt: now,
        updatedAt: now,
      };

      await authService.createUserProfile(credential.user.uid, newUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed.");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { signUp, isSubmitting, error };
}
