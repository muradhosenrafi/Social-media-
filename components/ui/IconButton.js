import Link from "next/link";

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const PersonIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8.5" r="3.8" />
    <path d="M4.5 20c0-3.6 3.2-5.8 7.5-5.8s7.5 2.2 7.5 5.800" />
  </svg>
);

export const ChevronDownIcon = (p) => (
  <svg {...base} strokeWidth={2.2} {...p}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const ChevronLeftIcon = (p) => (
  <svg {...base} strokeWidth={2.2} {...p}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
);

export const ChevronRightIcon = (p) => (
  <svg {...base} strokeWidth={2.2} {...p}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const GlobeIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c3.200 3.400 3.200 14.600 0 18M12 3c-3.200 3.400-3.200 14.600 0 18" />
  </svg>
);

export const MessageIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M21 12a8 8 0 0 1-11.700 7.100L4 20.500l1.200-4.400A8 8 0 1 1 21 12z" />
    <path d="M8.500 10.500h7M8.500 13.500H13" />
  </svg>
);

export const BellIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M6 9a6 6 0 0 1 12 0c0 6 2 7.500 2 7.500H4S6 15 6 9z" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </svg>
);

export const ThumbIcon = ({ filled = false, ...p }) => (
  <svg {...base} fill={filled ? "currentColor" : "none"} {...p}>
    <path d="M7 11v9H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3z" />
    <path d="M7 11l4-8a2.500 2.500 0 0 1 2.500 2.800L13 9h5.400a2 2 0 0 1 2 2.400l-1.300 7A2 2 0 0 1 17 20H7" />
  </svg>
);

export const CommentIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M21 12a8 8 0 0 1-11.700 7.100L4 20.500l1.200-4.400A8 8 0 1 1 21 12z" />
    <path d="M8.500 12h.01M12 12h.01M15.500 12h.01" strokeWidth="2.600" />
  </svg>
);

export const ShareIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M14 5l7 6-7 6v-3.600C8.500 13.400 5.200 15 3 19c.6-5.800 3.800-9.800 11-10.200V5z" />
  </svg>
);

export const BookmarkIcon = ({ filled = false, ...p }) => (
  <svg {...base} fill={filled ? "currentColor" : "none"} {...p}>
    <path d="M6.500 3h11v18L12 16.800 6.500 21V3z" />
  </svg>
);

export const StarIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <polygon points="12 2 14.900 8.600 22 9.300 16.600 14 18.200 21 12 17.300 5.800 21 7.400 14 2 9.300 9.100 8.600" />
  </svg>
);

export const CoinIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <circle cx="12" cy="12" r="10" fill="#fff" stroke="#6d28d9" strokeWidth="2" />
    <text x="12" y="16.500" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">
      $
    </text>
  </svg>
);

/* ---- Contact brand icons (সরল রূপ; চাইলে public/icons-এর আসল লোগো বসাতে পারেন) ---- */
export const TelegramIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <circle cx="12" cy="12" r="12" fill="#2AABEE" />
    <path
      fill="#fff"
      d="M17.900 6.600L4.900 11.600c-.9.400-.9.900-.2 1.100l3.300 1 1.300 4c.2.500.3.600.7.600.4 0 .5-.2.8-.4l1.900-1.800 3.900 2.900c.7.400 1.200.2 1.400-.7l2.500-11.700c.3-1.100-.4-1.600-1.400-1.200z"
    />
  </svg>
);

export const WhatsAppIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <circle cx="12" cy="12" r="12" fill="#25D366" />
    <path
      fill="none"
      stroke="#fff"
      strokeWidth="1.800"
      d="M12 5.200a6.800 6.800 0 0 0-5.800 10.300L5.200 18.800l3.400-1A6.800 6.800 0 1 0 12 5.200z"
    />
    <path
      fill="#fff"
      d="M9.400 9.100c.2-.4.500-.4.700-.4h.5c.2 0 .4.100.5.400l.6 1.400c.1.200 0 .4-.1.600l-.4.500c-.1.100-.2.300 0 .5.400.7 1.300 1.600 2.200 2 .2.100.4.100.5-.1l.5-.6c.2-.2.4-.2.600-.1l1.400.7c.2.100.3.200.3.400 0 .5-.2 1.100-.7 1.400-.5.400-1.200.5-1.900.3-3-.9-4.800-3.200-5.200-4.700-.2-.7 0-1.500.5-2.200z"
    />
  </svg>
);

export const DiscordIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <circle cx="12" cy="12" r="12" fill="#5865F2" />
    <path
      fill="#fff"
      d="M16.900 7.500a10 10 0 0 0-2.500-.8l-.3.600a9 9 0 0 0-2.500 0l-.3-.6c-.9.100-1.700.4-2.500.8-1.600 2.400-2 4.700-1.800 7 1 .7 2 1.200 3.100 1.500l.7-1.100c-.4-.1-.8-.3-1.100-.6l.3-.2c2.100 1 4.300 1 6.400 0l.3.2c-.4.200-.7.400-1.100.6l.7 1.100c1.100-.3 2.100-.8 3.100-1.500.3-2.700-.4-5-1.800-7z"
    />
    <circle cx="9.800" cy="12.200" r="1.100" fill="#5865F2" />
    <circle cx="14.200" cy="12.200" r="1.100" fill="#5865F2" />
  </svg>
);

export default function IconButton({ href, label, children, className = "", ...props }) {
  const cls = `inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink transition hover:bg-maroon-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200 ${className}`;

  if (href) {
    return (
      <Link href={href} aria-label={label} className={cls} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" aria-label={label} className={cls} {...props}>
      {children}
    </button>
  );
}