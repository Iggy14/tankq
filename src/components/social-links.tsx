import Image from "next/image";
import { useTranslations } from "next-intl";

import { FadeInUpGroup, FadeInUp } from "@/components/fade-in-up";
import { SOCIAL_LINKS } from "@/lib/social-links";

/**
 * Full-width "follow us" banners bracketing the icon row, in display order.
 * Both are fixed 3030x781 marketing graphics with their own baked-in
 * background (white for Instagram, black for Facebook) and copy, so they're
 * rendered edge-to-edge with no added padding or background of their own.
 * Sizing is a first pass — the user flagged they'll want to tune it further
 * once it's live.
 */
const FOLLOW_BANNERS = [
  {
    key: "instagram",
    href: "https://www.instagram.com/tankq.official/",
    src: "/images/socials/กดติดตามเพจวันนี้ (1).png",
  },
  {
    key: "facebook",
    href: "https://www.facebook.com/profile.php?id=61592899202754",
    src: "/images/socials/กดติดตามเพจวันนี้ (2).png",
  },
] as const;

/**
 * Home page "follow us" section: a full-width banner, the icon circles, then
 * a second full-width banner. Sits between the featured products and the
 * footer. More imagery is coming below this section later.
 */
export function SocialLinks() {
  const t = useTranslations("home.socials");

  return (
    <section className="flex w-full flex-col items-center py-16 sm:py-20">
      <FadeInUp className="w-full">
        <a
          href={FOLLOW_BANNERS[0].href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t(FOLLOW_BANNERS[0].key)}
          className="block w-full"
        >
          <Image
            src={FOLLOW_BANNERS[0].src}
            alt=""
            width={3030}
            height={781}
            sizes="100vw"
            className="h-auto w-full"
          />
        </a>
      </FadeInUp>

      <FadeInUpGroup className="flex items-center gap-6 px-4 py-10 sm:gap-8 sm:px-6 sm:py-12">
        {SOCIAL_LINKS.map((social) => (
          <FadeInUp key={social.key}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t(social.key)}
              className="flex size-16 items-center justify-center rounded-full bg-white p-4 shadow-md ring-1 ring-border transition-transform hover:scale-105 hover:shadow-lg sm:size-20 sm:p-5"
            >
              <Image
                src={social.src}
                alt=""
                width={48}
                height={48}
                className="size-full object-contain"
              />
            </a>
          </FadeInUp>
        ))}
      </FadeInUpGroup>

      <FadeInUp className="w-full">
        <a
          href={FOLLOW_BANNERS[1].href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t(FOLLOW_BANNERS[1].key)}
          className="block w-full"
        >
          <Image
            src={FOLLOW_BANNERS[1].src}
            alt=""
            width={3030}
            height={781}
            sizes="100vw"
            className="h-auto w-full"
          />
        </a>
      </FadeInUp>
    </section>
  );
}
