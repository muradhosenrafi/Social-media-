"use client";

import { useMemo, useSyncExternalStore } from "react";

/*
  NID + ফেস ভেরিফিকেশন

  নিয়ম: ভেরিফাইড চিহ্ন শুধু তখনই, যখন দুটো জিনিসই মেলে:
    1) NID-র নাম, জন্ম তারিখ ও gender প্রোফাইলের সঙ্গে মেলে (nidMatchesProfile, genderMatchesProfile)
    2) সেলফির মুখ NID-র ছবির সঙ্গে মেলে                    (faceMatchesNid)
  একটাও না মিললে চিহ্ন দেওয়া হবে না।

  গুরুত্বপূর্ণ: মুখ ও NID মেলানোর কাজ ব্রাউজারে হয় না, আপনার server বা KYC সেবা (যেমন
  একটা eKYC provider) করবে। ব্রাউজারের localStorage শুধু ফলাফল মনে রাখে ও চিহ্ন দেখায়।
  আসল চিহ্ন database-এ server-ই সেভ করবে, নইলে কেউ নিজে নিজে চিহ্ন বসিয়ে নিতে পারবে।
*/

const KEY = "dateflow.verification";
const EVENT = "dateflow:verification";
const NONE = { status: "none" }; // none | verified | failed

// API না থাকলে শুধু ডেভেলপমেন্টে ডেমো চলে। production-এ ভুয়া ভেরিফিকেশন কখনো চলবে না
export const DEMO_MODE = !process.env.NEXT_PUBLIC_VERIFY_URL && process.env.NODE_ENV !== "production";

const subscribe = (cb) => {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
};
const getSnapshot = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};
const getServerSnapshot = () => null;

export function useVerification() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return useMemo(() => {
    try {
      return raw ? JSON.parse(raw) : NONE;
    } catch {
      return NONE;
    }
  }, [raw]);
}

export function saveVerification(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

export function resetVerification() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

export const isVerified = (r) => r?.nidMatchesProfile === true && r?.faceMatchesNid === true && r?.genderMatchesProfile === true;

/**
 * API বসানো: .env.local এ NEXT_PUBLIC_VERIFY_URL=https://your-server/verify
 * server multipart/form-data পাবে (nid, face, name, birthday, gender) এবং JSON ফেরত দেবে:
 *   { "nidMatchesProfile": true|false, "faceMatchesNid": true|false, "genderMatchesProfile": true|false }
 */
export async function verifyIdentity({ nidFile, faceFile, profile, demoOutcome = "match" }) {
  const api = process.env.NEXT_PUBLIC_VERIFY_URL;

  if (api) {
    const body = new FormData();
    body.append("nid", nidFile);
    body.append("face", faceFile);
    body.append("name", profile.name);
    body.append("birthday", profile.birthday);
    body.append("gender", profile.gender);
    const res = await fetch(api, { method: "POST", body });
    if (!res.ok) throw new Error("verify_failed");
    return res.json();
  }

  if (!DEMO_MODE) throw new Error("verify_not_configured");

  await new Promise((r) => setTimeout(r, 1500));
  return demoOutcome === "mismatch"
    ? { nidMatchesProfile: true, faceMatchesNid: false, genderMatchesProfile: false }
    : { nidMatchesProfile: true, faceMatchesNid: true, genderMatchesProfile: true };
}
