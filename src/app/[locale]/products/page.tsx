import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FadeInUp, FadeInUpGroup } from "@/components/fade-in-up";
import { ProductCard } from "@/components/product-card";
import { getAllProducts } from "@/lib/products";

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

export default async function ProductsPage({
  params,
}: PageProps<"/[locale]/products">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("products");
  const tNav = await getTranslations("nav");

  const allProducts = getAllProducts();

  return (
    <>
      <Breadcrumbs wide items={[{ label: tNav("products") }]} />

      <section className="mx-auto w-full max-w-[88rem] flex-1 px-4 py-16 sm:px-6">
        <FadeInUp className="flex flex-col items-center text-center">
          <h1 className="text-4xl leading-[0.95] font-black tracking-tight text-primary uppercase sm:text-5xl md:text-6xl lg:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-md text-pretty text-sm text-muted-foreground sm:text-base">
            {t("subtitle")}
          </p>
        </FadeInUp>

        <FadeInUpGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allProducts.map((product, index) => (
            <FadeInUp key={product.id} className="h-full">
              {/* The first row is above the fold on most desktops. */}
              <ProductCard product={product} priority={index < 3} />
            </FadeInUp>
          ))}
        </FadeInUpGroup>
      </section>
    </>
  );
}
