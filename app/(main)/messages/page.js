import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import { chatContacts } from "@/lib/mock-data";

export const metadata = {
  title: "Messages · DateNexa",
};

export default function MessagesPage() {
  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-bold text-ink">Messages</h1>
      <ul className="space-y-3 rounded-2xl border border-ink/10 bg-white p-4 shadow-sm sm:p-6">
        {chatContacts.map((contact) => (
          <li key={contact.id}>
            <Link
              href={`/profile/${contact.name}`}
              className="flex items-center gap-4 rounded-xl p-2 transition hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-200"
            >
              <Avatar size={48} tone="soft" src={contact.avatar} name={contact.name} />
              <span className="font-semibold text-ink">{contact.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
