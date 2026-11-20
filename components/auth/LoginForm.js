"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeIcon, EyeOffIcon, HeartIcon, LockIcon, LogoMark, MailIcon } from "./Icons";

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PHONE_RE = /^\+?[0-9]{10,15}$/;

const field =
  "flex h-[60px] items-center gap-3 rounded-2xl border border-[#e6dff0] bg-white px-4 text-[#6b5b95] transition focus-within:border-[#e91e63] focus-within:ring-4 focus-within:ring-[#ffd3e6]";
const input =
  "h-full w-full bg-transparent text-base text-[#1b1035] outline-none placeholder:text-[#8a82a8]";
const label = "mb-2 block text-[17px] font-semibold text-[#1b1035]";

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ contact: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
    setFormError("");
  };

  const validate = () => {
    const er = {};
    const c = form.contact.trim();
    if (!c) er.contact = "Enter your email or phone number.";
    else if (!EMAIL_RE.test(c) && !PHONE_RE.test(c.replace(/[\s-]/g, "")))
      er.contact = "Enter a valid email or phone number.";
    if (!form.password) er.password = "Enter your password.";
    return er;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;

    setLoading(true);
    setFormError("");
    try {
      // TODO: API call করে login করুন, যেমন:
      // const res = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ contact: form.contact.trim(), password: form.password }),
      // });
      // if (!res.ok) throw new Error("Invalid credentials");
      await new Promise((r) => setTimeout(r, 600));
      router.push("/");
    } catch {
      setFormError("Email, number or password is incorrect.");
    } finally {
      setLoading(false);
    }
  };

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
        Welcome Back
      </h2>
      <p className="mt-2 text-center text-[17px] text-[#5b5078]">Login to continue your journey</p>

      <div className="mt-10">
        <label htmlFor="contact" className={label}>
          Email or Number
        </label>
        <div className={field}>
          <MailIcon className="h-6 w-6 shrink-0" />
          <input
            id="contact"
            className={input}
            placeholder="Enter your email or phone number"
            autoComplete="username"
            value={form.contact}
            onChange={set("contact")}
            aria-invalid={!!errors.contact}
          />
        </div>
        {errors.contact && <p className="mt-1.5 text-sm text-red-500">{errors.contact}</p>}
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="password" className="text-[17px] font-semibold text-[#1b1035]">
            Password
          </label>
          <Link href="/forgot-password" className="text-sm font-semibold text-[#e91e63] hover:underline">
            Forgot password?
          </Link>
        </div>
        <div className={field}>
          <LockIcon className="h-6 w-6 shrink-0" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className={input}
            placeholder="Enter your password"
            autoComplete="current-password"
            value={form.password}
            onChange={set("password")}
            aria-invalid={!!errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="shrink-0 rounded-full p-1 text-[#6b5b95] hover:text-[#e91e63] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ffd3e6]"
          >
            {showPassword ? <EyeOffIcon className="h-6 w-6" /> : <EyeIcon className="h-6 w-6" />}
          </button>
        </div>
        {errors.password && <p className="mt-1.5 text-sm text-red-500">{errors.password}</p>}
      </div>

      {formError && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-8 h-[60px] w-full rounded-full bg-linear-to-r from-[#f0508a] to-[#d4206a] text-xl font-semibold text-white shadow-[0_10px_24px_-10px_rgba(212,32,106,0.75)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ffd3e6] disabled:opacity-60"
      >
        {loading ? "Logging in…" : "Login"}
      </button>

      <div className="mt-6 flex items-center gap-4 text-[#5b5078]">
        <span className="h-px flex-1 bg-[#e6dff0]" />
        or
        <span className="h-px flex-1 bg-[#e6dff0]" />
      </div>

      <p className="mt-5 text-center text-[17px] text-[#5b5078]">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-[#e91e63] hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
}