import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { FeaturedProducts } from "@/components/featured-products";
import { FeaturedProjects } from "@/components/featured-projects";
import { Hero } from "@/components/hero";
import { SocialLinks } from "@/components/social-links";
import { WhyTankQ } from "@/components/why-tankq";

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

  return (
    <>
      <Hero />

      <WhyTankQ />

      <FeaturedProducts />

      <FeaturedProjects />

      <SocialLinks />
    </>
  );
}
