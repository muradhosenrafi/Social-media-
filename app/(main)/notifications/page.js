import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import { people } from "@/lib/mock-data";

export const metadata = {
  title: "Notifications · DateFlow",
};

export default function NotificationsPage() {
  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-bold text-ink">Notifications</h1>
      {people.length > 0 ? (
        <ul className="space-y-3 rounded-2xl border border-ink/10 bg-white p-4 shadow-sm sm:p-6">
          {people.map((person) => (
            <li key={person.id}>
              <Link
                href={`/profile/${person.username}`}
                className="flex items-center gap-4 rounded-xl p-2 transition hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200"
              >
                <Avatar size={48} tone="soft" src={person.avatar} name={person.name} />
                <span className="text-ink">
                  <strong>{person.name}</strong> sent you a friend request.
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-2xl border border-ink/10 bg-white p-6 text-sm text-ink/60">
          You&apos;re all caught up.
        </p>
      )}
    </section>
  );
}
