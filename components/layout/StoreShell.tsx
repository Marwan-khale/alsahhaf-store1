"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Header } from "@/components/layout/Header";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useSignOut } from "@/features/auth/hooks/useSignOut";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { ROUTES } from "@/constants/routes";
import { siteConfig } from "@/config/siteConfig";

/**
 * Assembles the shared store chrome (Header/MobileHeader/Footer) around
 * page content, using only real data from existing hooks — no mock data.
 * Header is hidden on small screens and MobileHeader replaces it there
 * (MobileHeader already handles that on its own via its `md:hidden` class).
 */
export function StoreShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { profile, isAuthenticated } = useAuth();
  const { signOut } = useSignOut();
  const { data: categories } = useCategories();

  const navigationItems = (categories ?? []).map((category) => ({
    label: category.name_ar,
    href: `/category/${category.slug}`,
  }));

  const handleSearchSubmit = (query: string) => {
    router.push(`${ROUTES.SEARCH}?q=${encodeURIComponent(query)}`);
  };

  const userMenuItems = [
    { label: "طلباتي", href: ROUTES.ACCOUNT_ORDERS },
    { label: "الملف الشخصي", href: ROUTES.ACCOUNT_PROFILE },
  ];

  return (
    <>
      <Header
        className="hidden md:block"
        navigationItems={navigationItems}
        user={
          isAuthenticated && profile
            ? { name: profile.name, email: profile.email, avatarUrl: profile.avatarUrl }
            : null
        }
        userMenuItems={userMenuItems}
        onSignOut={isAuthenticated ? () => void signOut() : undefined}
        onSearchSubmit={handleSearchSubmit}
      />
      <MobileHeader navigationItems={navigationItems} onSearchSubmit={handleSearchSubmit} />
      <main>{children}</main>
      <Footer
        linkGroups={[
          { title: "الأقسام", links: navigationItems },
          {
            title: "روابط",
            links: [
              { label: "من نحن", href: ROUTES.ABOUT },
              { label: "الأسئلة الشائعة", href: ROUTES.FAQ },
              { label: "تواصل معنا", href: ROUTES.CONTACT },
            ],
          },
        ]}
        bottomText={`© ${new Date().getFullYear()} ${siteConfig.name}`}
      />
    </>
  );
}
