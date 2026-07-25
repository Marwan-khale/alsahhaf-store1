/**
 * Core site configuration.
 * Structural values only — no business logic.
 */
export const siteConfig = {
  name: "مركز ومكتبة الصحاف",
  technicalName: "alsahhaf-store",
  description: "",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  defaultLocale: "ar",
  direction: "rtl",
  currency: "YER",
} as const;
