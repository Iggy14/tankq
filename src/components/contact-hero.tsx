import Image from "next/image";
import { useTranslations } from "next-intl";

import { FadeInUp } from "@/components/fade-in-up";

/**
 * Full-bleed photo band opening the contact page, matching the reference's
 * banner: a wide factory photo with the brand's navy wash cut in from the
 * left (same gradient direction the home hero uses) and "CONTACT US" set
 * large on top of it.
 */
export function ContactHero() {
  const t = useTranslations("contact");

  return (
    <section className="relative isolate w-full overflow-hidden bg-navy text-navy-foreground">
      <Image
        src="/contactus/contactus-logo.webp"
        alt={t("heroImageAlt")}
        width={1280}
        height={960}
        priority
        sizes="100vw"
        className="h-[260px] w-full object-cover object-center sm:h-[340px] lg:h-[420px]"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-r from-navy from-15% via-navy/70 via-45% to-navy/10"
      />

      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <FadeInUp>
            <h1 className="text-4xl leading-[0.95] font-black tracking-tight uppercase sm:text-5xl md:text-6xl lg:text-7xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-3 text-base font-medium text-navy-foreground/80 sm:text-lg">
              {t("title")}
            </p>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
