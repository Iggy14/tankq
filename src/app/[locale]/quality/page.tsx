import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FadeInUp } from "@/components/fade-in-up";
import { QcChecklistTable } from "@/components/qc-checklist-table";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/quality">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quality" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function QualityPage({ params }: PageProps<"/[locale]/quality">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("quality");
  const tNav = await getTranslations("nav");

  return (
    <>
      <Breadcrumbs wide items={[{ label: tNav("quality") }]} />

      <section className="mx-auto w-full max-w-[88rem] flex-1 px-4 py-16 sm:px-6">
        <FadeInUp className="flex flex-col items-center text-center">
          <h1 className="text-3xl leading-[1] font-black tracking-tight text-primary uppercase sm:text-4xl md:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-sm font-medium text-muted-foreground dark:text-neutral-400 sm:text-base">
            {t("subtitle")}
          </p>
          <div className="mb-10 mt-8 h-px w-40 bg-neutral-500 sm:mb-14 sm:mt-10" />
        </FadeInUp>

        <FadeInUp>
          <h2 className="mt-12 text-center text-2xl font-bold tracking-tight text-foreground sm:mt-14 sm:text-3xl md:text-4xl">
            {t("processTitle")}
          </h2>
        </FadeInUp>

        <FadeInUp className="relative mt-10 aspect-[1672/941] w-full sm:mt-12">
          <Image
            src="/quality/production-process.png"
            alt={t("processImageAlt")}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </FadeInUp>

        <FadeInUp className="mt-16 sm:mt-20">
          <QcChecklistTable />
        </FadeInUp>
      </section>
    </>
  );
}
