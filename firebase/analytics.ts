import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

import { firebaseApp } from "@/firebase/config";

// Analytics placeholder.
// Not initialized automatically — call initAnalytics() explicitly once
// tracking/consent requirements are approved.
// Client-side only (Analytics requires a browser environment).
let analyticsInstance: Analytics | null = null;

export async function initAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined" || analyticsInstance) {
    return analyticsInstance;
  }

  const supported = await isSupported();
  if (!supported) {
    return null;
  }

  analyticsInstance = getAnalytics(firebaseApp);
  return analyticsInstance;
}
