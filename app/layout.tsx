import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Cairo } from "next/font/google";

import { AppProviders } from "@/providers/AppProviders";
import { StoreShell } from "@/components/layout/StoreShell";
import { siteConfig } from "@/config/siteConfig";

import "./globals.css";

const fontHeading = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
});

const fontBody = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

/**
 * Root layout.
 * RTL/Arabic shell, global providers, and the shared store chrome
 * (Header/Footer via StoreShell) — no page-specific content here.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${fontHeading.variable} ${fontBody.variable}`}>
      <body className="font-body antialiased">
        <AppProviders>
          <StoreShell>{children}</StoreShell>
        </AppProviders>
      </body>
    </html>
  );
}
