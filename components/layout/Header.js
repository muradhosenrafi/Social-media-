"use client";

import Image from "next/image";
import Wordmark from "@/components/ui/Wordmark";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import IconButton from "@/components/ui/IconButton";
import { ChevronLeftIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

export default function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSearch, setMobileSearch] = useState(false);

  // লোগোতে ক্লিক করলে হোমে যায়।
  // আগে থেকেই হোমে থাকলে উপরে স্ক্রল করে ফিড রিফ্রেশ করে (ফেসবুকের মতো)।
  const handleLogoClick = (e) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      router.refresh();
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-surface">
      <div className="relative mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-4 lg:px-6">
        <Link
          href="/"
          onClick={handleLogoClick}
          aria-label={t("header.home")}
          className="flex shrink-0 items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200"
        >
          <Wordmark priority className="h-8 sm:h-9" />
        </Link>

        <SearchBar className="hidden w-full max-w-sm sm:flex" />

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/dating"
            className="rounded-full bg-maroon-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-maroon-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200"
          >
            {t("nav.dating")}
          </Link>

          {/* ফোনে সার্চ আইকন */}
          <IconButton
            label={t("search.open")}
            onClick={() => setMobileSearch(true)}
            className="sm:hidden"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path d="m20 20-4.2-4.2" />
            </svg>
          </IconButton>

          {/* বড় স্ক্রিনে মেসেজ, নোটিফিকেশন, অ্যাকাউন্ট (ছোট স্ক্রিনে নিচের MobileNav-এ) */}
          <div className="hidden lg:block">
            <Navbar />
          </div>
        </div>

        {/* ফোনে সার্চ পুরো বার জুড়ে খোলে */}
        {mobileSearch && (
          <div className="absolute inset-0 z-10 flex items-center gap-2 bg-surface px-4 sm:hidden">
            <IconButton
              label={t("search.close")}
              onClick={() => setMobileSearch(false)}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </IconButton>
            <SearchBar
              autoFocus
              onDone={() => setMobileSearch(false)}
              className="flex-1"
            />
          </div>
        )}
      </div>
    </header>
  );
}
