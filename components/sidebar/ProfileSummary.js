"use client";

import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import { CoinIcon } from "@/components/ui/Icons";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import { useRegisteredProfile } from "@/lib/registered-profile";
import { useVerification } from "@/lib/verification";

export default function ProfileSummary({ user }) {
  const registeredProfile = useRegisteredProfile();
  const verification = useVerification();
  const name = registeredProfile
    ? `${registeredProfile.firstName || ""} ${registeredProfile.lastName || ""}`.trim() || user.name
    : user.name;
  const avatar = registeredProfile?.avatar || registeredProfile?.profileImage || user.avatar;
  const verified = verification.status === "verified";

  return (
    <div>
      <Link
        href={`/profile/${user.username}`}
        className="flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200"
      >
        <Avatar size={38} tone="user" src={avatar} name={name} />
        <span className="flex items-center gap-1.5 text-[15px] font-semibold">
          {name}
          {verified && <VerifiedBadge />}
        </span>
      </Link>

      <span className="ml-3 mt-2 inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-sm font-semibold text-ink">
        <CoinIcon className="h-5 w-5" />
        {user.balance} ৳
      </span>
    </div>
  );
}
