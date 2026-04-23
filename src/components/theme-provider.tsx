"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  // Use useEffect to ensure the component is mounted on the client
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // On the server or during the first client-side render (hydration), 
  // we render the NextThemesProvider which will handle the script injection correctly for SSR.
  // The 'mounted' check here helps avoid the React 19 script warning during subsequent client-side updates.
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}
