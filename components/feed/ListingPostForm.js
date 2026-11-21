"use client";

import { useEffect, useRef, useState } from "react";
import { ImageIcon, VideoIcon, CloseIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const categories = ["dating", "carShow", "fitness"];

export default function ListingPostForm() {
  const { t } = useLanguage();
  const [category, setCategory] = useState("dating");
  const [audience, setAudience] = useState("public");
  const [submitted, setSubmitted] = useState(false);
  const [media, setMedia] = useState([]);
  const mediaRef = useRef(media);

  useEffect(() => {
    const retainedUrls = new Set(media.map((item) => item.url));
    mediaRef.current.forEach((item) => {
      if (!retainedUrls.has(item.url)) URL.revokeObjectURL(item.url);
    });
    mediaRef.current = media;
  }, [media]);

  useEffect(() => () => mediaRef.current.forEach((item) => URL.revokeObjectURL(item.url)), []);

  const chooseMedia = (event) => {
    const selected = Array.from(event.target.files ?? []).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setMedia((current) => [...current, ...selected]);
    setSubmitted(false);
    event.target.value = "";
  };

  const removeMedia = (url) => setMedia((current) => current.filter((item) => item.url !== url));

  const submit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    // TODO: API call করে structured post সেভ করুন
  };

  const fieldClass = "mt-1 w-full rounded-xl border border-ink/15 bg-muted px-4 py-3 text-ink outline-none placeholder:text-ink/50 focus:ring-2 focus:ring-maroon-200";

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-6">
      <div className="mb-5">
        <h1 className="text-2xl font-bold">{t("listing.title")}</h1>
        <p className="mt-1 text-sm text-ink/70">{t("listing.description")}</p>
      </div>

      {submitted && (
        <p role="status" className="mb-4 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-700">
          {t("listing.savedDraft")}
        </p>
      )}

      <form onSubmit={submit} className="space-y-5 rounded-2xl bg-surface p-5 shadow-sm sm:p-6">
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">{t("listing.category")}</legend>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {categories.map((item) => (
              <label key={item} className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition ${category === item ? "border-maroon-700 bg-maroon-50 text-maroon-700" : "border-ink/15 hover:bg-muted"}`}>
                <input
                  type="radio"
                  name="category"
                  value={item}
                  checked={category === item}
                  onChange={() => setCategory(item)}
                  className="accent-maroon-700"
                />
                {t(`listing.category.${item}`)}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="block text-sm font-semibold">
          {t("listing.headline")}
          <input required maxLength={100} className={fieldClass} placeholder={t("listing.headlinePlaceholder")} />
        </label>

        <label className="block text-sm font-semibold">
          {t("listing.details")}
          <textarea required maxLength={1500} rows={5} className={fieldClass} placeholder={t("listing.detailsPlaceholder")} />
        </label>

        <div>
          <p className="mb-2 text-sm font-semibold">{t("composer.addToPost")}</p>
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-ink/25 bg-muted px-4 py-5 text-sm font-semibold text-emerald-700 transition hover:border-emerald-600 hover:bg-emerald-500/10 focus-within:ring-2 focus-within:ring-maroon-200">
            <ImageIcon className="h-6 w-6" />
            <VideoIcon className="h-6 w-6" />
            {t("listing.chooseMedia")}
            <input type="file" accept="image/*,video/*" multiple className="sr-only" onChange={chooseMedia} />
          </label>
          {media.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {media.map(({ file, url }) => (
                <div key={url} className="relative overflow-hidden rounded-xl border border-ink/10 bg-muted">
                  {file.type.startsWith("video/") ? (
                    <video src={url} controls className="aspect-video w-full object-cover" />
                  ) : (
                    <img src={url} alt={file.name} className="aspect-video w-full object-cover" />
                  )}
                  <p className="truncate px-2 py-1 text-xs">{file.name}</p>
                  <button
                    type="button"
                    aria-label={`${t("listing.removeMedia")}: ${file.name}`}
                    onClick={() => removeMedia(url)}
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-surface/90 text-ink shadow"
                  >
                    <CloseIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold">
            {t("listing.budget")}
            <div className="relative mt-1">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-ink/60">৳</span>
              <input type="number" min="0" step="1" className={`${fieldClass} mt-0 pl-8`} placeholder={t("listing.budgetPlaceholder")} />
            </div>
          </label>
          <label className="block text-sm font-semibold">
            {t("listing.duration")}
            <input maxLength={80} className={fieldClass} placeholder={t("listing.durationPlaceholder")} />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold">
            {t("listing.location")}
            <input maxLength={100} className={fieldClass} placeholder={t("listing.locationPlaceholder")} />
          </label>
          <label className="block text-sm font-semibold">
            {t("composer.audience")}
            <select value={audience} onChange={(event) => setAudience(event.target.value)} className={fieldClass}>
              <option value="public">{t("composer.public")}</option>
              <option value="private">{t("composer.private")}</option>
            </select>
          </label>
        </div>

        <button type="submit" className="w-full rounded-xl bg-maroon-700 px-5 py-3 font-semibold text-white transition hover:bg-maroon-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200">
          {t("listing.publish")}
        </button>
      </form>
    </section>
  );
}
