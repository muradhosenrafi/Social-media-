"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Field, btnMain, btnSoft, inputCls } from "./fields";

export default function SecurityPanel() {
  const { t } = useLanguage();
  const [f, setF] = useState({ cur: "", next: "", conf: "" });
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");
  const [twoStep, setTwoStep] = useState(false);

  const set = (k) => (e) => {
    setF((s) => ({ ...s, [k]: e.target.value }));
    setMsg("");
  };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!f.cur) er.cur = t("settings.err.required");
    if (f.next.length < 8) er.next = t("sec.errShort");
    if (f.conf !== f.next) er.conf = t("sec.errMatch");
    setErrors(er);
    if (Object.keys(er).length) return;
    // TODO: API call করে পাসওয়ার্ড বদলান
    setF({ cur: "", next: "", conf: "" });
    setMsg(t("sec.updated"));
  };

  return (
    <div className="space-y-8">
      <form onSubmit={submit} noValidate className="space-y-4">
        <h2 className="text-lg font-bold">{t("sec.password")}</h2>
        <Field label={t("sec.current")} error={errors.cur}>
          {(p) => <input {...p} type="password" autoComplete="current-password" value={f.cur} onChange={set("cur")} className={inputCls} />}
        </Field>
        <Field label={t("sec.new")} error={errors.next}>
          {(p) => <input {...p} type="password" autoComplete="new-password" value={f.next} onChange={set("next")} className={inputCls} />}
        </Field>
        <Field label={t("sec.confirm")} error={errors.conf}>
          {(p) => <input {...p} type="password" autoComplete="new-password" value={f.conf} onChange={set("conf")} className={inputCls} />}
        </Field>
        <button type="submit" className={`${btnMain} w-full py-3`}>{t("sec.update")}</button>
        <p role="status" aria-live="polite" className="min-h-5 text-sm text-emerald-600">{msg}</p>
      </form>

      <section className="flex items-center justify-between gap-4 rounded-2xl bg-muted p-4">
        <div>
          <h2 className="text-sm font-bold">{t("sec.twoStep")}</h2>
          <p className="text-xs text-ink/70">{t("sec.twoStep.desc")}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={twoStep}
          aria-label={t("sec.twoStep")}
          onClick={() => setTwoStep((v) => !v)}
          className={`relative h-7 w-12 shrink-0 rounded-full transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200 ${
            twoStep ? "bg-maroon-700" : "bg-ink/30"
          }`}
        >
          <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${twoStep ? "left-6" : "left-1"}`} />
        </button>
      </section>

      <LogoutAll t={t} />
    </div>
  );
}

function LogoutAll({ t }) {
  const [done, setDone] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setDone(true) /* TODO: সব session বাতিল করার API */} className={btnSoft}>
        {t("sec.logoutAll")}
      </button>
      <p role="status" aria-live="polite" className="mt-2 min-h-5 text-sm text-emerald-600">
        {done ? t("sec.logoutAll.done") : ""}
      </p>
    </div>
  );
}
