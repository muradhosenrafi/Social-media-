"use client";

import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import { PencilIcon } from "@/components/ui/Icons";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function ProfileHeader({ profile, isOwner }) {
  const { t } = useLanguage();

  return (
    <header>
      <div className="aspect-[3/1] min-h-28 w-full overflow-hidden rounded-b-2xl bg-muted">
        {profile.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.cover} alt="" className="h-full w-full object-cover" />
        )}
      </div>

      <div className="-mt-12 flex flex-col items-center px-4">
        <Avatar size={96} tone="soft" src={profile.avatar} name={profile.name} className="ring-4 ring-surface" />

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