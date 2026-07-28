import * as React from "react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import type { NavigationItem } from "@/components/layout/Navigation";
import { CartButton } from "@/components/layout/CartButton";
import { SearchBar } from "@/components/layout/SearchBar";

export interface MobileHeaderProps extends React.HTMLAttributes<HTMLElement> {
  navigationItems?: NavigationItem[];
  cartCount?: number;
  onSearchSubmit?: (query: string) => void;
}

/** Compact header for small screens. All content is supplied via props. */
const MobileHeader = React.forwardRef<HTMLElement, MobileHeaderProps>(
  ({ navigationItems = [], cartCount, onSearchSubmit, className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn("sticky top-0 z-40 border-b border-border bg-background md:hidden", className)}
      {...props}
    >
      <div className="flex items-center gap-2 px-4 py-2.5">
        <MobileNavigation items={navigationItems} />
        <div className="flex-1">
          <Logo withText={false} />
        </div>
        <CartButton count={cartCount} />
      </div>
      <div className="px-4 pb-2.5">
        <SearchBar onSubmit={onSearchSubmit} />
      </div>
    </header>
  )
);
MobileHeader.displayName = "MobileHeader";

export { MobileHeader };
