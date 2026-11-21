"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { ChevronDownIcon, GlobeIcon } from "@/components/ui/Icons";

const languages = [
  { code: "bn", label: "বাংলা" },
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "ur", label: "اردو" },
  { code: "ar", label: "العربية" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "pt", label: "Português" },
  { code: "zh-CN", label: "简体中文" },
  { code: "id", label: "Bahasa Indonesia" },
];

export default function LanguageSwitcher() {
  const { lang, setLang, translationError, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = languages.find((l) => l.code === lang) ?? {
    code: lang,
    label: new Intl.DisplayNames([lang], { type: "language" }).of(lang) ?? lang.toUpperCase(),
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full px-2 py-1 text-sm hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <GlobeIcon className="h-6 w-6" />
        <span>{current.label}</span>
        <ChevronDownIcon className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 max-h-[min(70vh,28rem)] w-52 overflow-y-auto rounded-xl bg-surface py-1 text-ink shadow-lg ring-1 ring-ink/15"
        >
          {languages.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === lang}>
              <button
                type="button"
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left text-sm hover:bg-maroon-50 ${
                  l.code === lang ? "font-semibold text-maroon-700" : ""
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
          {translationError && (
            <li className="border-t border-ink/10 px-3 py-2 text-xs text-amber-600">
              {t("language.translationSetup")}
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
