import * as React from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

import { cn } from "@/lib/utils";

export interface ProductImageProps {
  src?: string | null;
  alt: string;
  className?: string;
}

/** Square image with a placeholder icon when no src is given. */
function ProductImage({ src, alt, className }: ProductImageProps) {
  return (
    <div className={cn("relative aspect-square w-full overflow-hidden bg-muted", className)}>
      {src ? (
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
          <ImageOff className="h-8 w-8" aria-hidden="true" />
          <span className="sr-only">{alt}</span>
        </div>
      )}
    </div>
  );
}

export { ProductImage };
