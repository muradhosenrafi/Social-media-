"use client";

import PersonRow from "@/components/sidebar/PersonRow";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function SearchResults({ query, results }) {
  const { t } = useLanguage();

  if (!query) {
    return (
      <section className="space-y-5">
        <h1 className="text-2xl font-bold text-ink">{t("search.title")}</h1>
        <p className="rounded-2xl border border-ink/10 bg-surface p-6 text-sm text-ink/60">{t("search.prompt")}</p>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-bold text-ink">
        &ldquo;{query}&rdquo; {t("search.resultsFor")}
      </h1>

      {results.length > 0 ? (
        <ul className="space-y-3 rounded-2xl border border-ink/10 bg-surface p-4 shadow-sm sm:p-6">
          {results.map((person) => (
            <li key={person.username}>
              <PersonRow person={person} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-2xl border border-ink/10 bg-surface p-6 text-sm text-ink/60">{t("search.empty")}</p>
      )}
    </section>
  );
}