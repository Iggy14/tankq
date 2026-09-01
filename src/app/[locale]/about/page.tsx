import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FeaturedProducts } from "@/components/featured-products";
import { OurMission } from "@/components/our-mission";
import { OurStory } from "@/components/our-story";
import { SocialLinks } from "@/components/social-links";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  return (
    <>
      <Breadcrumbs items={[{ label: tNav("about") }]} />

      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center px-4 pt-12 pb-16 text-center sm:px-6 sm:pt-16 sm:pb-20">
        <h1 className="text-4xl leading-[0.95] font-black tracking-tight text-primary uppercase sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">{t("heroLine1")}</span>
          <span className="block">
            {t("heroLine2")}{" "}
            {/* Outlined instead of filled, matching the reference's ghost
                "TEAM" treatment — stroke reads off `--primary` directly so
                it stays legible even though `color` itself is transparent. */}
            <span className="text-transparent [-webkit-text-stroke:1.5px_var(--primary)] sm:[-webkit-text-stroke:2px_var(--primary)]">
              {t("heroLine2Accent")}
            </span>
          </span>
        </h1>
        <p className="mt-6 max-w-lg text-lg text-muted-foreground sm:text-xl md:text-2xl">
          {t("heroSubtitle")}
        </p>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-6 sm:px-6 sm:pb-8">
        <Image
          src="/about/tank-lineup.png"
          alt={t("lineupAlt")}
          width={3292}
          height={1796}
          className="mx-auto h-auto w-full max-w-3xl"
        />
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <Image
          src="/brand/tankq-logo.png"
          alt={tCommon("companyName")}
          width={304}
          height={149}
          className="mx-auto h-16 w-auto sm:h-20"
        />
      </div>

      <OurStory />
      <OurMission />
      <FeaturedProducts />

      <SocialLinks />
    </>
  );
}
