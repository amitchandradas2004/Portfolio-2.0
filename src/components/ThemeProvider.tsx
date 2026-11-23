"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isMounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_EVENT = "portfolio-theme-change";

function getStoredOrSystemTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;

  if (window.matchMedia?.("(prefers-color-scheme: light)").matches) {
    return "light";
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "dark";
}

function subscribeTheme(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
  const handleStorage = (e: StorageEvent) => {
    if (e.key === "theme") callback();
  };

  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener("storage", handleStorage);
  mediaQuery.addEventListener("change", callback);

  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener("storage", handleStorage);
    mediaQuery.removeEventListener("change", callback);
  };
}

const emptySubscribe = () => () => {};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const theme = useSyncExternalStore<Theme>(
    subscribeTheme,
    getStoredOrSystemTheme,
    () => "dark",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isMounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
