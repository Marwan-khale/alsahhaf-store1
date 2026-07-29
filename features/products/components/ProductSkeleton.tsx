import * as React from "react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export interface ProductSkeletonProps {
  className?: string;
}

function ProductSkeleton({ className }: ProductSkeletonProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="flex flex-col gap-2 p-3">
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-3 w-2/5" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-9 w-full" />
      </div>
    </Card>
  );
}

export { ProductSkeleton };
