import PageHeading from "@/components/settings/PageHeading";
import SecurityPanel from "@/components/settings/SecurityPanel";

export const metadata = { title: "Login and security | DateFlow" };

export default function SecurityPage() {
  return (
    <>
      <PageHeading id="security" />
      <SecurityPanel />
    </>
  );
}
