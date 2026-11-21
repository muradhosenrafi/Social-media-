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

export const HomeIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8.5z" />
  </svg>
);

export const UsersIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20c0-3.3 2.8-5.3 6.5-5.3s6.5 2 6.5 5.3" />
    <circle cx="17" cy="9" r="2.8" />
    <path d="M17 14.3c2.7 0 4.5 1.8 4.5 4.2" />
  </svg>
);
export const LockIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="4" y="10" width="16" height="11" rx="3" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    <path d="M12 14.5v2" />
  </svg>
);

export const CardIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="3" />
    <path d="M2.5 10h19M6.5 15h4" />
  </svg>
);

export const CardStackIcon = (p) => (
  <svg {...base} {...p} viewBox="0 0 32 32">
    <rect x="8" y="3.5" width="20" height="16" rx="3" transform="rotate(12 18 11.5)" />
    <rect x="3.5" y="11" width="21" height="16" rx="3" />
    <path d="M3.5 16h21M7 22h6" />
  </svg>
);

export const DocIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
    <path d="M14 3v5h5M9 13h6M9 17h6" />
  </svg>
);

export const GearIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const LogoutIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" />
    <path d="M15 8l4 4-4 4M19 12H9" />
  </svg>
);

export const SunIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const MoonIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

export const PencilIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M4 20h4L19 9l-4-4L4 16v4z" />
    <path d="M13.5 6.5l4 4" />
  </svg>
);

export const PinIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 21s-6.5-5.4-6.5-11a6.5 6.5 0 0 1 13 0c0 5.6-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const CakeIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M4 21h16M5 21v-7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7" />
    <path d="M8 12V9.5M12 12V9.5M16 12V9.5M8 6.5h.01M12 6.5h.01M16 6.5h.01" />
    <path d="M5 16.5c2 1.5 3.500-1.500 7 0s5 1.500 7 0" />
  </svg>
);

export const HeartOutlineIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 20.5s-7.5-4.6-9.5-9.2C1.2 8.300 3 5 6.400 5c2 0 3.600 1.100 5.600 3.200C14 6.100 15.600 5 17.600 5 21 5 22.800 8.300 21.500 11.300 19.500 15.900 12 20.500 12 20.500z" />
  </svg>
);

export const ImageIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <circle cx="9" cy="10" r="1.8" />
    <path d="M21 16l-5-5-8 8" />
  </svg>
);

export const VideoIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="6" width="13" height="12" rx="3" />
    <path d="M16 10.5l5-3v9l-5-3" />
  </svg>
);

export const MegaphoneIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" />
    <path d="M15 9a4 4 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11" />
  </svg>
);


export const IdCardIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <circle cx="9" cy="11" r="2" />
    <path d="M6 16c.5-1.600 1.700-2.400 3-2.400s2.500.8 3 2.400M14.500 10h4M14.500 13.500h3" />
  </svg>
);

export const CameraIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M4 8h3l1.500-2h7L17 8h3v11H4V8Z" />
    <circle cx="12" cy="13" r="3.500" />
  </svg>
);

export const ShieldCheckIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3l7 3v5.500c0 4.400-3 7.800-7 9.500-4-1.700-7-5.100-7-9.500V6l7-3Z" />
    <path d="m9 12 2.200 2.200L15.500 10" />
  </svg>
);

export const WalletIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M4 7.500A2.500 2.500 0 0 1 6.500 5H18v3" />
    <rect x="3.500" y="8" width="17" height="11" rx="2.500" />
    <circle cx="16.500" cy="13.500" r="1.200" />
  </svg>
);

export const CheckIcon = (p) => (
  <svg {...base} strokeWidth={2.4} {...p}>
    <path d="m5 12.500 4.500 4.500L19 7.500" />
  </svg>
);

export const CloseIcon = (p) => (
  <svg {...base} strokeWidth={2.4} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const AlertIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 4 2.800 19.500h18.400L12 4Z" />
    <path d="M12 10v4.500M12 17.200h.01" />
  </svg>
);

export const UploadIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 16V5m0 0-4 4m4-4 4 4M5 16v3h14v-3" />
  </svg>
);
