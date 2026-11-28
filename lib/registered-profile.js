"use client";

import { useMemo, useSyncExternalStore } from "react";

const KEY = "dateNexa:userProfile";
const EVENT = "dateNexa:userProfile-change";

function subscribe(callback) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function useRegisteredProfile() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => null);
  return useMemo(() => {
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, [raw]);
}

export function saveRegisteredProfile(profile) {
  try {
    localStorage.setItem(KEY, JSON.stringify(profile));
    window.dispatchEvent(new Event(EVENT));
  } catch {}
}
