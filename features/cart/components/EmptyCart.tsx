import * as React from "react";
import { ShoppingCart } from "lucide-react";

import { cn } from "@/lib/utils";

export interface EmptyCartProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

function EmptyCart({ title = "Your cart is empty", description, action, className }: EmptyCartProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2 py-12 text-center", className)}>
      <ShoppingCart className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
      <p className="text-sm font-bold">{title}</p>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
      {action}
    </div>
  );
}

export { EmptyCart };
