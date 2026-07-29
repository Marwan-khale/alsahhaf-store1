import * as React from "react";
import { PackageSearch } from "lucide-react";

import { cn } from "@/lib/utils";

export interface EmptyProductsProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

function EmptyProducts({
  title = "No products found",
  description,
  action,
  className,
}: EmptyProductsProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2 py-16 text-center", className)}>
      <PackageSearch className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
      <p className="text-sm font-bold">{title}</p>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
      {action}
    </div>
  );
}

export { EmptyProducts };
