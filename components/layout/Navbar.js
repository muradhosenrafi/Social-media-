"use client";

import IconButton from "@/components/ui/IconButton";
import { BellIcon, MessageIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { hasUnreadNotifications } from "@/lib/mock-data";
import AccountMenu from "./AccountMenu";

export default function Navbar() {
  const { t } = useLanguage();

  return (
    <nav aria-label="Main" className="flex items-center justify-end gap-3">
      <IconButton href="/messages" label={t("nav.messages")}>
        <MessageIcon className="h-7 w-7" />
      </IconButton>

      <IconButton href="/notifications" label={t("nav.notifications")} className="relative">
        <BellIcon className="h-7 w-7" />
        {hasUnreadNotifications && (
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-maroon-700 ring-2 ring-surface" />
        )}
      </IconButton>

      <AccountMenu variant="navbar" />
    </nav>
  );
}