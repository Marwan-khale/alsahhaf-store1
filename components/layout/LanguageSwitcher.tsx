import * as React from "react";
import { Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Language {
  code: string;
  label: string;
}

export interface LanguageSwitcherProps {
  languages: Language[];
  currentLanguage: string;
  onChange?: (code: string) => void;
  className?: string;
}

/** Language list and selection handling are supplied entirely by the caller. */
function LanguageSwitcher({ languages, currentLanguage, onChange, className }: LanguageSwitcherProps) {
  const current = languages.find((language) => language.code === currentLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={className}>
          <Globe className="h-4 w-4" />
          {current?.label ?? currentLanguage}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem key={language.code} onSelect={() => onChange?.(language.code)}>
            {language.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { LanguageSwitcher };
