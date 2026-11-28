export const PERSONAL_INFO_KEY = "dateflow.personalInfo";

export function personalInfoFallback(profile) {
  const [first = "", ...lastParts] = String(profile?.name || "").split(/\s+/);
  const [day = "", month = "", year = ""] = String(profile?.birthday || "").split("/");

  return {
    first,
    last: lastParts.join(" "),
    day: day ? String(Number(day)) : "",
    month: month ? String(Number(month)) : "",
    year,
    gender: profile?.gender || "",
    status: profile?.relationship || "",
    contact: "",
  };
}

export function readPersonalInfo(fallback) {
  try {
    const saved = localStorage.getItem(PERSONAL_INFO_KEY);
    return saved ? { ...fallback, ...JSON.parse(saved) } : fallback;
  } catch {
    return fallback;
  }
}

export function savePersonalInfo(value) {
  try {
    localStorage.setItem(PERSONAL_INFO_KEY, JSON.stringify(value));
  } catch {}
}
