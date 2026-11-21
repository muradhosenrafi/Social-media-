"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OtpPanel from "./OtpPanel";
import {
  ChevronDownIcon,
  EyeIcon,
  EyeOffIcon,
  FemaleIcon,
  HeartIcon,
  LockIcon,
  LogoMark,
  MailIcon,
  MaleIcon,
  OtherIcon,
  UserIcon,
} from "./Icons";

const genders = [
  { value: "male", label: "Male", Icon: MaleIcon },
  { value: "female", label: "Female", Icon: FemaleIcon },
  { value: "other", label: "Other", Icon: OtherIcon },
];

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const THIS_YEAR = new Date().getFullYear();
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const YEARS = Array.from({ length: 100 }, (_, i) => THIS_YEAR - i);

// নাম: যেকোনো ভাষার অক্ষর (বাংলা/English), স্পেস, . ' - ; ১-৩০ অক্ষর
const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}\s.'-]{0,29}$/u;
// ইমেইল: example@mail.com
const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
// ফোন: ১০-১৫ ডিজিট, শুরুতে + থাকতে পারে
const PHONE_RE = /^\+?[0-9]{10,15}$/;
// পাসওয়ার্ড: ৮-৬৪ অক্ষর, অন্তত ১টি অক্ষর আর ১টি সংখ্যা
const PASSWORD_RE = /^(?=.*[A-Za-z])(?=.*\d).{8,64}$/;

const field =
  "flex h-[60px] items-center gap-3 rounded-2xl border border-[#e6dff0] bg-white px-4 text-[#6b5b95] transition focus-within:border-[#e91e63] focus-within:ring-4 focus-within:ring-[#ffd3e6]";
const input =
  "h-full w-full bg-transparent text-base text-[#1b1035] outline-none placeholder:text-[#8a82a8]";
const label = "mb-2 block text-[17px] font-semibold text-[#1b1035]";

function SelectBox({ value, onChange, placeholder, options, ariaLabel }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
        className={`h-[56px] w-full cursor-pointer appearance-none rounded-2xl border border-[#e6dff0] bg-white pl-4 pr-9 text-base outline-none transition focus:border-[#e91e63] focus:ring-4 focus:ring-[#ffd3e6] ${
          value ? "text-[#1b1035]" : "text-[#8a82a8]"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1b1035]" />
    </div>
  );
}

const dayOptions = DAYS.map((d) => ({ value: String(d), label: String(d) }));
const monthOptions = MONTHS.map((m, i) => ({ value: String(i + 1), label: m }));
const yearOptions = YEARS.map((y) => ({ value: String(y), label: String(y) }));

export default function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState("form"); // "form" | "otp"
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "male",
    day: "",
    month: "",
    year: "",
    contact: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined, ...(["day", "month", "year"].includes(k) ? { dob: undefined } : {}) }));
  };

  const validate = () => {
    const er = {};
    if (!form.firstName.trim()) er.firstName = "Enter your first name.";
    else if (!NAME_RE.test(form.firstName.trim()))
      er.firstName = "Use letters only (max 30 characters).";

    if (!form.lastName.trim()) er.lastName = "Enter your last name.";
    else if (!NAME_RE.test(form.lastName.trim()))
      er.lastName = "Use letters only (max 30 characters).";

    if (!form.day || !form.month || !form.year) {
      er.dob = "Select your day, month and year of birth.";
    } else {
      const d = Number(form.day);
      const m = Number(form.month);
      const y = Number(form.year);
      const date = new Date(y, m - 1, d);
      if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
        er.dob = "This date does not exist.";
      } else {
        const today = new Date();
        let age = today.getFullYear() - y;
        const beforeBirthday =
          today.getMonth() < m - 1 || (today.getMonth() === m - 1 && today.getDate() < d);
        if (beforeBirthday) age -= 1;
        if (age < 18) er.dob = "You must be at least 18 years old.";
      }
    }

    const c = form.contact.trim();
    if (!c) er.contact = "Enter your email or phone number.";
    else if (!EMAIL_RE.test(c) && !PHONE_RE.test(c.replace(/[\s-]/g, "")))
      er.contact = "Enter a valid email or phone number.";
    if (!form.password) er.password = "Enter a password.";
    else if (!PASSWORD_RE.test(form.password))
      er.password = "Use 8+ characters with at least 1 letter and 1 number.";
    return er;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;

    setLoading(true);
    try {
      // TODO: API call করে OTP পাঠান, যেমন:
      // const dob = `${form.year}-${String(form.month).padStart(2, "0")}-${String(form.day).padStart(2, "0")}`;
      // await fetch("/api/auth/register", { method: "POST", body: JSON.stringify({ ...form, dob }) });
      await new Promise((r) => setTimeout(r, 500));
      setStep("otp");
    } finally {
      setLoading(false);
    }
  };

  if (step === "otp") {
    return (
      <OtpPanel
        contact={form.contact.trim()}
        onBack={() => setStep("form")}
        onVerified={() => router.push("/")}
      />
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
        Create Your Account
      </h2>
      <p className="mt-2 text-center text-[17px] text-[#5b5078]">Join DateNexa and start your journey</p>

      <div className="mt-10 space-y-4">
        <div>
          <label className={field}>
            <UserIcon className="h-6 w-6 shrink-0" />
            <input
              className={input}
              placeholder="First Name"
              autoComplete="given-name"
              value={form.firstName}
              onChange={set("firstName")}
              aria-label="First name"
              aria-invalid={!!errors.firstName}
            />
          </label>
          {errors.firstName && <p className="mt-1.5 text-sm text-red-500">{errors.firstName}</p>}
        </div>
        <div>
          <label className={field}>
            <UserIcon className="h-6 w-6 shrink-0" />
            <input
              className={input}
              placeholder="Last Name"
              autoComplete="family-name"
              value={form.lastName}
              onChange={set("lastName")}
              aria-label="Last name"
              aria-invalid={!!errors.lastName}
            />
          </label>
          {errors.lastName && <p className="mt-1.5 text-sm text-red-500">{errors.lastName}</p>}
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className={label}>Gender</legend>
        <div className="grid grid-cols-3 gap-3">
          {genders.map(({ value, label: text, Icon }) => {
            const active = form.gender === value;
            return (
              <label
                key={value}
                className={`flex h-[52px] cursor-pointer items-center justify-center gap-2 rounded-2xl border text-[15px] font-medium transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-[#ffd3e6] ${
                  active
                    ? "border-[#e91e63] bg-[#fff0f6] text-[#1b1035]"
                    : "border-[#e6dff0] bg-white text-[#3d3358] hover:border-[#f3b2cd]"
                }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value={value}
                  checked={active}
                  onChange={set("gender")}
                  className="sr-only"
                />
                <Icon className={`h-5 w-5 ${active ? "text-[#e91e63]" : "text-[#6b5b95]"}`} />
                {text}
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className={label}>Date of Birth</legend>
        <div className="grid grid-cols-3 gap-3">
          <SelectBox
            value={form.day}
            onChange={set("day")}
            placeholder="Day"
            options={dayOptions}
            ariaLabel="Day of birth"
          />
          <SelectBox
            value={form.month}
            onChange={set("month")}
            placeholder="Month"
            options={monthOptions}
            ariaLabel="Month of birth"
          />
          <SelectBox
            value={form.year}
            onChange={set("year")}
            placeholder="Year"
            options={yearOptions}
            ariaLabel="Year of birth"
          />
        </div>
        {errors.dob && <p className="mt-1.5 text-sm text-red-500">{errors.dob}</p>}
      </fieldset>

      <div className="mt-6">
        <label htmlFor="contact" className={label}>
          Email or Number
        </label>
        <div className={field}>
          <MailIcon className="h-6 w-6 shrink-0" />
          <input
            id="contact"
            className={input}
            placeholder="Enter your email or phone number"
            autoComplete="email"
            value={form.contact}
            onChange={set("contact")}
            aria-invalid={!!errors.contact}
          />
        </div>
        {errors.contact && <p className="mt-1.5 text-sm text-red-500">{errors.contact}</p>}
      </div>

      <div className="mt-6">
        <label htmlFor="password" className={label}>
          Password
        </label>
        <div className={field}>
          <LockIcon className="h-6 w-6 shrink-0" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className={input}
            placeholder="Create a password"
            autoComplete="new-password"
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
        {errors.password ? (
          <p className="mt-1.5 text-sm text-red-500">{errors.password}</p>
        ) : (
          <p className="mt-1.5 text-sm text-[#8a82a8]">8+ characters, with a letter and a number.</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 h-[60px] w-full rounded-full bg-linear-to-r from-[#f0508a] to-[#d4206a] text-xl font-semibold text-white shadow-[0_10px_24px_-10px_rgba(212,32,106,0.75)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ffd3e6] disabled:opacity-60"
      >
        {loading ? "Sending code…" : "Submit"}
      </button>

      <div className="mt-6 flex items-center gap-4 text-[#5b5078]">
        <span className="h-px flex-1 bg-[#e6dff0]" />
        or
        <span className="h-px flex-1 bg-[#e6dff0]" />
      </div>

      <p className="mt-5 text-center text-[17px] text-[#5b5078]">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-[#e91e63] hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}