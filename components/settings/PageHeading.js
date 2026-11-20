"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function PageHeading({ id }) {
  const { t } = useLanguage();
  return (
    <header>
      <h1 className="text-2xl font-bold tracking-tight">{t(`settings.${id}.title`)}</h1>
      <p className="mt-1 text-sm text-ink/70">{t(`settings.${id}.desc`)}</p>
    </header>
  );
}
