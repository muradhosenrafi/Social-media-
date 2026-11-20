"use client";

import { useState } from "react";
import IconButton from "@/components/ui/IconButton";
import { BookmarkIcon, CommentIcon, ShareIcon, ThumbIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function PostActions({ post }) {
  const { t } = useLanguage();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: post.user.name, text: post.text, url: window.location.href });
      }
    } catch {}
  };

  return (
    <div className="flex items-center justify-between rounded-full bg-[#dedede] px-4 py-1">
      <IconButton label={t("post.like")} aria-pressed={liked} onClick={() => setLiked((v) => !v)}>
        <ThumbIcon filled={liked} className={`h-6 w-6 ${liked ? "text-maroon-700" : ""}`} />
      </IconButton>

      <IconButton label={t("post.comment")}>
        <CommentIcon className="h-6 w-6" />
      </IconButton>

      <IconButton label={t("post.share")} onClick={handleShare}>
        <ShareIcon className="h-6 w-6" />
      </IconButton>

      <IconButton label={t("post.save")} aria-pressed={saved} onClick={() => setSaved((v) => !v)}>
        <BookmarkIcon filled={saved} className={`h-6 w-6 ${saved ? "text-maroon-700" : ""}`} />
      </IconButton>
    </div>
  );
}