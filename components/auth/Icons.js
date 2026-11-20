const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const UserIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
  </svg>
);

export const MaleIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="10" cy="14" r="5" />
    <path d="M14 10l6-6M15 4h5v5" />
  </svg>
);

export const FemaleIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="9" r="5" />
    <path d="M12 14v8M9 18h6" />
  </svg>
);

export const OtherIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="13" r="4" />
    <path d="M14 10l6-6M16 4h4v4M11 17v4M9 19h4" />
  </svg>
);

export const CalendarIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path d="M8 3v4M16 3v4M3 10h18" />
  </svg>
);

export const MailIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export const ChevronDownIcon = (p) => (
  <svg {...base} strokeWidth={2.2} {...p}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const HeartIcon = ({ className = "", ...p }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden {...p}>
    <path d="M12 21s-7.5-4.6-9.5-9.2C1.2 8.6 3 5 6.4 5c2 0 3.6 1.1 5.6 3.2C14 6.1 15.6 5 17.6 5 21 5 22.8 8.6 21.5 11.8 19.5 16.4 12 21 12 21z" />
  </svg>
);

export const ChatIcon = ({ className = "", ...p }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden {...p}>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
  </svg>
);

export const StarIcon = ({ className = "", ...p }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden {...p}>
    <polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9" />
  </svg>
);

export const LogoMark = ({ className = "" }) => (
  <svg viewBox="0 0 48 44" className={className} fill="none" aria-hidden>
    <defs>
      <linearGradient id="df-logo" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f0508a" />
        <stop offset="1" stopColor="#c2185b" />
      </linearGradient>
    </defs>
    <path
      d="M24 40S5 29 5 15.5C5 9.5 9.4 5 15 5c3.8 0 7 2 9 5.5C26 7 29.200 5 33 5c5.600 0 10 4.500 10 10.500C43 29 24 40 24 40z"
      stroke="url(#df-logo)"
      strokeWidth="4.500"
      strokeLinejoin="round"
    />
    <path d="M13 17c1-3 3.500-4.500 6-4.500" stroke="url(#df-logo)" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const LockIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="4" y="10" width="16" height="11" rx="3" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

export const EyeIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const EyeOffIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
    <path d="M3 3l18 18" />
  </svg>
);