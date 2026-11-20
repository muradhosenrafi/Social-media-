"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BellIcon, HomeIcon, MessageIcon, UsersIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { friendRequestCount, hasUnreadNotifications } from "@/lib/mock-data";
import AccountMenu from "./AccountMenu";

export default function MobileNav() {
  const { t } = useLanguage();
  const pathname = usePathname();

  const items = [
    { href: "/", label: t("nav.home"), Icon: HomeIcon },
    { href: "/friends", label: t("sidebar.allFriends"), Icon: UsersIcon, badge: friendRequestCount },
    { href: "/messages", label: t("nav.messages"), Icon: MessageIcon },
    { href: "/notifications", label: t("nav.notifications"), Icon: BellIcon, dot: hasUnreadNotifications },
  ];

  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-maroon-200 bg-surface lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-xl items-stretch">
        {items.map(({ href, label, Icon, badge, dot }) => {
          const active = pathname === href;
          return (
            <li key={href} className="min-w-0 flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-0.5 px-1 py-2 text-[11px] font-medium ${
                  active ? "text-maroon-700" : "text-ink/70"
                }`}
              >
                <span className="relative">
                  <Icon className="h-6 w-6" />
                  {badge > 0 && (
                    <span className="absolute -right-2.5 -top-1.5 min-w-4 rounded-full bg-maroon-700 px-1 text-center text-[10px] leading-4 text-white">
                      {badge}
                    </span>
                  )}
                  {dot && (
                    <span className="absolute -right-0.5 top-0 h-2 w-2 rounded-full bg-maroon-700 ring-2 ring-surface" />
                  )}
                </span>
                <span className="max-w-full truncate">{label}</span>
              </Link>
            </li>
          );
        })}

        <li className="min-w-0 flex-1">
          <AccountMenu variant="mobile" />
        </li>
      </ul>
    </nav>
  );
}