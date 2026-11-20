"use client";

import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { chatContacts } from "@/lib/mock-data";

export default function FloatingChat() {
  const { t } = useLanguage();
  const [first, second] = chatContacts;

  return (
    <Link
      href="/messages"
      aria-label={t("chat.open")}
     className="fixed bottom-20 right-4 z-40 lg:bottom-5 lg:right-5 flex flex-col items-end gap-1 rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200"
    >
      <span className="rounded-full bg-maroon-200 px-2.5 py-0.5 text-[11px] font-medium text-maroon-900">
        {first.name}
      </span>
      <span className="flex -space-x-2">
        <Avatar size={34} tone="user" src={first.avatar} name={first.name} className="ring-2 ring-white" />
        <Avatar size={34} tone="soft" src={second.avatar} name={second.name} className="ring-2 ring-white" />
      </span>
    </Link>
  );
}