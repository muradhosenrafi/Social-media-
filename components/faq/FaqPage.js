"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

const benefits = [
  ["faq.why.people.title", "faq.why.people.body"],
  ["faq.why.activities.title", "faq.why.activities.body"],
  ["faq.why.planning.title", "faq.why.planning.body"],
];

const questions = Array.from({ length: 8 }, (_, index) => index + 1);

export default function FaqPage() {
  const { t } = useLanguage();

  return (
    <article className="space-y-6 pb-6">
      <header className="rounded-3xl bg-gradient-to-br from-maroon-900 to-maroon-700 p-6 text-white shadow-lg sm:p-8">
        <span className="mb-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white/90">
          {t("faq.badge")}
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{t("faq.title")}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80">{t("faq.intro")}</p>
      </header>

      <section aria-labelledby="why-dateflow" className="space-y-4">
        <div>
          <h2 id="why-dateflow" className="text-xl font-bold">{t("faq.why.title")}</h2>
          <p className="mt-1 text-sm text-ink/70">{t("faq.why.intro")}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {benefits.map(([titleKey, bodyKey], index) => (
            <section key={titleKey} className="rounded-2xl border border-ink/10 bg-surface p-5 shadow-sm">
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-maroon-100 text-sm font-bold text-maroon-700">
                0{index + 1}
              </span>
              <h3 className="font-bold">{t(titleKey)}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/70">{t(bodyKey)}</p>
            </section>
          ))}
        </div>
      </section>

      <section aria-labelledby="faq-questions" className="space-y-3">
        <h2 id="faq-questions" className="text-xl font-bold">{t("faq.questions.title")}</h2>
        {questions.map((number) => (
          <details key={number} className="group rounded-2xl border border-ink/10 bg-surface p-4 shadow-sm open:border-maroon-500/30 sm:p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200 [&::-webkit-details-marker]:hidden">
              {t(`faq.q${number}`)}
              <span aria-hidden="true" className="shrink-0 text-xl font-normal text-maroon-700 transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 border-t border-ink/10 pt-3 text-sm leading-7 text-ink/70">{t(`faq.a${number}`)}</p>
          </details>
        ))}
      </section>
    </article>
  );
}
