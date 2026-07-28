import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/layout/Logo";

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  description?: string;
  linkGroups?: FooterLinkGroup[];
  bottomText?: string;
}

/** All copy and links are supplied via props — no store content is hardcoded here. */
const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ description, linkGroups = [], bottomText, className, ...props }, ref) => (
    <footer ref={ref} className={cn("border-t border-border bg-night text-white", className)} {...props}>
      <div className="mx-auto max-w-[1280px] px-5 py-10 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            {description && <p className="mt-3 max-w-xs text-sm text-white/60">{description}</p>}
          </div>
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-h3 mb-3 text-sm text-white">{group.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/60 hover:text-secondary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {bottomText && (
          <>
            <Separator className="my-8 bg-white/10" />
            <p className="text-xs text-white/40">{bottomText}</p>
          </>
        )}
      </div>
    </footer>
  )
);
Footer.displayName = "Footer";

export { Footer };
