import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FadeInUp } from "@/components/fade-in-up";
import {
  CatalogueView,
  ProductCatalogue,
} from "@/components/product-catalogue";
import { getAllProducts } from "@/lib/products";
import { pageMetadata } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/products">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });

  return pageMetadata({
    locale,
    pathname: "/products",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
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
      <Breadcrumbs
        wide
        items={[{ label: tNav("products"), href: "/products" }]}
      />

      <section className="mx-auto w-full max-w-[88rem] flex-1 px-4 py-16 sm:px-6">
        <FadeInUp className="flex flex-col items-center text-center">
          <h1 className="text-4xl leading-[0.95] font-black tracking-tight text-primary uppercase sm:text-5xl md:text-6xl lg:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-3xl whitespace-pre-line text-pretty text-sm text-muted-foreground sm:text-base">
            {t("subtitle")}
          </p>
        </FadeInUp>

        {/* ProductCatalogue reads `?category=`, which suspends during the
            prerender. The fallback is the same view at "all", so the build-time
            HTML carries every card and pill rather than a skeleton, and a visit
            with no query renders identically before and after hydration. */}
        <Suspense fallback={<CatalogueView products={allProducts} active="all" />}>
          <ProductCatalogue products={allProducts} />
        </Suspense>
      </section>
    </>
  );
}
