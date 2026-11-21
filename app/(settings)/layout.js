import FloatingChat from "@/components/layout/FloatingChat";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import NoticeBanner from "@/components/layout/NoticeBanner";
import TopContactBar from "@/components/layout/TopContactBar";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";

export default function SettingsLayout({ children }) {
  return (
    <LanguageProvider>
      <div className="min-h-screen overflow-x-hidden bg-surface text-ink">
        <TopContactBar />
        <NoticeBanner />
        <Header />

        <div className="lg:flex lg:min-h-[calc(100vh-10rem)]">
          <SettingsSidebar />
          <main className="min-w-0 flex-1 px-4 pb-28 pt-6 lg:px-12 lg:pb-12 lg:pt-10">
            <div className="mx-auto w-full max-w-xl space-y-6">{children}</div>
          </main>
        </div>

        <MobileNav />
        <FloatingChat />
      </div>
    </LanguageProvider>
  );
}
