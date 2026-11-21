import PostCard from "@/components/feed/PostCard";
import PostComposer from "@/components/feed/PostComposer";
import StoriesRow from "@/components/feed/StoriesRow";
import ListingPostLink from "@/components/feed/ListingPostLink";
import { currentUser, posts, stories } from "@/lib/mock-data";

export const metadata = {
  title: "Home · DateNexa",
};

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-6">
      <div className="space-y-6">
        <PostComposer user={currentUser} />
        <ListingPostLink />
        <StoriesRow stories={stories} />
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
