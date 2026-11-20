import PageHeading from "@/components/settings/PageHeading";
import ProfileForm from "@/components/settings/ProfileForm";
import VerificationTile from "@/components/settings/VerificationTile";

export const metadata = { title: "Settings | DateFlow" };

export default function SettingsHomePage() {
  return (
    <>
      <PageHeading id="home" />
      <VerificationTile />
      <ProfileForm />
    </>
  );
}
