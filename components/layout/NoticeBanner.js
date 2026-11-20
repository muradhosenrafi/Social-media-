"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function NoticeBanner() {
  const { t } = useLanguage();
  const messages = [t("notice.1"), t("notice.2")];

  return (
    <div className="marquee overflow-hidden bg-maroon-500 text-white" role="region" aria-label="Notice">
      <div className="marquee-track py-3.5 text-sm">
        {[0, 1, 2, 3].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy > 0 ? true : undefined}>
            {messages.map((m) => (
              <span key={m} className="whitespace-nowrap px-10">
                {m}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}