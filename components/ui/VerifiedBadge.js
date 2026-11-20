import { StarIcon } from "./Icons";

export default function VerifiedBadge({ size = 16 }) {
  return (
    <span title="Verified" className="inline-flex shrink-0 text-[#1d7cf2]">
      <StarIcon style={{ width: size, height: size }} />
      <span className="sr-only">Verified</span>
    </span>
  );
}