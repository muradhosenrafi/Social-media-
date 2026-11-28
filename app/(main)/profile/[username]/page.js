import { notFound } from "next/navigation";
import ProfilePosts from "@/components/profile/ProfilePosts";
import ProfileComposer from "@/components/profile/ProfileComposer";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { currentUser, getProfile } from "@/lib/mock-data";

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

  return (
    <div className="space-y-6">
      <ProfileHeader profile={profile} isOwner={isOwner} />
      <ProfileTabs profile={profile} />
      {isOwner && <ProfileComposer user={currentUser} />}

      <ProfilePosts username={profile.username} />
    </div>
  );
}
