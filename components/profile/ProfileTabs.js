"use client";

import { useEffect, useRef, useState } from "react";
import { CakeIcon, ChevronDownIcon, HeartOutlineIcon, PinIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import EmptyState from "./EmptyState";

const mainTabs = ["about", "reels", "photos", "friends", "clients"];
const moreTabs = ["videos", "saved"];

export default function ProfileTabs({ profile }) {
  const { t } = useLanguage();
  const [active, setActive] = useState("about");
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  useEffect(() => {
    if (!moreOpen) return;
    const onDown = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  const tabCls = (isActive) =>
    `whitespace-nowrap border-b-2 px-1 pb-2 pt-3 text-[15px] font-semibold transition hover:text-maroon-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200 ${
      isActive ? "border-maroon-700 text-maroon-700" : "border-transparent"
    }`;

  const facts = [
    { Icon: PinIcon, text: profile.location },
    { Icon: CakeIcon, text: profile.birthday },
    { Icon: HeartOutlineIcon, text: t(`profile.status.${profile.relationship}`) },
  ];

  return (
    <section>
      <div
        role="tablist"
        aria-label="Profile"
        className="flex flex-wrap items-center justify-center gap-x-5 border-t border-ink/60 sm:gap-x-7"
      >
        {mainTabs.map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={active === key}
            onClick={() => setActive(key)}
            className={tabCls(active === key)}
          >
            {t(`profile.${key}`)}
          </button>
        ))}

        <div ref={moreRef} className="relative">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={moreOpen}
            onClick={() => setMoreOpen((v) => !v)}
            className={`${tabCls(moreTabs.includes(active))} inline-flex items-center gap-1`}
          >
            {t("profile.more")}
            <ChevronDownIcon className={`h-4 w-4 transition ${moreOpen ? "rotate-180" : ""}`} />
          </button>

          {moreOpen && (
            <ul
              role="menu"
              className="absolute right-0 top-full z-20 mt-1 w-40 overflow-hidden rounded-xl bg-surface py-1 shadow-lg ring-1 ring-black/10"
            >
              {moreTabs.map((key) => (
                <li key={key} role="none">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setActive(key);
                      setMoreOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-maroon-50"
                  >
                    {t(`profile.${key}`)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div role="tabpanel" className="pt-6">
        {active === "about" ? (
          <ul className="space-y-6 px-2">
            {facts.map(({ Icon, text }) => (
              <li key={text} className="flex items-center gap-5 text-[15px] font-semibold">
                <Icon className="h-8 w-8 shrink-0" />
                {text}
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState messageKey="profile.empty" />
        )}
      </div>
    </section>
  );
}