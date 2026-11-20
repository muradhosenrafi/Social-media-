"use client";

import Link from "next/link";
import { CheckIcon, IdCardIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { useVerification } from "@/lib/verification";

export default function VerificationTile() {
  const { t } = useLanguage();
  const { status } = useVerification();
  const label = { verified: t("verify.status.verified"), failed: t("verify.status.failed") }[status] ?? t("verify.status.none");
  const tone = { verified: "text-emerald-600", failed: "text-red-600" }[status] ?? "text-ink/60";

  return (
    <Link
      href="/settings/verification"
      className="flex flex-col items-center gap-2 rounded-2xl bg-muted px-6 py-7 text-center transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200"
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-full ${
          status === "verified" ? "bg-emerald-600 text-white" : "bg-surface text-maroon-700"
        }`}
      >
        {status === "verified" ? <CheckIcon className="h-6 w-6" /> : <IdCardIcon className="h-6 w-6" />}
      </span>
      <span className="text-sm font-semibold">{t("verify.tile")}</span>
      <span className={`text-xs font-medium ${tone}`}>{label}</span>
    </Link>
  );
}
