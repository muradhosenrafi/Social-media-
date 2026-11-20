"use client";

import { useId } from "react";
import { ChevronDownIcon } from "@/components/ui/Icons";

export const inputCls =
  "w-full rounded-xl bg-muted px-4 py-3 text-sm font-medium text-ink outline-none ring-2 ring-transparent transition placeholder:text-ink/50 focus:ring-maroon-500 aria-[invalid=true]:ring-red-500 disabled:opacity-60";

export const btnCls =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200 disabled:opacity-60";
export const btnMain = `${btnCls} bg-maroon-700 text-white hover:bg-maroon-900`;
export const btnSoft = `${btnCls} bg-muted hover:brightness-95`;

export function Field({ label, error, hint, className = "", children }) {
  const id = useId();
  const msgId = `${id}-msg`;
  const message = error || hint;
  const props = {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": message ? msgId : undefined,
  };
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      {children(props)}
      {message && (
        <p id={msgId} className={`mt-1.5 text-xs ${error ? "text-red-600" : "text-ink/60"}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export function Select({ className = "", children, ...props }) {
  return (
    <div className={`relative ${className}`}>
      <select {...props} className={`${inputCls} appearance-none pr-10`}>
        {children}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/70" />
    </div>
  );
}
