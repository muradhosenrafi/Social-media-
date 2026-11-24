"use client";

import { useEffect, useRef, useState } from "react";
import { MailIcon } from "./Icons";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001").replace(/\/+$/, "");
const LENGTH = 6;
const RESEND_SECONDS = 60;
const OTP_VALID_SECONDS = 5 * 60;

export default function OtpPanel({ contact, channel = "email", onBack, onVerified }) {
  const [digits, setDigits] = useState(Array(LENGTH).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [expiresInSeconds, setExpiresInSeconds] = useState(OTP_VALID_SECONDS);
  const refs = useRef([]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  useEffect(() => {
    if (expiresInSeconds <= 0) return;
    const t = setTimeout(() => setExpiresInSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [expiresInSeconds]);

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
    if (expiresInSeconds <= 0) {
      setError("That code has expired. Request a new one.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [channel]: channel === "email" ? contact.toLowerCase() : contact.replace(/[\s()-]/g, ""), code }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "That code is incorrect or expired. Try again.");
      onVerified?.();
    } catch (err) {
      setError(err.message || `Could not connect to the DateNexa backend at ${API_URL}. Check that it is running.`);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (seconds > 0) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [channel]: channel === "email" ? contact.toLowerCase() : contact.replace(/[\s()-]/g, "") }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Could not resend the code. Please try again.");
      setDigits(Array(LENGTH).fill(""));
      setSeconds(RESEND_SECONDS);
      setExpiresInSeconds(OTP_VALID_SECONDS);
      refs.current[0]?.focus();
    } catch (err) {
      setError(err.message || `Could not connect to the DateNexa backend at ${API_URL}. Check that it is running.`);
    } finally {
      setLoading(false);
    }
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const expiresMm = String(Math.floor(expiresInSeconds / 60)).padStart(2, "0");
  const expiresSs = String(expiresInSeconds % 60).padStart(2, "0");

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
        {expiresInSeconds > 0 ? <>Code expires in {expiresMm}:{expiresSs}. </> : <>Code expired. Go back and submit registration again. </>}
        {expiresInSeconds > 0 && seconds > 0 ? (
          <>Resend in {mm}:{ss}</>
        ) : expiresInSeconds > 0 ? (
          <>
            Didn&apos;t get the code?{" "}
            <button type="button" disabled={loading} onClick={handleResend} className="font-semibold text-[#e91e63] hover:underline disabled:opacity-60">
              Resend
            </button>
          </>
        ) : null}
      </p>

      <button type="button" onClick={onBack} className="mt-3 text-sm text-[#6b5b95] hover:underline">
        Change email or phone number
      </button>
    </form>
  );
}
