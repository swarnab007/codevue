"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// import type { ThemeProviderProps } from "next-themes/dist/types"

import { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
  [key: string]: any;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Render nothing on the server to avoid hydration mismatch
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
