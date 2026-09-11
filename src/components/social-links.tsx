import Image from "next/image";
import { useTranslations } from "next-intl";

import { FadeInUpGroup, FadeInUp } from "@/components/fade-in-up";
import { SOCIAL_LINKS } from "@/lib/social-links";

/**
 * Full-width "follow us" banners bracketing the icon row, in display order.
 * Both are marketing graphics with their own copy, rendered edge-to-edge
 * with no added padding or background of their own - the site's own
 * background shows through around the artwork.
 */
const FOLLOW_BANNERS = [
  {
    key: "instagram",
    href: "https://www.instagram.com/tankq.official/",
    src: "/images/socials/กดติดตามเพจวันนี้ (1)-v4.webp",
    width: 2941,
    height: 781,
  },
  {
    key: "facebook",
    href: "https://www.facebook.com/profile.php?id=61592899202754",
    src: "/images/socials/กดติดตามเพจวันนี้ (2).webp",
    width: 2200,
    height: 567,
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
            width={FOLLOW_BANNERS[0].width}
            height={FOLLOW_BANNERS[0].height}
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
              className="flex size-16 items-center justify-center overflow-hidden rounded-[22%] transition-transform hover:scale-105 sm:size-20"
            >
              <Image
                src={social.src}
                alt=""
                width={80}
                height={80}
                className="size-full object-cover"
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
            width={FOLLOW_BANNERS[1].width}
            height={FOLLOW_BANNERS[1].height}
            sizes="100vw"
            className="h-auto w-full"
          />
        </a>
      </FadeInUp>
    </section>
  );
}
