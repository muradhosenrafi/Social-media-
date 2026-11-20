"use client";

import { useEffect, useRef, useState } from "react";
import { MailIcon } from "./Icons";

const LENGTH = 6;
const RESEND_SECONDS = 60;

export default function OtpPanel({ contact, onBack, onVerified }) {
  const [digits, setDigits] = useState(Array(LENGTH).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const refs = useRef([]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const setAt = (i, v) =>
    setDigits((d) => {
      const next = [...d];
      next[i] = v;
      return next;
    });

  const handleChange = (i, e) => {
    const v = e.target.value.replace(/\D/g, "").slice(-1);
    setAt(i, v);
    setError("");
    if (v && i < LENGTH - 1) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < LENGTH - 1) refs.current[i + 1]?.focus();
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH);
    if (!text) return;
    e.preventDefault();
    const next = Array(LENGTH).fill("");
    text.split("").forEach((c, i) => (next[i] = c));
    setDigits(next);
    refs.current[Math.min(text.length, LENGTH - 1)]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length < LENGTH) {
      setError("Enter the 6-digit code.");
      return;
    }
    setLoading(true);
    try {
      // TODO: API call করে code verify করুন, যেমন:
      // const res = await fetch("/api/auth/verify-otp", { method: "POST", body: JSON.stringify({ contact, code }) });
      // if (!res.ok) throw new Error("Invalid code");
      await new Promise((r) => setTimeout(r, 600));
      onVerified?.();
    } catch {
      setError("That code is incorrect or expired. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    if (seconds > 0) return;
    // TODO: API call করে নতুন code পাঠান
    setDigits(Array(LENGTH).fill(""));
    setError("");
    setSeconds(RESEND_SECONDS);
    refs.current[0]?.focus();
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <form onSubmit={handleVerify} className="mx-auto w-full max-w-md text-center" noValidate>
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ffe3ef] text-[#e91e63]">
        <MailIcon className="h-8 w-8" />
      </span>
      <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#1b1035]">Verify your account</h2>
      <p className="mt-3 text-[#5b5078]">
        We sent a 6-digit code to
        <br />
        <span className="font-semibold text-[#1b1035]">{contact}</span>
      </p>

      <div className="mt-8 flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => (refs.current[i] = el)}
            value={d}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            maxLength={1}
            aria-label={`Digit ${i + 1}`}
            className={`h-14 w-11 rounded-xl border bg-white text-center text-2xl font-semibold text-[#1b1035] outline-none transition focus:border-[#e91e63] focus:ring-4 focus:ring-[#ffd3e6] sm:w-12 ${
              error ? "border-red-400" : d ? "border-[#e91e63]" : "border-[#e6dff0]"
            }`}
          />
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-500">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-8 h-14 w-full rounded-full bg-linear-to-r from-[#f0508a] to-[#d4206a] text-lg font-semibold text-white shadow-[0_8px_20px_-8px_rgba(212,32,106,0.7)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ffd3e6] disabled:opacity-60"
      >
        {loading ? "Verifying…" : "Verify"}
      </button>

      <p className="mt-6 text-[#5b5078]">
        {seconds > 0 ? (
          <>Resend code in {mm}:{ss}</>
        ) : (
          <>
            Didn&apos;t get the code?{" "}
            <button type="button" onClick={handleResend} className="font-semibold text-[#e91e63] hover:underline">
              Resend
            </button>
          </>
        )}
      </p>

      <button type="button" onClick={onBack} className="mt-3 text-sm text-[#6b5b95] hover:underline">
        Change email or number
      </button>
    </form>
  );
}
