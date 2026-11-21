"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const SearchIcon = (p) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </svg>
);

export default function SearchBar({ autoFocus = false, onDone, className = "" }) {
  const { t } = useLanguage();
  const router = useRouter();
  const id = useId();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = query.trim();
    if (!value) return;
    router.push(`/search?q=${encodeURIComponent(value)}`);
    onDone?.();
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={`flex h-11 items-center gap-2 rounded-full bg-muted px-4 text-ink/60 transition focus-within:ring-4 focus-within:ring-maroon-200 ${className}`}
    >
      <label htmlFor={id} className="sr-only">
        {t("search.label")}
      </label>
      <SearchIcon />
      <input
        id={id}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus={autoFocus}
        autoComplete="off"
        placeholder={t("search.placeholder")}
        className="min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink/50"
      />
    </form>
  );
}