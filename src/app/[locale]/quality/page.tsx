import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumbs } from "@/components/breadcrumbs";

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
      <Breadcrumbs items={[{ label: tNav("quality") }]} />

      <section className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">{t("subtitle")}</p>
      </section>
    </>
  );
}
