"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import type { NavigationItem } from "@/components/layout/Navigation";

export interface MobileNavigationProps {
  items: NavigationItem[];
  trigger?: React.ReactNode;
  title?: string;
  className?: string;
}

/** Drawer navigation for mobile. Opens from the reading-start side (RTL-aware). */
function MobileNavigation({ items, trigger, title = "Menu", className }: MobileNavigationProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger ?? (
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="start" className={cn("w-4/5 sm:max-w-xs", className)}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile" className="mt-4">
          <ul className="flex flex-col gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <SheetClose asChild>
                  <Link
                    href={item.href}
                    className="block rounded-md px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-accent"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export { MobileNavigation };
