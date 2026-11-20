"use client";

import { useRef } from "react";
import Avatar from "@/components/ui/Avatar";
import IconButton from "@/components/ui/IconButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function StoriesRow({ stories }) {
  const { t } = useLanguage();
  const listRef = useRef(null);

  const scroll = (dir) => listRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });

  return (
    <div className="flex items-center gap-2">
      {/* তীর শুধু বড় স্ক্রিনে; ফোনে আঙুলে সোয়াইপ করা যায় */}
      <span className="hidden sm:block">
        <IconButton label={t("stories.prev")} onClick={() => scroll(-1)}>
          <ChevronLeftIcon className="h-5 w-5" />
        </IconButton>
      </span>

      <ul
        ref={listRef}
        className="flex min-w-0 flex-1 gap-3 overflow-x-auto px-1 py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {stories.map((s) => (
          <li key={s.id} className="shrink-0">
            <button
              type="button"
              aria-label={s.name}
              className={`rounded-full ring-2 ring-offset-2 focus-visible:outline-none focus-visible:ring-4 ${
                s.seen ? "ring-transparent" : "ring-maroon-700"
              }`}
            >
              <Avatar size={52} tone="soft" src={s.avatar} name={s.name} />
            </button>
          </li>
        ))}
      </ul>

      <span className="hidden sm:block">
        <IconButton label={t("stories.next")} onClick={() => scroll(1)}>
          <ChevronRightIcon className="h-5 w-5" />
        </IconButton>
      </span>
    </div>
  );
}