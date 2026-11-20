"use client";

import { useState } from "react";
import Avatar from "@/components/ui/Avatar";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function PostComposer({ user }) {
  const { t } = useLanguage();
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    // TODO: API call করে পোস্ট সেভ করুন
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <Avatar size={46} tone="user" src={user.avatar} name={user.name} />
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={500}
        placeholder={t("composer.placeholder")}
        aria-label={t("composer.placeholder")}
        className="h-11 min-w-0 flex-1 rounded-full bg-[#dedede] px-5 text-[15px] text-ink outline-none placeholder:text-ink/50 focus:ring-4 focus:ring-maroon-200"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="rounded-full bg-maroon-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-maroon-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {t("composer.post")}
      </button>
    </form>
  );
}