import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { FadeInUp, FadeInUpGroup } from "@/components/fade-in-up";
import {
  FEATURED_PRODUCTS_ID,
  FeaturedProducts,
} from "@/components/featured-products";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { WhyTankQ } from "@/components/why-tankq";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

// Rotating hero backdrop; the component loops through these in order.
const heroImages = [
  "/hero/tankq-hero-1.jpg",
  "/hero/tankq-hero-2.jpg",
  "/hero/tankq-hero-3.jpg",
  "/hero/tankq-hero-4.jpg",
] as const;

// Localized <title>/<description> — the layout appends "| TankQ".
export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  return (
    <>
      {/* The hero fills the viewport minus the 4rem sticky header, so the page
          opens on one full screen. `isolate` keeps the slideshow's negative
          z-index inside this section instead of behind the page. */}
      <section className="relative isolate flex min-h-[calc(100svh-4rem)] w-full flex-col items-center justify-center overflow-hidden px-4 py-16 text-center sm:px-6">
        <HeroSlideshow images={heroImages} />

        {/* On load this is already on screen, so the cascade plays straight
            away — it carries the layout (flex/gap) the section used to hold. */}
        <FadeInUpGroup className="flex w-full flex-col items-center gap-6">
          <FadeInUp>
            <p className="text-sm font-medium tracking-[0.2em] text-white/75 uppercase sm:text-base">
              {t("home.heroEyebrow")}
            </p>
          </FadeInUp>

          <FadeInUp>
            <h1 className="text-6xl font-semibold tracking-tight text-balance text-white drop-shadow-lg sm:text-7xl lg:text-8xl">
              {t("home.heroTitle")}
            </h1>
          </FadeInUp>

          <FadeInUp>
            <p className="max-w-2xl text-base leading-relaxed text-pretty text-white/85 sm:text-lg">
              {t("home.heroSubtitle")}
            </p>
          </FadeInUp>

          <FadeInUp className="flex flex-wrap justify-center gap-3">
            {/* `render` is Base UI's composition prop (the equivalent of Radix's
              `asChild`); `nativeButton={false}` tells it the rendered element is
              an <a>, not a <button>. That shim also stamps role="button", so
              each CTA restores role="link" — these navigate, they don't act. */}
            {/* Same-page jump rather than a route change: it drops the visitor
              on the featured products further down. The smooth scroll comes
              from `scroll-behavior` in globals.css. */}
            <Button
              // Photography needs a light surface to read as the primary action;
              // the default near-black `primary` would sink into the backdrop.
              variant="secondary"
              size="lg"
              nativeButton={false}
              role="link"
              render={<a href={`#${FEATURED_PRODUCTS_ID}`} />}
            >
              {t("nav.products")}
              <ChevronDown aria-hidden />
            </Button>

            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              role="link"
              render={<Link href="/contact" />}
              // The theme's light/dark tokens have no "on top of a dark photo"
              // surface, so the glass treatment is spelled out here.
              className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
            >
              {t("common.ctaButton")}
            </Button>
          </FadeInUp>
        </FadeInUpGroup>
      </section>

      <WhyTankQ />

      <FeaturedProducts />
    </>
  );
}
