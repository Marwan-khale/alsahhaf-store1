"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

/**
 * Dark-mode infrastructure only — no toggle UI is implemented yet.
 * Not wired into app/layout.tsx by this phase; a future phase can mount
 * it once a toggle is designed.
 */
function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false} {...props}>
      {children}
    </NextThemesProvider>
  );
}

export { ThemeProvider };
