"use client";

import PostCard from "@/components/feed/PostCard";
import EmptyState from "@/components/profile/EmptyState";
import { usePosts } from "@/lib/posts-store";

export default function ProfilePosts({ username }) {
  const posts = usePosts().filter((post) => post.user.username === username);
  return (
    <section aria-label="Posts" className="space-y-6">
      {posts.length ? posts.map((post) => <PostCard key={post.id} post={post} />) : <EmptyState messageKey="profile.noPosts" />}
    </section>
  );
}
