"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CakeIcon,
  ChevronDownIcon,
  HeartOutlineIcon,
  PencilIcon,
  PersonIcon,
  PinIcon,
} from "@/components/ui/Icons";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import EmptyState from "./EmptyState";
import { currentUser } from "@/lib/mock-data";
import { resetVerification, useVerification } from "@/lib/verification";
import { saveRegisteredProfile } from "@/lib/registered-profile";
import {
  personalInfoFallback,
  readPersonalInfo,
  savePersonalInfo,
} from "@/lib/personal-info";

const mainTabs = ["about", "reels", "photos", "friends", "clients"];
const moreTabs = ["videos", "saved"];
const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001").replace(/\/+$/, "");

function formatLocation(location) {
  if (!location) return "";

  const division = String(location.division || "").replace(/\s+division$/i, "").trim();
  const district = String(location.district || "").replace(/\s+district$/i, "").trim();
  const sameDhakaArea =
    division.toLowerCase() === "dhaka" &&
    district.toLowerCase() === "dhaka" &&
    location.thana;
  const area = sameDhakaArea
    ? `${location.thana} Thana`
    : district || location.city || "";

  return [division && `${division} Division`, area].filter(Boolean).join(", ");
}

export default function ProfileTabs({ profile }) {
  const { t } = useLanguage();
  const fallback = useMemo(() => personalInfoFallback(profile), [profile]);
  const [active, setActive] = useState("about");
  const [moreOpen, setMoreOpen] = useState(false);
  const [savedLocation, setSavedLocation] = useState(null);
  const [locationSource, setLocationSource] = useState("");
  const [personalInfo, setPersonalInfo] = useState(fallback);
  const [editingField, setEditingField] = useState("");
  const [draft, setDraft] = useState("");
  const [editError, setEditError] = useState("");
  const [savingField, setSavingField] = useState(false);
  const verification = useVerification();
  const moreRef = useRef(null);
  const isOwner = profile.username === currentUser.username;

  useEffect(() => {
    setPersonalInfo(readPersonalInfo(fallback));
    if (!isOwner) return;

    if (!localStorage.getItem("dateNexa:userId")) return;

    try {
      const location = JSON.parse(
        localStorage.getItem("dateNexa:userLocation") || "null"
      );
      setSavedLocation(formatLocation(location) || "Location unavailable");
      setLocationSource(location?.source || "");
    } catch {
      setSavedLocation("Location unavailable");
    }
  }, [fallback, isOwner]);

  const beginEdit = (field) => {
    setEditError("");
    setEditingField(field);
    if (field === "dob") {
      const day = String(personalInfo.day || "").padStart(2, "0");
      const month = String(personalInfo.month || "").padStart(2, "0");
      setDraft(personalInfo.year ? `${personalInfo.year}-${month}-${day}` : "");
    } else {
      setDraft(personalInfo[field] || "");
    }
  };

  const saveEditedField = async () => {
    let updates;

    if (editingField === "dob") {
      if (!draft) {
        setEditError(t("settings.err.dob"));
        return;
      }
      const [inputYear, inputMonth, inputDay] = draft.split("-").map(Number);
      const date = new Date(inputYear, inputMonth - 1, inputDay);
      if (
        !Number.isFinite(date.getTime()) ||
        date.getFullYear() !== inputYear ||
        date.getMonth() !== inputMonth - 1 ||
        date.getDate() !== inputDay
      ) {
        setEditError(t("settings.err.dob"));
        return;
      }
      let age = new Date().getFullYear() - date.getFullYear();
      const now = new Date();
      if (
        now.getMonth() < date.getMonth() ||
        (now.getMonth() === date.getMonth() && now.getDate() < date.getDate())
      ) age -= 1;
      if (age < 18) {
        setEditError(t("settings.err.dob"));
        return;
      }
      const [year, month, day] = draft.split("-");
      updates = { year, month: String(Number(month)), day: String(Number(day)) };
    } else if (editingField === "gender") {
      if (!["male", "female", "other"].includes(draft)) return;
      updates = { gender: draft };
    } else if (editingField === "status") {
      if (!["single", "in_relationship", "married"].includes(draft)) return;
      updates = { status: draft };
    } else {
      return;
    }

    const id = localStorage.getItem("dateNexa:userId");
    if (!isOwner || !id) {
      setEditError(t("profile.saveError"));
      return;
    }

    const next = { ...readPersonalInfo(fallback), ...personalInfo, ...updates };
    const payload = editingField === "dob"
      ? { dob: `${updates.year}-${String(updates.month).padStart(2, "0")}-${String(updates.day).padStart(2, "0")}` }
      : editingField === "status"
        ? { relationship: updates.status }
        : { gender: updates.gender };

    setSavingField(true);
    try {
      const response = await fetch(`${API_URL}/api/profile/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success) throw new Error(data.message || t("profile.saveError"));

      savePersonalInfo(next);
      saveRegisteredProfile(data.user);
      setPersonalInfo(next);
      if (verification.status === "verified" && ["dob", "gender"].includes(editingField)) resetVerification();
      setEditingField("");
      setEditError("");
    } catch (error) {
      setEditError(error.message || t("profile.saveError"));
    } finally {
      setSavingField(false);
    }
  };

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

  const dateOfBirth = personalInfo.day && personalInfo.month && personalInfo.year
    ? `${String(personalInfo.day).padStart(2, "0")}/${String(personalInfo.month).padStart(2, "0")}/${personalInfo.year}`
    : "";
  const facts = [
    { key: "location", Icon: PinIcon, text: savedLocation ?? profile.location },
    {
      key: "dob",
      Icon: CakeIcon,
      text: dateOfBirth || t("profile.notSet"),
      label: t("settings.field.dob"),
      editable: true,
    },
    {
      key: "gender",
      Icon: PersonIcon,
      text: personalInfo.gender ? t(`settings.gender.${personalInfo.gender}`) : t("profile.notSet"),
      label: t("settings.field.gender"),
      editable: true,
    },
    {
      key: "status",
      Icon: HeartOutlineIcon,
      text: personalInfo.status ? t(`profile.status.${personalInfo.status}`) : t("profile.notSet"),
      label: t("settings.field.status"),
      editable: true,
    },
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
            {facts.map(({ key, Icon, text, label, editable }) => (
              <li key={key} className="flex items-start gap-5 text-[15px] font-semibold">
                <Icon className="mt-1 h-8 w-8 shrink-0" />
                <div className="min-w-0 flex-1">
                  {editingField === key ? (
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-ink/60">{label}</label>
                      {key === "dob" ? (
                        <input
                          type="date"
                          value={draft}
                          onChange={(event) => setDraft(event.target.value)}
                          max={`${new Date().getFullYear() - 18}-12-31`}
                          className="w-full rounded-lg border border-ink/20 bg-surface px-3 py-2 text-sm"
                        />
                      ) : (
                        <select
                          value={draft}
                          onChange={(event) => setDraft(event.target.value)}
                          className="w-full rounded-lg border border-ink/20 bg-surface px-3 py-2 text-sm"
                        >
                          <option value="" disabled>
                            {t(key === "gender" ? "settings.field.genderPlaceholder" : "settings.field.status")}
                          </option>
                          {(key === "gender"
                            ? ["male", "female", "other"]
                            : ["single", "in_relationship", "married"]
                          ).map((value) => (
                            <option key={value} value={value}>
                              {t(key === "gender" ? `settings.gender.${value}` : `profile.status.${value}`)}
                            </option>
                          ))}
                        </select>
                      )}
                      {editError && <p role="alert" className="text-xs font-normal text-red-600">{editError}</p>}
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={saveEditedField}
                          disabled={savingField}
                          className="rounded-lg bg-maroon-700 px-3 py-1.5 text-xs font-semibold text-white"
                        >
                          {savingField ? t("settings.saving") : t("settings.save")}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingField("");
                            setEditError("");
                          }}
                          className="rounded-lg bg-muted px-3 py-1.5 text-xs font-semibold"
                        >
                          {t("settings.cancel")}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span>{text}</span>
                      {isOwner && editable && (
                        <button
                          type="button"
                          onClick={() => beginEdit(key)}
                          aria-label={`${t("profile.edit")} ${label}`}
                          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-maroon-700 hover:bg-maroon-50"
                        >
                          <PencilIcon className="h-3.5 w-3.5" />
                          {t("profile.edit")}
                        </button>
                      )}
                    </div>
                  )}
                </div>
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
