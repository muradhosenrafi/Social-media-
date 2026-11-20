import PageHeading from "@/components/settings/PageHeading";
import VerificationFlow from "@/components/settings/VerificationFlow";

export const metadata = { title: "Verification | DateFlow" };

export default function VerificationPage() {
  return (
    <>
      <PageHeading id="verification" />
      <VerificationFlow />
    </>
  );
}
