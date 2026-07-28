import * as React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

/** Chevron direction flips automatically in RTL via the rtl: variant. */
const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(({ items, className, ...props }, ref) => (
  <nav ref={ref} aria-label="Breadcrumb" className={cn("text-xs text-muted-foreground", className)} {...props}>
    <ol className="flex flex-wrap items-center gap-1.5">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span aria-current={isLast ? "page" : undefined} className={cn(isLast && "font-bold text-foreground")}>
                {item.label}
              </span>
            )}
            {!isLast && <ChevronLeft className="h-3 w-3 rtl:rotate-180" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  </nav>
));
Breadcrumb.displayName = "Breadcrumb";

export { Breadcrumb };
