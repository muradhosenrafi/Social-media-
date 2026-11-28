"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { currentUser, profiles } from "@/lib/mock-data";
import { resetVerification, useVerification } from "@/lib/verification";
import { readPersonalInfo, savePersonalInfo } from "@/lib/personal-info";
import { saveRegisteredProfile } from "@/lib/registered-profile";
import { Field, Select, btnMain, inputCls } from "./fields";

const me = profiles[currentUser.username];
const [first0, ...rest0] = me.name.split(" ");
const [d0, m0, y0] = me.birthday.split("/");

const initial = {
  first: first0,
  last: rest0.join(" "),
  day: String(Number(d0)),
  month: String(Number(m0)),
  year: y0,
  gender: me.gender ?? "",
  status: me.relationship,
  contact: "",
};
const ROLE_KEY = "dateflow.datingRole";
const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001").replace(/\/+$/, "");
const datingRoles = ["host", "guest", "member"];

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const isBdPhone = (v) => /^(?:\+?88)?01[3-9]\d{8}$/.test(v.replace(/[\s-]/g, ""));
const validDate = (y, m, d) => {
  const dt = new Date(y, m - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
};
// নাম বা জন্ম তারিখ বদলালে আগের ভেরিফিকেশন আর খাটে না
const identityKey = (v) => `${v.first.trim()} ${v.last.trim()}|${Number(v.day)}/${Number(v.month)}/${v.year}|${v.gender}`;

export default function ProfileForm() {
  const { t, lang } = useLanguage();
  const verification = useVerification();
  const formRef = useRef(null);
  const baseline = useRef(identityKey(initial));
  const [v, setV] = useState(initial);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [note, setNote] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [datingRole, setDatingRole] = useState("member");

  useEffect(() => {
    const saved = readPersonalInfo(initial);
    let registered = null;
    try { registered = JSON.parse(localStorage.getItem("dateNexa:userProfile") || "null"); } catch {}
    const loaded = { ...saved, contact: saved.contact || registered?.email || registered?.phone || "" };
    setV(loaded);
    baseline.current = identityKey(loaded);
    try { setDatingRole(localStorage.getItem(ROLE_KEY) || "member"); } catch {}
  }, []);

  const set = (k) => (e) => {
    setV((s) => ({ ...s, [k]: e.target.value }));
    setNote("");
    setSubmitError("");
  };

  const months = useMemo(() => {
    const f = new Intl.DateTimeFormat(lang === "bn" ? "bn-BD" : "en-US", { month: "long" });
    return Array.from({ length: 12 }, (_, i) => f.format(new Date(2000, i, 1)));
  }, [lang]);

  // ১৮ বছরের কম বয়স বাদ
  const years = useMemo(() => {
    const top = new Date().getFullYear() - 18;
    return Array.from({ length: 83 }, (_, i) => String(top - i));
  }, []);

  const validate = () => {
    const e = {};
    const req = t("settings.err.required");
    if (!v.first.trim()) e.first = req;
    if (!v.last.trim()) e.last = req;
    if (!v.day || !v.month || !v.year || !validDate(Number(v.year), Number(v.month), Number(v.day))) {
      e.dob = t("settings.err.dob");
    }
    if (!v.gender) e.gender = req;
    const c = v.contact.trim();
    if (!c) e.contact = req;
    else if (!isEmail(c) && !isBdPhone(c)) e.contact = t("settings.err.contact");
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => formRef.current?.querySelector('[aria-invalid="true"]')?.focus());
      return;
    }
    setSaving(true);
    try {
      const id = localStorage.getItem("dateNexa:userId");
      if (!id) throw new Error(t("profile.saveError"));
      const dob = `${v.year}-${String(v.month).padStart(2, "0")}-${String(v.day).padStart(2, "0")}`;
      const contact = v.contact.trim();
      const payload = {
        firstName: v.first.trim(),
        lastName: v.last.trim(),
        dob,
        gender: v.gender,
        relationship: v.status,
        ...(isEmail(contact) ? { email: contact.toLowerCase() } : { phone: contact.replace(/[\s()-]/g, "") }),
      };
      const response = await fetch(`${API_URL}/api/profile/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success) throw new Error(data.message || t("profile.saveError"));

      savePersonalInfo(v);
      saveRegisteredProfile(data.user);
      try { localStorage.setItem(ROLE_KEY, datingRole); } catch {}
      const changed = identityKey(v) !== baseline.current;
      baseline.current = identityKey(v);
      if (verification.status === "verified" && changed) {
        resetVerification();
        setNote("reverify");
      } else {
        setNote("saved");
      }
      setSubmitError("");
    } catch (error) {
      setSubmitError(error.message || t("profile.saveError"));
      setNote("error");
    } finally {
      setSaving(false);
    }
  };

  const dobInvalid = errors.dob ? true : undefined;

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <Field label={t("settings.field.firstName")} error={errors.first}>
          {(p) => <input {...p} value={v.first} onChange={set("first")} autoComplete="given-name" className={inputCls} />}
        </Field>
        <Field label={t("settings.field.surname")} error={errors.last}>
          {(p) => <input {...p} value={v.last} onChange={set("last")} autoComplete="family-name" className={inputCls} />}
        </Field>
      </div>

      <fieldset aria-describedby={errors.dob ? "dob-error" : undefined}>
        <legend className="mb-1.5 text-sm font-semibold">{t("settings.field.dob")}</legend>
        <div className="grid grid-cols-3 gap-3">
          <Select aria-label={t("settings.field.day")} aria-invalid={dobInvalid} value={v.day} onChange={set("day")}>
            <option value="">{t("settings.field.day")}</option>
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1} value={String(i + 1)}>{i + 1}</option>
            ))}
          </Select>
          <Select aria-label={t("settings.field.month")} aria-invalid={dobInvalid} value={v.month} onChange={set("month")}>
            <option value="">{t("settings.field.month")}</option>
            {months.map((m, i) => (
              <option key={m} value={String(i + 1)}>{m}</option>
            ))}
          </Select>
          <Select aria-label={t("settings.field.year")} aria-invalid={dobInvalid} value={v.year} onChange={set("year")}>
            <option value="">{t("settings.field.year")}</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </Select>
        </div>
        {errors.dob && <p id="dob-error" className="mt-1.5 text-xs text-red-600">{errors.dob}</p>}
      </fieldset>

      <Field label={t("settings.field.gender")} error={errors.gender}>
        {(p) => (
          <Select {...p} value={v.gender} onChange={set("gender")}>
            <option value="">{t("settings.field.genderPlaceholder")}</option>
            {["male", "female", "other"].map((g) => (
              <option key={g} value={g}>{t(`settings.gender.${g}`)}</option>
            ))}
          </Select>
        )}
      </Field>

      <Field label={t("settings.field.status")}>
        {(p) => (
          <Select {...p} value={v.status} onChange={set("status")}>
            {["single", "in_relationship", "married"].map((s) => (
              <option key={s} value={s}>{t(`profile.status.${s}`)}</option>
            ))}
          </Select>
        )}
      </Field>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold">{t("dating.roleTitle")}</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {datingRoles.map((role) => (
            <label key={role} className={`cursor-pointer rounded-xl border p-3 transition ${datingRole === role ? "border-maroon-700 bg-maroon-50 ring-1 ring-maroon-200" : "border-ink/15 hover:bg-muted"}`}>
              <span className="flex items-center gap-2 font-semibold"><input type="radio" name="datingRole" value={role} checked={datingRole === role} onChange={() => { setDatingRole(role); try { localStorage.setItem(ROLE_KEY, role); } catch {} }} className="accent-maroon-700" />{t(`dating.role.${role}`)}</span>
              <span className="mt-2 block text-xs leading-5 text-ink/70">{t(`dating.role.${role}.desc`)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field label={t("settings.field.contact")} error={errors.contact}>
        {(p) => (
          <input
            {...p}
            value={v.contact}
            onChange={set("contact")}
            inputMode="email"
            autoComplete="username"
            placeholder={t("settings.field.contact")}
            className={inputCls}
          />
        )}
      </Field>

      <button type="submit" disabled={saving} className={`${btnMain} w-full py-3`}>
        {saving ? t("settings.saving") : t("settings.save")}
      </button>

      {submitError && <p role="alert" className="text-sm text-red-600">{submitError}</p>}

      <p role="status" aria-live="polite" className="min-h-5 text-sm">
        {note === "saved" && <span className="text-emerald-600">{t("settings.saved")}</span>}
        {note === "reverify" && <span className="text-amber-600">{t("settings.reverify")}</span>}
      </p>
    </form>
  );
}
