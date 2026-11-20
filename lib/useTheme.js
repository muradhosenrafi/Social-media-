"use client";

import { useCallback, useEffect, useState } from "react";

export function useTheme() {
  const [theme, setThemeState] = useState("light");

  useEffect(() => {
    setThemeState(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const setTheme = useCallback((next) => {
    setThemeState(next);
    document.documentElement.dataset.theme = next === "dark" ? "dark" : "light";
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }, []);

  return { theme, setTheme };
}