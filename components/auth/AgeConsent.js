"use client";

import Link from "next/link";
import { useState } from "react";
import { HeartIcon } from "./Icons";

export default function AgeConsent({ onAccept }) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="mx-auto w-full max-w-md text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ffe3ef] text-[#e91e63]">
        <HeartIcon className="h-8 w-8" />
      </span>

      <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#1b1035]">
        Are you 18 or older?
      </h2>
      <p className="mt-3 text-[17px] text-[#5b5078]">
        DateNexa is only for adults. Confirm your age to continue.
      </p>

      <label
        className={`mt-8 flex cursor-pointer items-start gap-3 rounded-2xl border p-4 text-left transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-[#ffd3e6] ${
          checked
            ? "border-[#e91e63] bg-[#fff0f6]"
            : "border-[#e6dff0] bg-white hover:border-[#f3b2cd]"
        }`}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          autoComplete="off"
          className="mt-1 h-5 w-5 shrink-0 accent-[#e91e63]"
        />
        <span className="text-[15px] leading-relaxed text-[#3d3358]">
          I am <b>18 years or older</b> and I agree to the{" "}
          <b>Terms of Service</b> and <b>Privacy Policy</b>.
        </span>
      </label>

      <button
        type="button"
        disabled={!checked}
        onClick={onAccept}
        className="mt-6 h-[60px] w-full rounded-full bg-linear-to-r from-[#f0508a] to-[#d4206a] text-xl font-semibold text-white shadow-[0_10px_24px_-10px_rgba(212,32,106,0.75)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ffd3e6] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
      >
        Continue
      </button>

      <p className="mt-5 text-[17px] text-[#5b5078]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-[#e91e63] hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
