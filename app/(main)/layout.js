import FloatingChat from "@/components/layout/FloatingChat";
import LeftSidebar from "@/components/layout/LeftSidebar";
import MobileNav from "@/components/layout/MobileNav";
import Navbar from "@/components/layout/Navbar";
import NoticeBanner from "@/components/layout/NoticeBanner";
import TopContactBar from "@/components/layout/TopContactBar";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";

export default function MainLayout({ children }) {
  return (
    <LanguageProvider>
      <div className="min-h-screen overflow-x-hidden bg-white text-ink">
        <TopContactBar />
        <NoticeBanner />

        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-x-8 gap-y-5 px-4 pb-24 pt-5 lg:grid-cols-[240px_minmax(0,1fr)_180px] lg:px-6 lg:pb-5 xl:grid-cols-[260px_minmax(0,660px)_minmax(180px,1fr)]">
          {/* ডান কলাম: Navbar (ছোট স্ক্রিনে নিচের MobileNav-এ চলে যায়) */}
          <div className="order-1 hidden lg:col-start-3 lg:row-start-1 lg:block lg:sticky lg:top-4 lg:self-start">
            <Navbar />
          </div>

          {/* মাঝের কলাম: Feed */}
          <main className="order-2 min-w-0 lg:col-start-2 lg:row-start-1">{children}</main>

          {/* বাঁ কলাম: Sidebar (ছোট স্ক্রিনে লুকানো) */}
          <div className="order-3 hidden lg:col-start-1 lg:row-start-1 lg:block lg:sticky lg:top-4 lg:self-start">
            <LeftSidebar />
          </div>
        </div>

        <MobileNav />
        <FloatingChat />
      </div>
    </LanguageProvider>
  );
}