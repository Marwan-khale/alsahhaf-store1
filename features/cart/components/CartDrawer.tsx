import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  type SheetContentProps,
} from "@/components/ui/sheet";

export interface CartDrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  trigger?: React.ReactNode;
  side?: SheetContentProps["side"];
  children: React.ReactNode;
  className?: string;
}

/** Structural drawer only — item list, summary, and empty state are supplied by the caller. */
function CartDrawer({
  open,
  onOpenChange,
  title = "Cart",
  trigger,
  side = "end",
  children,
  className,
}: CartDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger}
      <SheetContent side={side} className={cn("flex w-full flex-col sm:max-w-md", className)}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex-1 overflow-y-auto">{children}</div>
      </SheetContent>
    </Sheet>
  );
}

export { CartDrawer };
