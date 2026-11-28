"use client";

import Link from "next/link";
import { useState } from "react";
import { HeartIcon, LogoMark, MailIcon } from "./Icons";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001").replace(/\/+$/, "");

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const field =
  "flex h-[60px] items-center gap-3 rounded-2xl border border-[#e6dff0] bg-white px-4 text-[#6b5b95] transition focus-within:border-[#e91e63] focus-within:ring-4 focus-within:ring-[#ffd3e6]";
const input =
  "h-full w-full bg-transparent text-base text-[#1b1035] outline-none placeholder:text-[#8a82a8]";
const label = "mb-2 block text-[17px] font-semibold text-[#1b1035]";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = email.trim();

    if (!value) return setError("Enter your email.");
    if (!EMAIL_RE.test(value)) return setError("Enter a valid email address.");

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="mx-auto w-full max-w-md text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ffe3ef] text-[#e91e63]">
          <MailIcon className="h-8 w-8" />
        </span>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#1b1035]">Check your email</h2>
        <p className="mt-3 text-[17px] text-[#5b5078]">
          If an account exists for
          <br />
          <span className="font-semibold text-[#1b1035]">{email.trim()}</span>,
          <br />
          we have sent a link to reset your password.
        </p>
        <p className="mt-4 text-sm text-[#8a82a8]">
          Nothing in your inbox? Check your spam folder. The link works for a limited time.
        </p>

        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-8 h-[56px] w-full rounded-full border border-[#e91e63] text-lg font-semibold text-[#e91e63] transition hover:bg-[#fff0f6] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ffd3e6]"
        >
          Use a different email
        </button>

        <p className="mt-5 text-[17px] text-[#5b5078]">
          <Link href="/login" className="font-semibold text-[#e91e63] hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md" noValidate>
      <div className="mb-6 flex items-center justify-center gap-2 md:hidden">
        <LogoMark className="h-8 w-9" />
        <span className="text-2xl font-bold text-[#1b1035]">
          Date<span className="text-[#e91e63]">Flow</span>
        </span>
      </div>

      <HeartIcon className="absolute right-6 top-6 hidden h-12 w-12 -rotate-6 text-[#f48fb1] md:block" />

      <h2 className="text-center text-3xl font-bold tracking-tight text-[#1b1035] sm:text-[34px]">
        Forgot Password?
      </h2>
      <p className="mt-2 text-center text-[17px] text-[#5b5078]">
        Enter your email and we will send you a link to reset your password.
      </p>

      <div className="mt-10">
        <label htmlFor="email" className={label}>
          Email
        </label>
        <div className={field}>
          <MailIcon className="h-6 w-6 shrink-0" />
          <input
            id="email"
            type="email"
            className={input}
            placeholder="Enter your email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            aria-invalid={!!error}
          />
        </div>
        {error && (
          <p role="alert" className="mt-1.5 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 h-[60px] w-full rounded-full bg-linear-to-r from-[#f0508a] to-[#d4206a] text-xl font-semibold text-white shadow-[0_10px_24px_-10px_rgba(212,32,106,0.75)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ffd3e6] disabled:opacity-60"
      >
        {loading ? "Sending link…" : "Send reset link"}
      </button>

      <p className="mt-6 text-center text-[17px] text-[#5b5078]">
        Remember your password?{" "}
        <Link href="/login" className="font-semibold text-[#e91e63] hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
