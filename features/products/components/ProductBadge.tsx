import * as React from "react";

import { Badge, type BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ProductBadgeProps {
  label: string;
  variant?: BadgeProps["variant"];
  className?: string;
}

function ProductBadge({ label, variant = "default", className }: ProductBadgeProps) {
  return (
    <Badge variant={variant} className={cn(className)}>
      {label}
    </Badge>
  );
}

export { ProductBadge };
