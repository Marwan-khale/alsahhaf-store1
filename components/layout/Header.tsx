import * as React from "react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";
import { Navigation, type NavigationItem } from "@/components/layout/Navigation";
import { SearchBar } from "@/components/layout/SearchBar";
import { UserMenu, type UserMenuItem, type UserMenuUser } from "@/components/layout/UserMenu";
import { CartButton } from "@/components/layout/CartButton";
import { WishlistButton } from "@/components/layout/WishlistButton";
import { LanguageSwitcher, type Language } from "@/components/layout/LanguageSwitcher";

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  navigationItems?: NavigationItem[];
  cartCount?: number;
  wishlistCount?: number;
  user?: UserMenuUser | null;
  userMenuItems?: UserMenuItem[];
  onSignOut?: () => void;
  languages?: Language[];
  currentLanguage?: string;
  onLanguageChange?: (code: string) => void;
  onSearchSubmit?: (query: string) => void;
}

/** Desktop store header. All content is supplied via props — no fetching, no mock data. */
const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    {
      navigationItems = [],
      cartCount,
      wishlistCount,
      user,
      userMenuItems,
      onSignOut,
      languages,
      currentLanguage,
      onLanguageChange,
      onSearchSubmit,
      className,
      ...props
    },
    ref
  ) => (
    <header ref={ref} className={cn("sticky top-0 z-40 border-b border-border bg-background", className)} {...props}>
      <div className="mx-auto flex max-w-[1280px] items-center gap-6 px-5 py-3 md:px-8">
        <Logo />
        <div className="mx-auto hidden max-w-xl flex-1 md:block">
          <SearchBar onSubmit={onSearchSubmit} />
        </div>
        <div className="flex flex-shrink-0 items-center gap-1">
          {languages && currentLanguage && (
            <LanguageSwitcher
              languages={languages}
              currentLanguage={currentLanguage}
              onChange={onLanguageChange}
            />
          )}
          <WishlistButton count={wishlistCount} />
          <CartButton count={cartCount} />
          <UserMenu user={user} items={userMenuItems} onSignOut={onSignOut} />
        </div>
      </div>
      {navigationItems.length > 0 && (
        <div className="hidden border-t border-border md:block">
          <div className="mx-auto max-w-[1280px] px-5 py-2.5 md:px-8">
            <Navigation items={navigationItems} />
          </div>
        </div>
      )}
    </header>
  )
);
Header.displayName = "Header";

export { Header };
