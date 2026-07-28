import * as React from "react";
import Link from "next/link";
import { User as UserIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface UserMenuUser {
  name: string;
  email?: string;
  avatarUrl?: string | null;
}

export interface UserMenuItem {
  label: string;
  href?: string;
  onSelect?: () => void;
  icon?: React.ReactNode;
}

export interface UserMenuProps {
  user?: UserMenuUser | null;
  items?: UserMenuItem[];
  onSignOut?: () => void;
  signInHref?: string;
  className?: string;
}

/** Renders a sign-in link when no user is provided — no auth calls happen here. */
function UserMenu({ user, items = [], onSignOut, signInHref = "/auth/login", className }: UserMenuProps) {
  if (!user) {
    return (
      <Button asChild variant="ghost" size="icon" className={className} aria-label="Sign in">
        <Link href={signInHref}>
          <UserIcon className="h-5 w-5" />
        </Link>
      </Button>
    );
  }

  const initials = user.name.charAt(0);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
          )}
          aria-label={user.name}
        >
          <Avatar>
            {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-bold">{user.name}</span>
            {user.email && <span className="text-xs font-normal text-muted-foreground">{user.email}</span>}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item) =>
          item.href ? (
            <DropdownMenuItem key={item.label} asChild>
              <Link href={item.href}>
                {item.icon}
                {item.label}
              </Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem key={item.label} onSelect={item.onSelect}>
              {item.icon}
              {item.label}
            </DropdownMenuItem>
          )
        )}
        {onSignOut && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={onSignOut}>Sign out</DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { UserMenu };
