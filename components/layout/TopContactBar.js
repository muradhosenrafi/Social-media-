import LanguageSwitcher from "./LanguageSwitcher";
import { DiscordIcon, TelegramIcon, WhatsAppIcon } from "@/components/ui/Icons";

const contacts = [
  { name: "Telegram", Icon: TelegramIcon, href: "https://t.me/+8801810456068" },
  { name: "WhatsApp", Icon: WhatsAppIcon, href: "https://wa.me/8801810456068" },
  { name: "Discord", Icon: DiscordIcon, href: "https://discord.com/app" },
];

export default function TopContactBar() {
  return (
    <div className="bg-maroon-900 text-white">
      <div className="mx-auto flex h-12 max-w-[1440px] items-center justify-between gap-4 px-4 text-sm lg:px-6">
        <ul className="flex items-center gap-2">
          {contacts.map(({ name, Icon, href }) => {
            return (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  title={name}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </li>
            );
          })}
        </ul>
        <LanguageSwitcher />
      </div>
    </div>
  );
}
