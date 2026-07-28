import * as React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";

export interface WishlistButtonProps {
  count?: number;
  href?: string;
  onClick?: () => void;
  className?: string;
}

/** Icon button with a count badge. Renders as a link when href is given, otherwise a button. */
function WishlistButton({ count = 0, href, onClick, className }: WishlistButtonProps) {
  const content = (
    <>
      <Heart className="h-5 w-5" />
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
      <Link href={href} aria-label="Wishlist" className={sharedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label="Wishlist" className={sharedClassName}>
      {content}
    </button>
  );
}

export { WishlistButton };
