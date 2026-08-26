import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/products">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ProductsPage({ params }: PageProps<"/[locale]/products">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("products");

  return (
    <section className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-xl text-muted-foreground">{t("subtitle")}</p>

      {/* TODO: replace with the real water tank listing. */}
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <li
            key={n}
            className="rounded-lg border border-border bg-card p-6 text-card-foreground"
          >
            <p className="text-sm text-muted-foreground">Placeholder tank {n}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
