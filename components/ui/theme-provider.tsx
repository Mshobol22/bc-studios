"use client";

import * as React from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  enableSystem?: boolean;
  forcedTheme?: Theme;
};

const ThemeContext = React.createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "dark" | "light";
} | null>(null);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "bc-studios-theme",
  enableSystem = false,
  forcedTheme,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = React.useState<"dark" | "light">("dark");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const stored = (typeof window !== "undefined" && window.localStorage.getItem(storageKey)) as Theme | null;
    if (stored) setThemeState(stored);
  }, [storageKey]);

  React.useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    const effective = forcedTheme ?? theme;
    const resolved = effective === "system" && enableSystem
      ? (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : effective === "dark"
        ? "dark"
        : "light";
    setResolvedTheme(resolved);
    root.classList.remove("light", "dark");
    root.classList.add(resolved);
  }, [theme, forcedTheme, enableSystem, mounted]);

  const setTheme = React.useCallback(
    (t: Theme) => {
      setThemeState(t);
      if (typeof window !== "undefined") window.localStorage.setItem(storageKey, t);
    },
    [storageKey]
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
