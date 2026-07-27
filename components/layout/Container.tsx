import * as React from "react";

import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ as: Component = "div", className, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn("mx-auto w-full max-w-[1280px] px-5 md:px-8", className)}
      {...props}
    />
  )
);
Container.displayName = "Container";

export { Container };
