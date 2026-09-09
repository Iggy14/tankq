import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactHero } from "@/components/contact-hero";
import { ContactPrepare } from "@/components/contact-prepare";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tNav = await getTranslations("nav");
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <>
      <Breadcrumbs items={[{ label: tNav("contact") }]} />
      <ContactHero />
      <p className="px-4 pt-10 pb-8 text-center text-lg font-medium text-navy dark:text-white sm:pt-12 sm:pb-10">
        {t("engineerReply")}
      </p>
      <ContactPrepare />
    </>
  );
}
