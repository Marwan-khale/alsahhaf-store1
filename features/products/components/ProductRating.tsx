import * as React from "react";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

export interface ProductRatingProps {
  average: number;
  count?: number;
  className?: string;
}

/** Displays a given average as filled/empty stars. Does not compute the average itself. */
function ProductRating({ average, count, className }: ProductRatingProps) {
  const rounded = Math.round(average);

  return (
    <div className={cn("flex items-center gap-1", className)} role="img" aria-label={`Rated ${average} out of 5`}>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={cn(
              "h-3.5 w-3.5",
              index < rounded ? "fill-secondary text-secondary" : "fill-none text-border"
            )}
            aria-hidden="true"
          />
        ))}
      </div>
      {typeof count === "number" && <span className="text-xs text-muted-foreground">({count})</span>}
    </div>
  );
}

export { ProductRating };
