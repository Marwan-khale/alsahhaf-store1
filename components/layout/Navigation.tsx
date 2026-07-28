"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export interface NavigationItem {
  label: string;
  href: string;
}

export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  items: NavigationItem[];
}

/** Horizontal nav bar. Highlights the item matching the current path. */
const Navigation = React.forwardRef<HTMLElement, NavigationProps>(({ items, className, ...props }, ref) => {
  const pathname = usePathname();

  return (
    <nav ref={ref} aria-label="Main" className={cn("overflow-x-auto", className)} {...props}>
      <ul className="flex flex-row items-center gap-7 whitespace-nowrap">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-block border-b-2 border-transparent py-1 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground",
                  isActive && "border-secondary text-foreground"
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});
Navigation.displayName = "Navigation";

export { Navigation };
