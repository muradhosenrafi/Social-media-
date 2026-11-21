import { notFound } from "next/navigation";
import PostCard from "@/components/feed/PostCard";
import EmptyState from "@/components/profile/EmptyState";
import ProfileComposer from "@/components/profile/ProfileComposer";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { currentUser, getProfile, posts } from "@/lib/mock-data";

export async function generateMetadata({ params }) {
  const { username } = await params;
  const profile = getProfile(username);
  return { title: profile ? `${profile.name} · DateNexa` : "Profile · DateNexa" };
}

export default async function ProfilePage({ params }) {
  const { username } = await params;
  const profile = getProfile(username);
  if (!profile) notFound();

  const isOwner = profile.username === currentUser.username;
  const userPosts = posts.filter((p) => p.user.username === profile.username);

  return (
    <div className="space-y-6">
      <ProfileHeader profile={profile} isOwner={isOwner} />
      <ProfileTabs profile={profile} />
      {isOwner && <ProfileComposer user={currentUser} />}

      <section aria-label="Posts" className="space-y-6">
        {userPosts.length > 0 ? (
          userPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <EmptyState messageKey="profile.noPosts" />
        )}
      </section>
    </div>
  );
}