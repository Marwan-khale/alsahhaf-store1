import * as React from "react";
import { PackageOpen } from "lucide-react";

import { cn } from "@/lib/utils";

export interface EmptyOrdersProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

function EmptyOrders({ title = "No orders yet", description, action, className }: EmptyOrdersProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2 py-12 text-center", className)}>
      <PackageOpen className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
      <p className="text-sm font-bold">{title}</p>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
      {action}
    </div>
  );
}

export { EmptyOrders };
