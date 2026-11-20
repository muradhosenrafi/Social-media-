import { PersonIcon } from "./Icons";

const tones = {
  user: "bg-[#8a7373] text-white/90",
  soft: "bg-[#d9d9d9] text-[#9b8f8f]",
};

export default function Avatar({ src, name = "", size = 44, tone = "user", className = "" }) {
  return (
    <span
      style={{ width: size, height: size }}
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ${tones[tone]} ${className}`}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <PersonIcon style={{ width: size * 0.58, height: size * 0.58 }} />
      )}
    </span>
  );
}