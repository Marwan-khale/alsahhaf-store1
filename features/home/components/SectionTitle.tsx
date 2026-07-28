import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

/** Title + optional description + optional "see all" link. Props only. */
const SectionTitle = React.forwardRef<HTMLDivElement, SectionTitleProps>(
  ({ title, description, actionLabel, actionHref, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mb-5 flex items-end justify-between gap-4", className)}
      {...props}
    >
      <div>
        <h2 className="text-h2">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actionLabel && actionHref && (
        <Link href={actionHref} className="shrink-0 text-sm font-semibold text-secondary hover:underline">
          {actionLabel}
        </Link>
      )}
    </div>
  )
);
SectionTitle.displayName = "SectionTitle";

export { SectionTitle };
