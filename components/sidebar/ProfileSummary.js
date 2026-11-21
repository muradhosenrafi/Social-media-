import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import { CoinIcon } from "@/components/ui/Icons";
import VerifiedBadge from "@/components/ui/VerifiedBadge";

export default function ProfileSummary({ user }) {
  return (
    <div>
      <Link
        href={`/profile/${user.username}`}
        className="flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200"
      >
        <Avatar size={38} tone="user" src={user.avatar} name={user.name} />
        <span className="flex items-center gap-1.5 text-[15px] font-semibold">
          {user.name}
          {user.verified && <VerifiedBadge />}
        </span>
      </Link>

      <span className="ml-3 mt-2 inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-sm font-semibold text-ink">
        <CoinIcon className="h-5 w-5" />
        {user.balance} ৳
      </span>
    </div>
  );
}
