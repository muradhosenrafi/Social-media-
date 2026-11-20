"use client";

import { useState } from "react";
import { CardIcon, CoinIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { currentUser } from "@/lib/mock-data";
import { btnMain, btnSoft } from "./fields";

export default function PaymentPanel() {
  const { t } = useLanguage();
  const [linked, setLinked] = useState({});

  const methods = [
    { id: "bkash", name: "bKash", mark: "bK" },
    { id: "nagad", name: "Nagad", mark: "Ng" },
    { id: "card", name: t("pay.card"), mark: null },
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
        <h2 className="mb-3 text-lg font-bold">{t("pay.methods")}</h2>
        <ul className="space-y-2">
          {methods.map(({ id, name, mark }) => {
            const on = !!linked[id];
            return (
              <li key={id} className="flex items-center gap-3 rounded-2xl bg-muted p-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-xs font-bold text-maroon-700">
                  {mark ?? <CardIcon className="h-5 w-5" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{name}</p>
                  {on && <p className="text-xs text-emerald-600">{t("pay.linked")}</p>}
                </div>
                {/* TODO: আসল পেমেন্ট গেটওয়ে যুক্ত করুন */}
                <button type="button" onClick={() => setLinked((s) => ({ ...s, [id]: !s[id] }))} className={on ? btnSoft : btnMain}>
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
