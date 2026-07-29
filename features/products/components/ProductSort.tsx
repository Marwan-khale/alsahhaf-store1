import * as React from "react";

import { cn } from "@/lib/utils";

export interface ProductSortOption {
  label: string;
  value: string;
}

export interface ProductSortProps {
  options: ProductSortOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  className?: string;
}

/** Renders the given options and forwards selection — sorting itself happens elsewhere. */
function ProductSort({ options, value, onChange, label = "Sort by", className }: ProductSortProps) {
  return (
    <label className={cn("flex items-center gap-2 text-sm", className)}>
      <span className="text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        className="h-9 rounded-md border border-input bg-card px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export { ProductSort };
