import PageHeading from "@/components/settings/PageHeading";
import PaymentPanel from "@/components/settings/PaymentPanel";

export const metadata = { title: "Payment | DateFlow" };

export default function PaymentPage() {
  return (
    <>
      <PageHeading id="payment" />
      <PaymentPanel />
    </>
  );
}
