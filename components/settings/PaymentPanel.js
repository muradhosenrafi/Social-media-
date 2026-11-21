"use client";

import { useState } from "react";
import Image from "next/image";
import { CardStackIcon, CoinIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { currentUser } from "@/lib/mock-data";
import { btnMain, btnSoft } from "./fields";

export default function PaymentPanel() {
  const { t } = useLanguage();
  const [linked, setLinked] = useState({});

  const methods = [
    { id: "bkash", name: "bKash", logo: "/bkash-logo.png" },
    { id: "nagad", name: "Nagad", logo: "/nagad-logo.png" },
    { id: "card", name: t("pay.card"), logo: null },
  ];

  return (
    <div className="space-y-6">
      <section className="flex items-center gap-4 rounded-2xl bg-maroon-900 p-6 text-white">
        <CoinIcon className="h-10 w-10 shrink-0" />
        <div>
          <p className="text-xs text-white/70">{t("pay.balance")}</p>
          <p className="text-3xl font-bold">{currentUser.balance} ৳</p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold">{t("pay.methods")}</h2>
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {methods.map(({ id, name, logo }) => {
            const on = !!linked[id];
            return (
              <li key={id} className={`flex min-h-52 min-w-0 flex-col items-stretch gap-3 rounded-2xl border p-4 shadow-sm transition-colors ${on ? "border-emerald-500/50 bg-emerald-500/5" : "border-ink/10 bg-surface hover:border-maroon-500/40 hover:bg-muted/60"}`}>
                <span className="flex h-16 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1" aria-hidden="true">
                  {logo ? (
                    <Image src={logo} alt={`${name} logo`} width={320} height={160} className="h-full w-full object-cover" />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center rounded-lg bg-maroon-700 text-white">
                      <CardStackIcon className="h-10 w-10" />
                    </span>
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-base font-semibold">{name}</p>
                  {on && <p className="mt-1 text-xs text-emerald-600">{t("pay.linked")}</p>}
                </div>
                {/* TODO: আসল পেমেন্ট গেটওয়ে যুক্ত করুন */}
                <button type="button" onClick={() => setLinked((s) => ({ ...s, [id]: !s[id] }))} className={`${on ? btnSoft : btnMain} mt-auto w-full justify-center`}>
                  {on ? t("pay.unlink") : t("pay.link")}
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
