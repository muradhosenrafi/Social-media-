import LanguageSwitcher from "./LanguageSwitcher";
import { DiscordIcon, TelegramIcon, WhatsAppIcon } from "@/components/ui/Icons";

const NUMBER = "01810456068";

const contacts = [
  { name: "Telegram", Icon: TelegramIcon, href: "https://t.me/+8801810456068" },
  { name: "WhatsApp", Icon: WhatsAppIcon, href: "https://wa.me/8801810456068" },
  { name: "Discord", Icon: DiscordIcon, href: null },
];

export default function TopContactBar() {
  return (
    <div className="bg-maroon-900 text-white">
      <div className="mx-auto flex h-12 max-w-[1440px] items-center gap-4 px-4 text-sm lg:px-6">
        <ul className="flex flex-1 items-center justify-around gap-3">
          {contacts.map(({ name, Icon, href }) => {
            const content = (
              <>
                <Icon className="h-7 w-7" />
                <span className="hidden sm:inline">{NUMBER}</span>
              </>
            );
            return (
              <li key={name}>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${name} ${NUMBER}`}
                    className="flex items-center gap-2 rounded-full hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  >
                    {content}
                  </a>
                ) : (
                  <span aria-label={`${name} ${NUMBER}`} className="flex items-center gap-2">
                    {content}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
        <LanguageSwitcher />
      </div>
    </div>
  );
}