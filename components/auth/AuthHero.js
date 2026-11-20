import { ChatIcon, HeartIcon, LogoMark, StarIcon } from "./Icons";

const features = [
  { text: "Discover amazing people", Icon: HeartIcon, tone: "bg-[#ec407a]" },
  { text: "Chat and make friends", Icon: ChatIcon, tone: "bg-[#c2185b]" },
  { text: "Find your soulmate", Icon: StarIcon, tone: "bg-[#f48fb1]" },
];

export default function AuthHero() {
  return (
    <aside className="relative hidden overflow-hidden bg-linear-to-b from-[#ffe3ef] via-[#ffeef5] to-[#ffd3e6] md:block">
      <div className="relative z-10 px-10 pt-14 lg:px-14">
        <div className="flex items-center gap-2">
          <LogoMark className="h-10 w-11" />
          <span className="text-[28px] font-bold tracking-tight text-[#1b1035]">
            Date<span className="text-[#e91e63]">Flow</span>
          </span>
        </div>

        <h1 className="mt-14 text-[44px] font-bold leading-[1.1] tracking-tight text-[#1b1035] lg:text-5xl">
          Find Your
          <br />
          Perfect Match
        </h1>
        <span className="mt-4 block h-1 w-36 rounded-full bg-linear-to-r from-[#f0508a] to-transparent" />
        <p className="mt-6 text-lg text-[#2a2140]">Connect. Chat. Fall in Love.</p>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 top-[40%] bg-cover bg-top bg-no-repeat [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
        style={{ backgroundImage: "url('/images/auth-couple.png')" }}
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#ffc2dc] to-transparent" aria-hidden />

      <ul className="absolute bottom-10 left-10 z-10 space-y-3.5 lg:left-14">
        {features.map(({ text, Icon, tone }) => (
          <li key={text} className="flex items-center gap-3 text-[17px] text-[#2a2140]">
            <span className={`flex h-9 w-9 items-center justify-center rounded-full text-white ${tone}`}>
              <Icon className="h-4 w-4" />
            </span>
            {text}
          </li>
        ))}
      </ul>
    </aside>
  );
}
