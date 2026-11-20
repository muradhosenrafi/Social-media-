"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import Avatar from "@/components/ui/Avatar";
import {
  CardIcon,
  ChevronDownIcon,
  DocIcon,
  GearIcon,
  LockIcon,
  LogoutIcon,
  MoonIcon,
  SunIcon,
} from "@/components/ui/Icons";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { currentUser } from "@/lib/mock-data";
import { useTheme } from "@/lib/useTheme";

const rowCls =
  "flex w-full items-center gap-4 rounded-xl px-3 py-2.5 text-left text-[15px] font-semibold transition hover:bg-surface/60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200";

export default function AccountMenu({ variant = "navbar" }) {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);

  const close = () => setOpen(false);
  const profileHref = `/profile/${currentUser.username}`;

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      // TODO: API call করে session শেষ করুন, যেমন:
      // await fetch("/api/auth/logout", { method: "POST" });
      await new Promise((r) => setTimeout(r, 300));
    } finally {
      setOpen(false);
      setLoggingOut(false);
      router.push("/login");
    }
  };

  const items = [
    { href: "/privacy", label: t("menu.privacy"), Icon: LockIcon, tone: "text-[#5b3df5]" },
    { href: "/billing", label: t("menu.billing"), Icon: CardIcon, tone: "text-[#5b3df5]" },
    { href: "/report-problem", label: t("menu.report"), Icon: DocIcon, tone: "text-ink" },
    { href: "/settings", label: t("menu.settings"), Icon: GearIcon, tone: "text-[#6b3fa0]" },
  ];

  const themes = [
    { key: "light", Icon: SunIcon, label: t("menu.light") },
    { key: "dark", Icon: MoonIcon, label: t("menu.dark") },
  ];

  const panelCls =
    variant === "mobile"
      ? "fixed inset-x-3 bottom-[4.5rem] z-50 sm:left-auto sm:right-3 sm:w-80"
      : "absolute right-0 top-full z-50 mt-3 w-72 max-w-[calc(100vw-2rem)]";

  return (
    <div ref={rootRef} className="relative">
      {variant === "mobile" ? (
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          className={`flex w-full flex-col items-center gap-0.5 px-1 py-2 text-[11px] font-medium ${
            open ? "text-maroon-700" : "text-ink/70"
          }`}
        >
          <Avatar size={24} tone="user" src={currentUser.avatar} name={currentUser.name} />
          <span className="max-w-full truncate">{t("nav.menu")}</span>
        </button>
      ) : (
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={t("menu.account")}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          className="relative rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200"
        >
          <Avatar size={44} tone="user" src={currentUser.avatar} name={currentUser.name} />
          <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-surface text-ink ring-1 ring-black/15">
            <ChevronDownIcon className={`h-3 w-3 transition ${open ? "rotate-180" : ""}`} />
          </span>
        </button>
      )}

      {open && (
        <div id={panelId} role="menu" aria-label={t("menu.account")} className={panelCls}>
          <div className="rounded-2xl bg-muted p-4 shadow-xl ring-1 ring-black/10">
            <Link
              href={profileHref}
              role="menuitem"
              onClick={close}
              className="flex items-center gap-3 rounded-xl bg-surface px-3 py-2.5 shadow-sm transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200"
            >
              <Avatar size={44} tone="user" src={currentUser.avatar} name={currentUser.name} />
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 font-semibold">
                  <span className="truncate">{currentUser.name}</span>
                  {currentUser.verified && <VerifiedBadge />}
                </span>
                <span className="block text-xs text-ink/60">{t("menu.viewProfile")}</span>
              </span>
            </Link>

            <div
              role="group"
              aria-label={t("menu.theme")}
              className="mx-auto mt-4 flex w-fit gap-1 rounded-full bg-surface p-1"
            >
              {themes.map(({ key, Icon, label }) => {
                const active = theme === key;
                return (
                  <button
                    key={key}
                    type="button"
                    title={label}
                    aria-label={label}
                    aria-pressed={active}
                    onClick={() => setTheme(key)}
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200 ${
                      active ? "bg-maroon-700 text-white" : "text-ink/70 hover:bg-maroon-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
            </div>

            <ul className="mt-3 space-y-0.5">
              {items.map(({ href, label, Icon, tone }) => (
                <li key={href} role="none">
                  <Link href={href} role="menuitem" onClick={close} className={rowCls}>
                    <Icon className={`h-7 w-7 shrink-0 ${tone}`} />
                    {label}
                  </Link>
                </li>
              ))}
              <li role="none">
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className={`${rowCls} disabled:opacity-60`}
                >
                  <LogoutIcon className="h-7 w-7 shrink-0 text-ink" />
                  {t("menu.logout")}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}