"use client";

import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import PostActions from "./PostActions";

export default function PostCard({ post }) {
  const { lang } = useLanguage();

  return (
    <article className="space-y-3">
      <div className="flex items-start gap-4">
        <Avatar size={50} tone="soft" src={post.user.avatar} name={post.user.name} />
        <div className="min-w-0">
          <Link
            href={`/profile/${post.user.username}`}
            className="flex items-center gap-1.5 text-sm font-semibold hover:text-maroon-700"
          >
            {post.user.name}
            {post.user.verified && <VerifiedBadge />}
          </Link>
          <p className="text-sm font-semibold text-ink/80">{post.timeAgo[lang] ?? post.timeAgo.bn}</p>
          <p className="mt-3 text-[15px] leading-relaxed">{post.text}</p>
        </div>
      </div>

      {post.image && (
        <div className="overflow-hidden rounded-lg bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image} alt="" className="aspect-[2/1] w-full object-cover" />
        </div>
      )}

      <PostActions post={post} />
    </article>
  );
}
