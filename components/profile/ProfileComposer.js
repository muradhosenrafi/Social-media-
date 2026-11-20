"use client";

import { useState } from "react";
import PostComposer from "@/components/feed/PostComposer";
import { ImageIcon, VideoIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const btnCls =
  "inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-[15px] font-semibold transition hover:bg-maroon-100 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-maroon-200";

export default function ProfileComposer({ user }) {
  const { t } = useLanguage();
  const [files, setFiles] = useState([]);

  const pick = (e) => setFiles(Array.from(e.target.files ?? []));

  return (
    <section className="space-y-3">
      <PostComposer user={user} />

      <div className="border-t border-ink/60 pt-3">
        <div className="flex items-center justify-around">
          <label className={btnCls}>
            <ImageIcon className="h-6 w-6" />
            {t("composer.photoVideo")}
            <input type="file" accept="image/*,video/*" multiple className="sr-only" onChange={pick} />
          </label>
          <label className={btnCls}>
            <VideoIcon className="h-6 w-6" />
            {t("composer.reel")}
            <input type="file" accept="video/*" className="sr-only" onChange={pick} />
          </label>
        </div>

        {files.length > 0 && (
          // TODO: ফাইল আপলোড API এখানে যোগ করুন
          <p className="mt-2 truncate text-center text-xs text-ink/70">{files.map((f) => f.name).join(", ")}</p>
        )}
      </div>
    </section>
  );
}
