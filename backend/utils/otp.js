import { createHash, randomInt, timingSafeEqual } from "node:crypto";

export function createOtp() {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

export function hashOtp(code) {
  return createHash("sha256").update(code).digest("hex");
}

export function otpMatches(code, storedHash) {
  if (!/^\d{6}$/.test(code) || !storedHash) return false;
  const candidate = Buffer.from(hashOtp(code), "hex");
  const stored = Buffer.from(storedHash, "hex");
  return candidate.length === stored.length && timingSafeEqual(candidate, stored);
}
