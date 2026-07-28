"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface NewsletterSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSubmit"> {
  title: string;
  description?: string;
  submitLabel?: string;
  onSubmit?: (email: string) => void;
}

const NewsletterSection = React.forwardRef<HTMLElement, NewsletterSectionProps>(
  ({ title, description, submitLabel = "Subscribe", onSubmit, className, ...props }, ref) => {
    const [email, setEmail] = React.useState("");

    return (
      <section
        ref={ref}
        className={cn("rounded-lg border border-border bg-card p-8 text-center", className)}
        {...props}
      >
        <h2 className="text-h2">{title}</h2>
        {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
        <form
          className="mx-auto mt-5 flex max-w-md flex-col gap-2.5 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit?.(email);
          }}
        >
          <Input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            aria-label="Email"
            className="flex-1"
          />
          <Button type="submit">{submitLabel}</Button>
        </form>
      </section>
    );
  }
);
NewsletterSection.displayName = "NewsletterSection";

export { NewsletterSection };
