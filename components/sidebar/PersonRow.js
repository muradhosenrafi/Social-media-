import Link from "next/link";
import Avatar from "@/components/ui/Avatar";

export default function PersonRow({ person }) {
  return (
    <Link
      href={`/profile/${person.username}`}
      className="flex items-center gap-4 rounded-xl py-1 transition hover:text-maroon-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200"
    >
      <Avatar size={52} tone="soft" src={person.avatar} name={person.name} />
      <span className="text-[17px] font-bold">{person.name}</span>
    </Link>
  );
}