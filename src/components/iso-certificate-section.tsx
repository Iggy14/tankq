import { Cylinder, Filter, Layers3, Waves } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { FadeInUp, FadeInUpGroup } from "@/components/fade-in-up";
import { Link } from "@/i18n/navigation";
import { categoryHref } from "@/lib/product-category-url";

/**
 * The four expertise cards, in display order. Each links straight to the
 * catalogue entry it represents rather than a decorative placeholder - see
 * `src/lib/product-categories.ts` and `src/lib/products.ts` for the ids.
 * Water storage spans three separate tank categories, so it points at the
 * unfiltered listing rather than any single one of them.
 */
const CARDS = [
  { key: "waterStorage", Icon: Cylinder, href: "/products" },
  {
    key: "wastewaterTreatment",
    Icon: Waves,
    href: "/products/wastewater-treatment-system",
  },
  {
    key: "waterTreatment",
    Icon: Filter,
    href: "/products/water-treatment-system",
  },
  {
    key: "industrialFlooring",
    Icon: Layers3,
    href: categoryHref("epoxy-pu-flooring"),
  },
] as const;

/**
 * Home page banner between the hero and `<WhyTankQ>`: the ISO 9001:2015
 * certificate over a treatment-plant photo, with the four expertise areas as
 * real, linkable cards rather than baked into a picture.
 */
export function IsoCertificateSection() {
  const t = useTranslations("home.isoCertificate");

  return (
    <section className="relative isolate flex w-full flex-col items-center overflow-hidden bg-navy text-navy-foreground">
      {/* Decorative - the heading and cards below carry the meaning. */}
      <div aria-hidden className="absolute inset-0 z-0">
        <Image
          src="/home/wastewater-treatment-plant.jpg"
          alt=""
          fill
          sizes="100vw"
          className="aspect-video object-cover"
        />
      </div>

      {/* Navy wash so the white copy and card outlines stay legible over the
          photo, plus the same corner gradient the hero band uses. */}
      <div aria-hidden className="absolute inset-0 z-10 bg-navy/75" />
      <div
        aria-hidden
        className="absolute inset-0 z-10 bg-linear-to-br from-primary/30 via-navy/10 to-navy/60"
      />

      <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-4 py-20 text-center sm:px-6 sm:py-24">
        <FadeInUp className="flex flex-col items-center gap-4">
          <h2 className="text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {t("title")}
          </h2>
          <p className="text-xl font-medium text-navy-foreground/80 sm:text-2xl">
            {t("subtitle")}
          </p>
        </FadeInUp>

        <FadeInUpGroup className="grid w-full grid-cols-2 gap-5 sm:gap-8 lg:grid-cols-4">
          {CARDS.map(({ key, Icon, href }) => (
            <FadeInUp key={key}>
              <Link
                href={href}
                className="flex h-full flex-col items-center justify-center gap-4 rounded-xl border border-white/25 bg-white/5 px-6 py-10 backdrop-blur-sm transition-colors hover:border-brand hover:bg-white/10 sm:py-14"
              >
                <Icon className="size-12 text-brand sm:size-14" aria-hidden />
                <span className="text-base font-bold text-balance sm:text-lg">
                  {t(`cards.${key}`)}
                </span>
              </Link>
            </FadeInUp>
          ))}
        </FadeInUpGroup>
      </div>
    </section>
  );
}
