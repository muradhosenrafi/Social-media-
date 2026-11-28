"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Avatar from "@/components/ui/Avatar";
import { ImageIcon, PencilIcon } from "@/components/ui/Icons";
import Link from "next/link";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { resetVerification, useVerification } from "@/lib/verification";
import { saveRegisteredProfile } from "@/lib/registered-profile";
import {
  personalInfoFallback,
  readPersonalInfo,
  savePersonalInfo,
} from "@/lib/personal-info";

export default function ProfileHeader({ profile, isOwner }) {
  const { t } = useLanguage();
  const verification = useVerification();
  const verified = isOwner ? verification.status === "verified" : profile.verified;
  const fallback = useMemo(() => personalInfoFallback(profile), [profile]);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [cover, setCover] = useState(profile.cover);
  const [personalInfo, setPersonalInfo] = useState(fallback);
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState({ first: fallback.first, last: fallback.last });
  const [nameError, setNameError] = useState("");
  const [uploadError, setUploadError] = useState("");
  const avatarInput = useRef(null);
  const coverInput = useRef(null);

  useEffect(() => {
    try {
      const savedProfile = JSON.parse(localStorage.getItem("dateNexa:userProfile") || "null");
      const savedAvatar = localStorage.getItem(`dateflow:${profile.username}:avatar`);
      const profileAvatar = savedProfile?.avatar || savedProfile?.profileImage || savedAvatar || profile.avatar;
      setAvatar(profileAvatar);
      if (savedProfile && !savedProfile.avatar && !savedProfile.profileImage && savedAvatar) {
        saveRegisteredProfile({ ...savedProfile, avatar: savedAvatar });
      }
      setCover(localStorage.getItem(`dateflow:${profile.username}:cover`) || profile.cover);
      const saved = readPersonalInfo(fallback);
      setPersonalInfo(saved);
      setNameDraft({ first: saved.first, last: saved.last });
    } catch {}
  }, [profile.username, profile.avatar, profile.cover, fallback]);

  const saveName = (event) => {
    event.preventDefault();
    const first = nameDraft.first.trim();
    const last = nameDraft.last.trim();
    if (!first || !last) {
      setNameError(t("profile.nameRequired"));
      return;
    }

    const next = {
      ...readPersonalInfo(fallback),
      ...personalInfo,
      first,
      last,
    };
    savePersonalInfo(next);
    if (first !== personalInfo.first || last !== personalInfo.last) resetVerification();
    setPersonalInfo(next);
    setNameDraft({ first, last });
    setNameError("");
    setEditingName(false);
  };

  const uploadImage = (kind) => (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploadError("");

    if (!file.type.startsWith("image/")) {
      setUploadError(t("profile.photoTypeError"));
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setUploadError(t("profile.photoSizeError"));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const image = new window.Image();
      image.onload = () => {
        const maxDimension = 1600;
        const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.82);

        try {
          localStorage.setItem(`dateflow:${profile.username}:${kind}`, dataUrl);
          if (kind === "avatar") {
            setAvatar(dataUrl);
            try {
              const registered = JSON.parse(localStorage.getItem("dateNexa:userProfile") || "null");
              if (registered) saveRegisteredProfile({ ...registered, avatar: dataUrl });
            } catch {}
          }
          else setCover(dataUrl);
        } catch {
          setUploadError(t("profile.photoStorageError"));
        }
      };
      image.onerror = () => setUploadError(t("profile.photoTypeError"));
      image.src = reader.result;
    };
    reader.onerror = () => setUploadError(t("profile.photoTypeError"));
    reader.readAsDataURL(file);
  };

  return (
    <header>
      <div className="relative aspect-[3/1] min-h-28 w-full overflow-hidden rounded-b-2xl bg-muted">
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} alt={t("profile.coverPhoto")} className="h-full w-full object-cover" />
        )}
        {isOwner && (
          <>
            <input ref={coverInput} type="file" accept="image/*" className="sr-only" onChange={uploadImage("cover")} />
            <button
              type="button"
              onClick={() => coverInput.current?.click()}
              className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-lg bg-surface/90 px-3 py-2 text-sm font-semibold text-ink shadow transition hover:bg-surface focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200"
            >
              <ImageIcon className="h-4 w-4" />
              {t("profile.editCover")}
            </button>
          </>
        )}
      </div>

      <div className="-mt-12 flex flex-col items-center px-4">
        <div className="relative">
          <Avatar size={96} tone="soft" src={avatar} name={[personalInfo.first, personalInfo.last].filter(Boolean).join(" ") || profile.name} className="ring-4 ring-surface" />
          {isOwner && (
            <>
              <input ref={avatarInput} type="file" accept="image/*" className="sr-only" onChange={uploadImage("avatar")} />
              <button
                type="button"
                aria-label={t("profile.editPhoto")}
                onClick={() => avatarInput.current?.click()}
                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-muted text-ink shadow ring-2 ring-surface transition hover:bg-maroon-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200"
              >
                <ImageIcon className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {uploadError && <p role="alert" className="mt-2 text-center text-sm text-red-600">{uploadError}</p>}

        {editingName && isOwner ? (
          <form onSubmit={saveName} className="mt-3 grid w-full max-w-sm gap-2 sm:grid-cols-2">
            <input
              value={nameDraft.first}
              onChange={(event) => setNameDraft((draft) => ({ ...draft, first: event.target.value }))}
              aria-label={t("settings.field.firstName")}
              placeholder={t("settings.field.firstName")}
              maxLength={30}
              className="w-full rounded-xl bg-muted px-3 py-2 text-sm outline-none ring-2 ring-transparent focus:ring-maroon-500"
            />
            <input
              value={nameDraft.last}
              onChange={(event) => setNameDraft((draft) => ({ ...draft, last: event.target.value }))}
              aria-label={t("settings.field.surname")}
              placeholder={t("settings.field.surname")}
              maxLength={30}
              className="w-full rounded-xl bg-muted px-3 py-2 text-sm outline-none ring-2 ring-transparent focus:ring-maroon-500"
            />
            {nameError && <p role="alert" className="text-sm text-red-600 sm:col-span-2">{nameError}</p>}
            <div className="flex justify-center gap-2 sm:col-span-2">
              <button type="submit" className="rounded-lg bg-maroon-700 px-3 py-1.5 text-sm font-semibold text-white">
                {t("settings.save")}
              </button>
              <button
                type="button"
                onClick={() => {
                  setNameDraft({ first: personalInfo.first, last: personalInfo.last });
                  setNameError("");
                  setEditingName(false);
                }}
                className="rounded-lg bg-muted px-3 py-1.5 text-sm font-semibold"
              >
                {t("settings.cancel")}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-3 flex items-center gap-2">
            <h1 className="flex items-center gap-1.5 text-lg font-bold">
              {[personalInfo.first, personalInfo.last].filter(Boolean).join(" ") || profile.name}
              {verified && <VerifiedBadge size={18} />}
            </h1>
            {isOwner && (
              <Link
                href="/settings/verification"
                aria-label={t("settings.field.firstName")}
                className="inline-flex items-center gap-1 rounded-lg bg-muted px-2.5 py-1 text-xs font-semibold text-maroon-700 hover:bg-maroon-100"
              >
                <PencilIcon className="h-3.5 w-3.5" />
                {t("profile.edit")}
              </Link>
            )}
          </div>
        )}
        {isOwner && !verified && (
          <Link
            href="/settings/verification"
            className="mt-2 rounded-full bg-maroon-50 px-3 py-1.5 text-xs font-semibold text-maroon-800 hover:bg-maroon-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200"
          >
            {t("profile.verifyNotice")}
          </Link>
        )}
      </div>
    </header>
  );
}
