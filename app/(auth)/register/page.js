import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AuthHero from "@/components/auth/AuthHero";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Create Your Account · DateFlow",
};

export default async function RegisterPage() {
  const cookieStore = await cookies();
  if (cookieStore.get("age_verified")?.value !== "1") {
    redirect("/age");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-b from-[#ffeaf3] to-[#fbe3f1] p-4 sm:p-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-[0_30px_80px_-30px_rgba(214,32,107,0.35)] md:min-h-[780px] md:grid-cols-[0.78fr_1fr]">
        <AuthHero />
        <section className="relative flex items-center px-6 py-12 sm:px-10 md:px-12">
          <RegisterForm />
        </section>
      </div>
    </main>
  );
}