"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDownIcon, MegaphoneIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { currentUser, friendRequestCount, people } from "@/lib/mock-data";
import PersonRow from "@/components/sidebar/PersonRow";
import ProfileSummary from "@/components/sidebar/ProfileSummary";
import SidebarLink from "@/components/sidebar/SidebarLink";

export default function LeftSidebar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [more, setMore] = useState(false);

  // প্রোফাইল পেজে আলাদা সাইডবার (নাম + ব্যালেন্স + Content / Engagement)
  if (pathname.startsWith("/profile")) {
    const linkCls =
      "block rounded-lg px-1 py-1 text-sm font-medium transition hover:text-maroon-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200";
    return (
      <aside aria-label="Sidebar" className="space-y-5">
        <ProfileSummary user={currentUser} />
        <hr className="border-ink/60" />
        <nav className="space-y-2 pl-8">
          <Link href="/content" className={linkCls}>
            {t("sidebar.content")}
          </Link>
          <Link href="/engagement" className={linkCls}>
            {t("sidebar.engagement")}
          </Link>
        </nav>
      </aside>
    );
  }

  return (
    <aside aria-label="Sidebar" className="space-y-6">
      <ProfileSummary user={currentUser} />

      <nav className="space-y-2">
        <SidebarLink href="/friend-requests" label={t("sidebar.friendRequests")} count={friendRequestCount} />
        <SidebarLink href="/friends" label={t("sidebar.allFriends")} />
        {more && (
          <SidebarLink
            href="/ads"
            label={t("sidebar.ads")}
            icon={<MegaphoneIcon className="h-[18px] w-[18px]" />}
          />
        )}
      </nav>

      <button
        type="button"
        onClick={() => setMore((v) => !v)}
        aria-expanded={more}
        className="flex w-full items-center justify-center gap-2 border-b border-ink/60 pb-2 text-sm font-medium hover:text-maroon-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200"
      >
        {more ? t("sidebar.seeLess") : t("sidebar.seeMore")}
        <ChevronDownIcon className={`h-5 w-5 transition ${more ? "rotate-180" : ""}`} />
      </button>

      <ul className="space-y-4">
        {people.map((p) => (
          <li key={p.id}>
            <PersonRow person={p} />
          </li>
        ))}
      </ul>
    </aside>
  );
}