"use client";

import { useRef, useState } from "react";
import Avatar from "@/components/ui/Avatar";
import { CloseIcon, ImageIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function PostComposer({ user }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [audience, setAudience] = useState("public");
  const [collaborator, setCollaborator] = useState("");
  const fileInput = useRef(null);
  const placeholder = t("composer.placeholder");

  const close = () => {
    setOpen(false);
    setText("");
    setFile(null);
    setAudience("public");
    setCollaborator("");
    if (fileInput.current) fileInput.current.value = "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim() && !file) return;
    // TODO: API call করে পোস্ট সেভ করুন
    close();
  };

  return (
    <>
      <div className="flex items-center gap-3 rounded-2xl bg-surface p-3 shadow-sm">
        <Avatar size={44} tone="user" src={user.avatar} name={user.name} />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="h-11 min-w-0 flex-1 rounded-full border border-ink/10 bg-muted px-5 text-left text-[15px] text-ink/70 transition hover:bg-maroon-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200"
        >
          {placeholder}
        </button>
        <button
          type="button"
          aria-label={t("composer.photoVideo")}
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-emerald-600 transition hover:bg-emerald-500/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200"
        >
          <ImageIcon className="h-6 w-6" />
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-4"
          onMouseDown={(event) => event.target === event.currentTarget && close()}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-post-title"
            className="w-full max-w-xl overflow-hidden rounded-2xl bg-surface text-ink shadow-2xl"
          >
            <header className="relative border-b border-ink/10 px-6 py-4 text-center">
              <h2 id="create-post-title" className="text-lg font-bold">{t("composer.createPost")}</h2>
              <button
                type="button"
                aria-label={t("composer.close")}
                onClick={close}
                className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-muted text-ink transition hover:bg-maroon-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </header>

            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-3 px-5 pt-5">
                <Avatar size={42} tone="user" src={user.avatar} name={user.name} />
                <div className="leading-tight">
                  <p className="font-semibold">{user.name}</p>
                  <label className="mt-1 inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs text-ink/75">
                    {audience === "public" ? "🌐" : "🔒"}
                    <select
                      aria-label={t("composer.audience")}
                      value={audience}
                      onChange={(event) => setAudience(event.target.value)}
                      className="cursor-pointer bg-transparent outline-none"
                    >
                      <option value="public">{t("composer.public")}</option>
                      <option value="private">{t("composer.private")}</option>
                    </select>
                  </label>
                </div>
              </div>

              <textarea
                autoFocus
                value={text}
                onChange={(event) => setText(event.target.value)}
                maxLength={500}
                placeholder={placeholder}
                aria-label={placeholder}
                className="min-h-44 w-full resize-y bg-transparent px-5 py-5 text-lg text-ink outline-none placeholder:text-ink/50"
              />

              <div className="mx-5 mb-4">
                <label htmlFor="post-collaborator" className="mb-1 block text-sm font-semibold">
                  {t("composer.collaborator")}
                </label>
                <input
                  id="post-collaborator"
                  value={collaborator}
                  onChange={(event) => setCollaborator(event.target.value)}
                  placeholder={t("composer.collaboratorPlaceholder")}
                  className="h-10 w-full rounded-lg border border-ink/15 bg-muted px-3 text-sm text-ink outline-none placeholder:text-ink/50 focus:ring-2 focus:ring-maroon-200"
                />
              </div>

              {file && <p className="mx-5 mb-3 truncate rounded-lg bg-muted px-3 py-2 text-sm">{file.name}</p>}

              <div className="mx-5 mb-4 flex items-center justify-between rounded-xl border border-ink/15 p-3">
                <span className="text-sm font-semibold">{t("composer.addToPost")}</span>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 font-semibold text-emerald-600 transition hover:bg-emerald-500/10">
                  <ImageIcon className="h-6 w-6" />
                  <span className="hidden sm:inline">{t("composer.photoVideo")}</span>
                  <input
                    ref={fileInput}
                    type="file"
                    accept="image/*,video/*"
                    className="sr-only"
                    onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                  />
                </label>
              </div>

              <div className="px-5 pb-5">
                <button
                  type="submit"
                  disabled={!text.trim() && !file}
                  className="w-full rounded-lg bg-maroon-700 py-2.5 font-semibold text-white transition hover:bg-maroon-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t("composer.post")}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
