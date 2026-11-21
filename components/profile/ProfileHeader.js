"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import { ImageIcon, PencilIcon } from "@/components/ui/Icons";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function ProfileHeader({ profile, isOwner }) {
  const { t } = useLanguage();
  const [avatar, setAvatar] = useState(profile.avatar);
  const [cover, setCover] = useState(profile.cover);
  const [uploadError, setUploadError] = useState("");
  const avatarInput = useRef(null);
  const coverInput = useRef(null);

  useEffect(() => {
    try {
      setAvatar(localStorage.getItem(`dateflow:${profile.username}:avatar`) || profile.avatar);
      setCover(localStorage.getItem(`dateflow:${profile.username}:cover`) || profile.cover);
    } catch {}
  }, [profile.username, profile.avatar, profile.cover]);

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
          if (kind === "avatar") setAvatar(dataUrl);
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
          <Avatar size={96} tone="soft" src={avatar} name={profile.name} className="ring-4 ring-surface" />
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

        <h1 className="mt-3 flex items-center gap-1.5 text-lg font-bold">
          {profile.name}
          {profile.verified && <VerifiedBadge size={18} />}
        </h1>

        {isOwner && (
          <Link
            href="/settings"
            className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-muted px-4 py-1.5 text-sm font-semibold transition hover:bg-maroon-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200"
          >
            <PencilIcon className="h-4 w-4 text-maroon-700" />
            {t("profile.edit")}
          </Link>
        )}
      </div>
    </header>
  );
}
