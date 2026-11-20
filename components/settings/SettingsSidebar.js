"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckIcon, HomeIcon, IdCardIcon, ShieldCheckIcon, WalletIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { useVerification } from "@/lib/verification";

export default function SettingsSidebar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const verified = useVerification().status === "verified";

  const items = [
    { href: "/settings", label: t("settings.nav.home"), Icon: HomeIcon },
    { href: "/settings/verification", label: t("settings.nav.verification"), Icon: IdCardIcon, done: verified },
    { href: "/settings/security", label: t("settings.nav.security"), Icon: ShieldCheckIcon },
    { href: "/settings/payment", label: t("settings.nav.payment"), Icon: WalletIcon },
  ];

  return (
    <aside aria-label={t("settings.title")} className="bg-muted lg:w-[240px] lg:shrink-0">
      <h2 className="px-5 pt-4 text-sm font-semibold lg:pb-2 lg:pt-6">{t("settings.title")}</h2>
      <nav className="flex gap-2 overflow-x-auto px-3 pb-3 pt-2 lg:flex-col lg:overflow-visible lg:pb-6">
        {items.map(({ href, label, Icon, done }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200 ${
                active ? "bg-maroon-900 text-white" : "text-ink hover:bg-surface/70"
              }`}
            >
              <Icon className="h-6 w-6 shrink-0" />
              <span className="whitespace-nowrap">{label}</span>
              {done && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <CheckIcon className="h-3 w-3" />
                  <span className="sr-only">{t("verify.status.verified")}</span>
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
