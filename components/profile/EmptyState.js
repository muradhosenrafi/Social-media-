"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function EmptyState({ messageKey }) {
  const { t } = useLanguage();
  return (
    <p className="rounded-xl bg-muted/60 px-4 py-8 text-center text-sm text-ink/70">{t(messageKey)}</p>
  );
}