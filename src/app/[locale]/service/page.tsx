import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FadeInUp } from "@/components/fade-in-up";
import { ServiceSections } from "@/components/service-sections";
import { toAppLocale } from "@/i18n/locale";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/service">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "service" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ServicePage({ params }: PageProps<"/[locale]/service">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const activeLocale = toAppLocale(locale);
  const t = await getTranslations("service");
  const tNav = await getTranslations("nav");

  return (
    <>
      <Breadcrumbs wide items={[{ label: tNav("service") }]} />

      <section className="mx-auto w-full max-w-[88rem] flex-1 px-4 py-16 sm:px-6">
        <FadeInUp className="flex flex-col items-center text-center">
          <h1 className="text-3xl leading-[1] font-black tracking-tight text-primary uppercase sm:text-4xl md:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-sm text-muted-foreground sm:text-base">
            {t("subtitle")}
          </p>
          <div className="mt-8 mb-14 h-px w-40 bg-neutral-500 sm:mt-10" />
        </FadeInUp>
      </section>

      <ServiceSections locale={activeLocale} />
    </>
  );
}
