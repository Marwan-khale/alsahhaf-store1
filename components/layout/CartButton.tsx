import * as React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { cn } from "@/lib/utils";

export interface CartButtonProps {
  count?: number;
  href?: string;
  onClick?: () => void;
  className?: string;
}

/** Icon button with a count badge. Renders as a link when href is given, otherwise a button. */
function CartButton({ count = 0, href, onClick, className }: CartButtonProps) {
  const content = (
    <>
      <ShoppingCart className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -end-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-bold text-secondary-foreground">
          {count}
        </span>
      )}
    </>
  );

  const sharedClassName = cn(
    "relative flex h-11 w-11 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent",
    className
  );

  if (href) {
    return (
      <Link href={href} aria-label="Cart" className={sharedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label="Cart" className={sharedClassName}>
      {content}
    </button>
  );
}

export { CartButton };
