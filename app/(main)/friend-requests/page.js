import PersonRow from "@/components/sidebar/PersonRow";
import { people } from "@/lib/mock-data";

export const metadata = {
  title: "Friend Requests · DateNexa",
};

export default function FriendRequestsPage() {
  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-bold text-ink">Friend Requests</h1>

      {people.length > 0 ? (
        <ul className="space-y-3 rounded-2xl border border-ink/10 bg-white p-4 shadow-sm sm:p-6">
          {people.map((person) => (
            <li key={person.id}>
              <PersonRow person={person} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-2xl border border-ink/10 bg-white p-6 text-sm text-ink/60">
          No friend requests yet.
        </p>
      )}
    </section>
  );
}
