import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { BannerCarousel } from "@/components/banner-carousel";
import { FeaturedProducts } from "@/components/featured-products";
import { Hero } from "@/components/hero";
import { IsoCertificateSection } from "@/components/iso-certificate-section";
import { SocialLinks } from "@/components/social-links";
import { WhyTankQ } from "@/components/why-tankq";
import { pageMetadata } from "@/lib/site";

// Localized <title>/<description> — the layout appends "| TankQ".
export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return pageMetadata({
    locale,
    pathname: "",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />

      <BannerCarousel />

      <IsoCertificateSection />

      <WhyTankQ />

      <FeaturedProducts />

      <SocialLinks />
    </>
  );
}
