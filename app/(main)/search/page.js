import SearchResults from "@/components/search/SearchResults";
import { profiles } from "@/lib/mock-data";

export const metadata = { title: "Search · DateNexa" };

export default async function SearchPage({ searchParams }) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q)?.trim() ?? "";
  const needle = query.toLowerCase();

  // TODO: এখানে আসল ডেটাবেস/API থেকে খুঁজুন। এখন mock-data-র নাম ও ইউজারনেম মিলিয়ে দেখছে।
  const results = needle
    ? Object.values(profiles).filter(
        (p) => p.name.toLowerCase().includes(needle) || p.username.toLowerCase().includes(needle),
      )
    : [];

  return <SearchResults query={query} results={results} />;
}