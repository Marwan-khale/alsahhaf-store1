import * as React from "react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export interface ProductFilterGroup {
  title: string;
  children: React.ReactNode;
}

export interface ProductFiltersProps extends React.HTMLAttributes<HTMLDivElement> {
  groups: ProductFilterGroup[];
  onClear?: () => void;
  clearLabel?: string;
}

/** Structural shell only — each group's controls and filtering logic are supplied by the caller. */
const ProductFilters = React.forwardRef<HTMLDivElement, ProductFiltersProps>(
  ({ groups, onClear, clearLabel = "Clear all", className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-md border border-border bg-card p-4", className)} {...props}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold">Filters</h3>
        {onClear && (
          <button type="button" onClick={onClear} className="text-xs font-semibold text-secondary hover:underline">
            {clearLabel}
          </button>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {groups.map((group, index) => (
          <div key={group.title}>
            {index > 0 && <Separator className="mb-4" />}
            <h4 className="mb-2.5 text-xs font-bold">{group.title}</h4>
            {group.children}
          </div>
        ))}
      </div>
    </div>
  )
);
ProductFilters.displayName = "ProductFilters";

export { ProductFilters };
