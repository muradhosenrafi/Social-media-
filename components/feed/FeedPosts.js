"use client";

import PostCard from "@/components/feed/PostCard";
import { usePosts } from "@/lib/posts-store";

export default function FeedPosts() {
  const posts = usePosts();
  return posts.map((post) => <PostCard key={post.id} post={post} />);
}
