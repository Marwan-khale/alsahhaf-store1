import { siteConfig } from "@/config/siteConfig";

/**
 * Base SEO defaults.
 * Structural only — page-level metadata belongs to individual pages once built.
 */
export const seoConfig = {
  defaultTitle: siteConfig.name,
  titleTemplate: `%s | ${siteConfig.name}`,
  defaultDescription: siteConfig.description,
} as const;
