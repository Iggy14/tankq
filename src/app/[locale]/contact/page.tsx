import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactHero } from "@/components/contact-hero";

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
      <p className="px-4 py-10 text-center text-lg font-medium text-navy sm:py-12">
        {t("engineerReply")}
      </p>
    </>
  );
}
