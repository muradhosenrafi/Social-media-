import Image from "next/image";

/*
  DateNexa লোগো। লাইট ও ডার্ক দুই ভার্সন আছে, থিম অনুযায়ী নিজে বদলায়।
  forceLight: সাদা কার্ডের ওপর (যেমন লগইন পেজ) সবসময় লাইট ভার্সন দেখাবে।
*/
export default function Wordmark({ className = "h-8", forceLight = false, priority = false }) {
  return (
    <>
      <Image
        src="/datenexa-wordmark.png"
        alt="DateNexa"
        width={640}
        height={107}
        priority={priority}
        className={`${forceLight ? "" : "logo-light"} w-auto ${className}`}
      />
      {!forceLight && (
        <Image
          src="/datenexa-wordmark-dark.png"
          alt=""
          aria-hidden="true"
          width={640}
          height={107}
          className={`logo-dark w-auto ${className}`}
        />
      )}
    </>
  );
}