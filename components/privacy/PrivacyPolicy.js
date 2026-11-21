"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

const sections = [
  ["privacy.profile.title", "privacy.profile.body"],
  ["privacy.use.title", "privacy.use.body"],
  ["privacy.visibility.title", "privacy.visibility.body"],
  ["privacy.location.title", "privacy.location.body"],
  ["privacy.messages.title", "privacy.messages.body"],
  ["privacy.safety.title", "privacy.safety.body"],
  ["privacy.control.title", "privacy.control.body"],
  ["privacy.retention.title", "privacy.retention.body"],
  ["privacy.date.title", "privacy.date.body"],
  ["privacy.cancel.title", "privacy.cancel.body"],
  ["privacy.support.title", "privacy.support.body"],
];

export default function PrivacyPolicy() {
  const { t } = useLanguage();

  return (
    <article className="space-y-5 pb-6">
      <header className="rounded-3xl bg-gradient-to-br from-maroon-900 to-maroon-700 p-6 text-white shadow-lg sm:p-8">
        <span className="mb-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white/90">
          {t("privacy.badge")}
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{t("privacy.title")}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80">{t("privacy.intro")}</p>
      </header>

      <section className="rounded-2xl border border-maroon-200/70 bg-muted/60 p-5 sm:p-6">
        <h2 className="text-base font-bold">{t("privacy.promise.title")}</h2>
        <p className="mt-2 text-sm leading-7 text-ink/75">{t("privacy.promise.body")}</p>
      </section>

      {sections.map(([titleKey, bodyKey], index) => (
        <section key={titleKey} className="rounded-2xl border border-ink/10 bg-surface p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-maroon-100 text-sm font-bold text-maroon-700">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="text-base font-bold">{t(titleKey)}</h2>
              <p className="mt-2 text-sm leading-7 text-ink/75">{t(bodyKey)}</p>
            </div>
          </div>
        </section>
      ))}

      <footer className="rounded-2xl border border-ink/10 bg-surface p-5 text-sm leading-7 text-ink/70">
        {t("privacy.footer")}
      </footer>
    </article>
  );
}
