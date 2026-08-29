import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FadeInUp, FadeInUpGroup } from "@/components/fade-in-up";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { ProductSections } from "@/components/product-sections";
import { ProductSpecs } from "@/components/product-specs";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { toAppLocale } from "@/i18n/locale";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";

// The catalogue is static data, so every detail page is prerendered. The
// parent [locale] segment supplies the locale half of each pair.
export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/products/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  const activeLocale = toAppLocale(locale);

  return {
    title: product.title[activeLocale],
    description: product.description[activeLocale],
  };
}

export default async function ProductDetailPage({
  params,
}: PageProps<"/[locale]/products/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const activeLocale = toAppLocale(locale);
  const t = await getTranslations("products");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  const related = getRelatedProducts(product.slug);

  return (
    <>
      <Breadcrumbs
        wide
        items={[
          { label: tNav("products"), href: "/products" },
          { label: product.title[activeLocale] },
        ]}
      />

      <article className="mx-auto w-full max-w-[88rem] flex-1 px-4 py-12 sm:px-6 sm:py-16">
        <FadeInUpGroup className="flex flex-col items-center gap-6 text-center">
          <FadeInUp>
            <h1 className="text-3xl font-semibold tracking-tight text-balance text-primary sm:text-4xl">
              {product.title[activeLocale]}
            </h1>
          </FadeInUp>

          <FadeInUp>
            <p className="max-w-3xl text-base leading-relaxed text-pretty text-muted-foreground">
              {product.description[activeLocale]}
            </p>
          </FadeInUp>

          {product.specs && product.specs.length > 0 && (
            <FadeInUp>
              <ProductSpecs specs={product.specs} locale={activeLocale} />
            </FadeInUp>
          )}

          <FadeInUp>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                nativeButton={false}
                role="link"
                render={<Link href="/contact" />}
              >
                {tCommon("ctaButton")}
              </Button>
              <Button
                variant="outline"
                size="lg"
                nativeButton={false}
                role="link"
                render={<Link href="/products" />}
              >
                {t("backToProducts")}
              </Button>
            </div>
          </FadeInUp>
        </FadeInUpGroup>

        <FadeInUp className="mt-12 sm:mt-16">
          <ProductGallery
            images={product.images}
            alt={product.title[activeLocale]}
          />
        </FadeInUp>

        {product.sections && product.sections.length > 0 && (
          <FadeInUpGroup className="mt-20 flex flex-col gap-20">
            <ProductSections sections={product.sections} locale={activeLocale} />
          </FadeInUpGroup>
        )}

        {related.length > 0 && (
          <section className="mt-20 border-t border-border pt-12">
            <FadeInUp>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {t("relatedTitle")}
              </h2>
            </FadeInUp>

            <FadeInUpGroup className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <FadeInUp key={item.id} className="h-full">
                  <ProductCard product={item} />
                </FadeInUp>
              ))}
            </FadeInUpGroup>
          </section>
        )}
      </article>
    </>
  );
}
