import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

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

  return (
    <section className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-xl text-muted-foreground">{t("subtitle")}</p>

    </section>
  );
}
