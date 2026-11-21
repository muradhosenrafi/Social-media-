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
  const [translatedDictionary, setTranslatedDictionary] = useState(null);
  const [translationError, setTranslationError] = useState(false);

  // Saved language selection wins. First-time visitors use IP language, then browser language.
  useEffect(() => {
    let active = true;
    const detectLanguage = async () => {
      let saved = null;
      try { saved = localStorage.getItem("lang"); } catch {}
      if (saved && /^[a-z]{2,3}(?:-[A-Z]{2})?$/.test(saved)) {
        if (active) setLangState(saved);
        return;
      }

      let detected = "";
      let countryCode = "";
      try {
        const response = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(5000) });
        if (response.ok) {
          const geo = await response.json();
          countryCode = String(geo.country_code ?? "").toUpperCase();
          detected = String(geo.languages ?? "").split(",")[0].split("-")[0].toLowerCase();
        }
      } catch {}

      if (!detected && typeof navigator !== "undefined") {
        detected = (navigator.languages?.[0] || navigator.language || "en").split("-")[0].toLowerCase();
      }
      if (detected === "zh") detected = countryCode === "TW" || countryCode === "HK" ? "zh-TW" : "zh-CN";
      if (detected === "iw") detected = "he";
      if (detected === "in") detected = "id";
      if (!/^[a-z]{2,3}(?:-[A-Z]{2})?$/.test(detected)) detected = "en";
      if (active) {
        setLangState(detected);
        try {
          localStorage.setItem("lang", detected);
          localStorage.setItem("lang-selected", "auto");
        } catch {}
      }
    };
    detectLanguage();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (lang === "bn" || lang === "en") {
      setTranslatedDictionary(null);
      setTranslationError(false);
      return;
    }

    let active = true;
    setTranslatedDictionary(null);
    setTranslationError(false);

    const translate = async () => {
      try {
        const cacheKey = `dateflow:dictionary:${lang}`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (active) setTranslatedDictionary(parsed);
          return;
        }

        const entries = Object.entries(dictionaries.en);
        const translated = {};
        for (let start = 0; start < entries.length; start += 100) {
          const chunk = entries.slice(start, start + 100);
          const response = await fetch("/api/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ target: lang, texts: chunk.map(([, value]) => value) }),
          });
          if (!response.ok) throw new Error("Translation service unavailable");
          const result = await response.json();
          chunk.forEach(([key], index) => { translated[key] = result.translations[index] ?? dictionaries.en[key]; });
        }
        if (active) {
          setTranslatedDictionary(translated);
          try { localStorage.setItem(cacheKey, JSON.stringify(translated)); } catch {}
        }
      } catch {
        if (active) setTranslationError(true);
      }
    };

    translate();
    return () => { active = false; };
  }, [lang]);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem("lang", next);
      localStorage.setItem("lang-selected", "manual");
    } catch {}
  }, []);

  const activeDictionary = translatedDictionary ?? dictionaries[lang] ?? dictionaries.en;
  const t = useCallback((key) => activeDictionary[key] ?? dictionaries.en[key] ?? dictionaries.bn[key] ?? key, [activeDictionary]);

  const value = useMemo(() => ({ lang, setLang, t, translationError }), [lang, setLang, t, translationError]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
