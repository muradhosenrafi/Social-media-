"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function ListingPostLink() {
  const { t } = useLanguage();

  return (
    <Link
      href="/create-listing"
      className="block rounded-2xl border border-maroon-200 bg-maroon-50 p-4 transition hover:border-maroon-500 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200"
    >
      <span className="text-base font-bold text-maroon-700">{t("listing.homeLink")}</span>
      <span className="mt-1 block text-sm text-ink/75">{t("listing.homeDescription")}</span>
    </Link>
  );
}
