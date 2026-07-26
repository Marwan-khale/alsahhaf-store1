import {
  initializeAppCheck,
  ReCaptchaV3Provider,
  type AppCheck,
} from "firebase/app-check";

import { firebaseApp } from "@/firebase/config";

// App Check placeholder.
// Not initialized automatically — call initAppCheck() explicitly once
// a reCAPTCHA site key and rollout plan are approved.
// Client-side only (App Check requires a browser environment).
let appCheckInstance: AppCheck | null = null;

export function initAppCheck(): AppCheck | null {
  const siteKey = process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY;

  if (typeof window === "undefined" || !siteKey || appCheckInstance) {
    return appCheckInstance;
  }

  appCheckInstance = initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaV3Provider(siteKey),
    isTokenAutoRefreshEnabled: true,
  });

  return appCheckInstance;
}
