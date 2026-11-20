import PostCard from "@/components/feed/PostCard";
import PostComposer from "@/components/feed/PostComposer";
import StoriesRow from "@/components/feed/StoriesRow";
import { currentUser, posts, stories } from "@/lib/mock-data";

export const metadata = {
  title: "Home · DateFlow",
};

export default function HomePage() {
  return (
    <div className="space-y-6">
      <PostComposer user={currentUser} />
      <StoriesRow stories={stories} />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}