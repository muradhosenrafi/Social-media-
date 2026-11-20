"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Avatar from "@/components/ui/Avatar";

export default function SidebarLink({ href, label, count = 0, icon = null }) {
  const active = usePathname() === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-3 rounded-xl py-1.5 pr-2 text-[15px] font-medium transition hover:text-maroon-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200 ${
        active ? "bg-maroon-50 text-maroon-700" : ""
      }`}
    >
      {icon ? (
        <span className="inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#8a7373] text-white/90">
          {icon}
        </span>
      ) : (
        <Avatar size={34} tone="user" />
      )}
      <span className="flex-1">{label}</span>
      {count > 0 && (
        <span className="rounded-full bg-maroon-700 px-2 py-0.5 text-xs font-semibold text-white">{count}</span>
      )}
    </Link>
  );
}