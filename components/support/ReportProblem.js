"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { TelegramIcon, WhatsAppIcon } from "@/components/ui/Icons";

const supportNumber = "8801810456068";

export default function ReportProblem() {
  const { t } = useLanguage();
  const message = encodeURIComponent(t("report.prefill"));

  return (
    <article className="space-y-5 pb-6">
      <header className="rounded-3xl bg-gradient-to-br from-maroon-900 to-maroon-700 p-6 text-white shadow-lg sm:p-8">
        <span className="mb-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white/90">
          {t("report.badge")}
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{t("report.title")}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80">{t("report.intro")}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={`https://wa.me/${supportNumber}?text=${message}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-emerald-700 transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40">
            <WhatsAppIcon className="h-5 w-5" /> {t("report.whatsapp")}
          </a>
          <a href={`https://t.me/+${supportNumber}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40">
            <TelegramIcon className="h-5 w-5" /> {t("report.telegram")}
          </a>
        </div>
      </header>

      <section className="rounded-2xl border border-maroon-200/70 bg-muted/60 p-5 sm:p-6">
        <h2 className="text-base font-bold">{t("report.date.title")}</h2>
        <p className="mt-2 text-sm leading-7 text-ink/75">{t("report.date.body")}</p>
      </section>

      <section className="rounded-2xl border border-ink/10 bg-surface p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-bold">{t("report.booking.title")}</h2>
        <p className="mt-2 text-sm leading-7 text-ink/75">{t("report.booking.body")}</p>
      </section>

      <section className="rounded-2xl border border-ink/10 bg-surface p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-bold">{t("report.refund.title")}</h2>
        <p className="mt-2 text-sm leading-7 text-ink/75">{t("report.refund.body")}</p>
      </section>

      <section className="rounded-2xl border border-ink/10 bg-surface p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-bold">{t("report.include.title")}</h2>
        <p className="mt-2 text-sm leading-7 text-ink/75">{t("report.include.body")}</p>
      </section>
    </article>
  );
}
