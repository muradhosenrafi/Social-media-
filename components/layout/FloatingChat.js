"use client";

import { TelegramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const supportLinks = [
  { name: "Telegram", Icon: TelegramIcon, href: "https://t.me/+8801810456068" },
  { name: "WhatsApp", Icon: WhatsAppIcon, href: "https://wa.me/8801810456068" },
];

export default function FloatingChat() {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-1 lg:bottom-5 lg:right-5">
      <span className="rounded-full bg-maroon-200 px-2.5 py-0.5 text-[11px] font-medium text-maroon-900">
        {t("chat.support")}
      </span>
      <div className="flex items-center gap-2">
        {supportLinks.map(({ name, Icon, href }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={name}
            title={name}
            className="rounded-full transition hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200"
          >
            <Icon className="h-8 w-8 rounded-full shadow-sm ring-2 ring-white" />
          </a>
        ))}
      </div>
    </div>
  );
}
