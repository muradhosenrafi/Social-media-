"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import bn from "./bn.json";
import en from "./en.json";

const dictionaries = { bn, en };

const LanguageContext = createContext({
  lang: "bn",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("bn");

  // আগে বেছে নেওয়া ভাষা ফিরিয়ে আনা
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "bn" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem("lang", next);
    } catch {}
  }, []);

  const t = useCallback((key) => dictionaries[lang][key] ?? dictionaries.bn[key] ?? key, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);