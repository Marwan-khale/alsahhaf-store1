"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export interface SearchBarProps extends Omit<React.HTMLAttributes<HTMLFormElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
}

/** Presentational search input. Submission/state handling is left to the caller. */
const SearchBar = React.forwardRef<HTMLFormElement, SearchBarProps>(
  ({ value, defaultValue, placeholder = "Search", onChange, onSubmit, className, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
    const currentValue = value ?? internalValue;

    return (
      <form
        ref={ref}
        role="search"
        className={cn("relative w-full", className)}
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit?.(currentValue);
        }}
        {...props}
      >
        <Input
          type="search"
          value={currentValue}
          onChange={(event) => {
            const next = event.target.value;
            if (value === undefined) {
              setInternalValue(next);
            }
            onChange?.(next);
          }}
          placeholder={placeholder}
          aria-label={placeholder}
          className="pe-11"
        />
        <button
          type="submit"
          aria-label="Submit search"
          className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>
    );
  }
);
SearchBar.displayName = "SearchBar";

export { SearchBar };
