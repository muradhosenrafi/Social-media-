"use client";

import { useEffect, useRef, useState } from "react";
import { AlertIcon, CheckIcon, CloseIcon, UploadIcon, CameraIcon } from "@/components/ui/Icons";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { currentUser, profiles } from "@/lib/mock-data";
import { readPersonalInfo } from "@/lib/personal-info";
import {
  DEMO_MODE,
  isVerified,
  resetVerification,
  saveVerification,
  useVerification,
  verifyIdentity,
} from "@/lib/verification";
import FaceCapture from "./FaceCapture";
import { btnMain, btnSoft, inputCls } from "./fields";

const MAX_BYTES = 8 * 1024 * 1024;

function usePhoto() {
  const [photo, setPhoto] = useState(null);
  const urlRef = useRef(null);
  const set = (file) => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = file ? URL.createObjectURL(file) : null;
    setPhoto(file ? { file, url: urlRef.current } : null);
  };
  useEffect(() => () => { if (urlRef.current) URL.revokeObjectURL(urlRef.current); }, []);
  return [photo, set];
}

function Step({ n, title, desc, done, status, children }) {
  return (
    <section className="rounded-2xl bg-muted/60 p-5 ring-1 ring-ink/10 sm:p-6">
      <div className="mb-4 flex items-start gap-3">
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${done ? "bg-emerald-600" : "bg-maroon-700"}`}>
          {done ? <CheckIcon className="h-4 w-4" /> : n}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-sm font-bold sm:text-base">{title}</h2>
            <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${done ? "border-emerald-600/30 text-emerald-700" : "border-ink/10 text-ink/60"}`}>{status}</span>
          </div>
          <p className="mt-1 text-xs leading-5 text-ink/70">{desc}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function Check({ ok, children }) {
  return <li className="flex items-start gap-2 text-sm"><span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white ${ok ? "bg-emerald-600" : "bg-ink/25"}`}>{ok ? <CheckIcon className="h-3 w-3" /> : <CloseIcon className="h-3 w-3" />}</span><span>{children}</span></li>;
}

export default function VerificationFlow() {
  const { t } = useLanguage();
  const saved = useVerification();
  const profile = profiles[currentUser.username];
  const [firstName, ...lastNames] = profile.name.split(" ");
  const [fallbackDay, fallbackMonth, fallbackYear] = profile.birthday.split("/");
  const fallbackPersonal = { first: firstName, last: lastNames.join(" "), day: fallbackDay, month: fallbackMonth, year: fallbackYear, gender: profile.gender ?? "" };
  const [nid, setNid] = usePhoto();
  const [face, setFace] = usePhoto();
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [demo, setDemo] = useState("match");
  const [gender, setGender] = useState(fallbackPersonal.gender);

  useEffect(() => { setGender(readPersonalInfo(fallbackPersonal).gender ?? ""); }, []);

  const outcome = result ?? (saved.status === "verified" || saved.status === "failed" ? saved : null);
  const ok = isVerified(outcome);

  const accept = (setter) => (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > MAX_BYTES) { setError(t("verify.fileError")); return; }
    setError("");
    setter(file);
  };

  const submit = async () => {
    setBusy(true);
    setError("");
    try {
      const personal = readPersonalInfo(fallbackPersonal);
      const r = await verifyIdentity({
        nidFile: nid.file,
        faceFile: face.file,
        profile: {
          name: `${personal.first} ${personal.last}`.trim(),
          birthday: `${personal.day}/${personal.month}/${personal.year}`,
          gender: personal.gender,
        },
        demoOutcome: demo,
      });
      setResult(r);
      saveVerification({ status: isVerified(r) ? "verified" : "failed", nidMatchesProfile: r.nidMatchesProfile === true, faceMatchesNid: r.faceMatchesNid === true, genderMatchesProfile: r.genderMatchesProfile === true, at: Date.now() });
    } catch {
      setError(t("verify.error"));
    } finally { setBusy(false); }
  };

  const again = () => { resetVerification(); setResult(null); setNid(null); setFace(null); };
  const status = (done) => done ? t("verify.added") : t("verify.pending");

  return (
    <div className="space-y-5">
      {outcome && <section role="status" className={`rounded-2xl p-5 ring-1 ${ok ? "bg-emerald-600/10 ring-emerald-600/30" : "bg-red-600/10 ring-red-600/30"}`}>
        <p className="flex items-center gap-2 text-sm font-bold">{ok ? <VerifiedBadge size={20} /> : <AlertIcon className="h-5 w-5 text-red-600" />}{ok ? t("verify.result.ok") : t("verify.result.fail")}</p>
        <ul className="mt-3 space-y-2"><Check ok={outcome.nidMatchesProfile === true}>{t("verify.check.nid")}</Check><Check ok={outcome.genderMatchesProfile === true}>{t("verify.check.gender")}</Check><Check ok={outcome.faceMatchesNid === true}>{t("verify.check.face")}</Check></ul>
        {ok && <button type="button" onClick={again} className={`${btnSoft} mt-4`}>{t("verify.again")}</button>}
      </section>}

      {!ok && <>
        <Step n={1} title={t("verify.nidTitle")} desc={t("verify.nidDesc")} done={!!nid} status={status(!!nid)}>
          {nid && <div className="mb-3 flex items-center gap-3 rounded-xl bg-surface p-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}<img src={nid.url} alt={t("verify.nidPreview")} className="h-16 w-24 rounded-lg object-cover" />
            <div className="min-w-0"><p className="truncate text-sm font-semibold">{nid.file.name}</p><p className="text-xs text-ink/60">{t("verify.ready")}</p></div>
          </div>}
          <div className="flex flex-wrap gap-2">
            <label className={`${btnMain} cursor-pointer focus-within:ring-4 focus-within:ring-maroon-200`}><CameraIcon className="h-5 w-5" />{t("verify.takePhoto")}<input type="file" accept="image/*" capture="environment" className="sr-only" onChange={(e) => { accept(setNid)(e.target.files?.[0]); e.target.value = ""; }} /></label>
            <label className={`${btnSoft} cursor-pointer focus-within:ring-4 focus-within:ring-maroon-200`}><UploadIcon className="h-5 w-5" />{t("verify.upload")}<input type="file" accept="image/*" className="sr-only" onChange={(e) => { accept(setNid)(e.target.files?.[0]); e.target.value = ""; }} /></label>
          </div>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-xs leading-5 text-ink/65"><li>{t("verify.nidTip1")}</li><li>{t("verify.nidTip2")}</li></ul>
        </Step>

        <Step n={2} title={t("verify.faceTitle")} desc={t("verify.faceDesc")} done={!!face} status={status(!!face)}>
          {face && <div className="mb-3 flex items-center gap-3 rounded-xl bg-surface p-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}<img src={face.url} alt={t("verify.facePreview")} className="h-16 w-16 rounded-lg object-cover" />
            <div className="min-w-0"><p className="truncate text-sm font-semibold">{face.file.name}</p><p className="text-xs text-ink/60">{t("verify.ready")}</p></div>
          </div>}
          <FaceCapture onCapture={accept(setFace)} />
          <ul className="mt-4 list-disc space-y-1 pl-5 text-xs leading-5 text-ink/65"><li>{t("verify.faceTip1")}</li><li>{t("verify.faceTip2")}</li></ul>
        </Step>

        <Step n={3} title={t("verify.step3")} desc={t("verify.privacy")} done={false} status={t("verify.review")}>
          <div className="mb-4 divide-y divide-ink/10 border-y border-ink/10 text-sm">
            <div className="flex justify-between py-3"><span>{t("verify.nidTitle")}</span><span className={`font-semibold ${nid ? "text-emerald-700" : "text-ink/55"}`}>{nid ? t("verify.added") : t("verify.notAdded")}</span></div>
            <div className="flex justify-between py-3"><span>{t("verify.faceTitle")}</span><span className={`font-semibold ${face ? "text-emerald-700" : "text-ink/55"}`}>{face ? t("verify.added") : t("verify.notAdded")}</span></div>
            <div className="flex justify-between py-3"><span>{t("settings.field.gender")}</span><span className="font-semibold">{gender ? t(`settings.gender.${gender}`) : t("verify.notAdded")}</span></div>
          </div>
          {DEMO_MODE && <label className="mb-3 block text-xs font-semibold">{t("verify.demo")}<select value={demo} onChange={(e) => setDemo(e.target.value)} className={`${inputCls} mt-1.5`}><option value="match">{t("verify.demo.match")}</option><option value="mismatch">{t("verify.demo.mismatch")}</option></select><span className="mt-1 block font-normal text-ink/60">{t("verify.demoNote")}</span></label>}
          <button type="button" onClick={submit} disabled={!nid || !face || busy} className={`${btnMain} w-full py-3`}>{busy ? t("verify.checking") : t("verify.submit")}</button>
        </Step>
      </>}
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
