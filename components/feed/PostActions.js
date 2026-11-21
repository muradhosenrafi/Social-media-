"use client";

import { useState } from "react";
import IconButton from "@/components/ui/IconButton";
import { BookmarkIcon, CommentIcon, ShareIcon, ThumbIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const reactions = [
  { id: "like", emoji: "👍", label: "Like" },
  { id: "love", emoji: "❤️", label: "Love" },
  { id: "care", emoji: "🥰", label: "Care" },
  { id: "haha", emoji: "😂", label: "Haha" },
  { id: "wow", emoji: "😮", label: "Wow" },
  { id: "sad", emoji: "😢", label: "Sad" },
  { id: "angry", emoji: "😡", label: "Angry" },
];

export default function PostActions({ post }) {
  const { t } = useLanguage();
  const [reaction, setReaction] = useState(null);
  const [saved, setSaved] = useState(false);
  const selectedReaction = reactions.find((item) => item.id === reaction);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: post.user.name, text: post.text, url: window.location.href });
      }
    } catch {}
  };

  return (
    <div className="flex items-center justify-between rounded-full bg-muted px-4 py-1 text-ink">
      <div className="group relative">
        <div className="invisible absolute bottom-full left-0 z-20 flex translate-y-2 items-center gap-1 rounded-full border border-ink/10 bg-surface px-2 py-1.5 opacity-0 shadow-xl transition duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
          {reactions.map((item) => (
            <button
              key={item.id}
              type="button"
              title={item.label}
              aria-label={item.label}
              onClick={() => setReaction(item.id)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[25px] transition hover:-translate-y-1 hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-700"
            >
              {item.emoji}
            </button>
          ))}
        </div>
        <IconButton
          label={selectedReaction?.label ?? t("post.like")}
          aria-pressed={Boolean(reaction)}
          onClick={() => setReaction((current) => (current === "like" ? null : "like"))}
        >
          {selectedReaction ? (
            <span className="text-xl" aria-hidden="true">{selectedReaction.emoji}</span>
          ) : (
            <ThumbIcon className="h-6 w-6" />
          )}
        </IconButton>
      </div>

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
