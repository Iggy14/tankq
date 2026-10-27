import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FadeInUp, FadeInUpGroup } from "@/components/fade-in-up";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { ProductSectionLinks } from "@/components/product-section-links";
import { ProductSections } from "@/components/product-sections";
import { ProductSpecs } from "@/components/product-specs";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { toAppLocale } from "@/i18n/locale";
import { getProductSections } from "@/lib/product-section-data";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import { absoluteUrl, pageMetadata, siteUrl } from "@/lib/site";

// Every product known at build time is prerendered. The parent [locale] segment
// supplies the locale half of each pair. A product added in the CMS later is
// rendered on its first request (`dynamicParams` is on by default).
export async function generateStaticParams() {
  return (await getAllProducts()).map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/products/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {};
  }

  const activeLocale = toAppLocale(locale);

  return pageMetadata({
    locale,
    pathname: `/products/${slug}`,
    title: product.title[activeLocale],
    description: product.description[activeLocale],
    image: product.images[0],
  });
}

export default async function ProductDetailPage({
  params,
}: PageProps<"/[locale]/products/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const activeLocale = toAppLocale(locale);
  const t = await getTranslations("products");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  const sections = getProductSections(product.id);
  const related = await getRelatedProducts(product.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title[activeLocale],
          description: product.description[activeLocale],
          image: product.images.map(absoluteUrl),
          url: `${siteUrl}/${locale}/products/${product.slug}`,
          brand: { "@type": "Brand", name: "TankQ" },
        }}
      />
      <Breadcrumbs
        wide
        items={[
          { label: tNav("products"), href: "/products" },
          {
            label: product.title[activeLocale],
            href: `/products/${product.slug}`,
          },
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

          {product.sectionLinks && product.sectionLinks.length > 0 && (
            <FadeInUp>
              <ProductSectionLinks
                links={product.sectionLinks}
                locale={activeLocale}
              />
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

        {!product.galleryInSections && (
          <FadeInUp className="mt-12 sm:mt-16">
            <ProductGallery
              images={product.images}
              alt={product.title[activeLocale]}
            />
          </FadeInUp>
        )}

        {sections.length > 0 && (
          <FadeInUpGroup className="mt-20 flex flex-col gap-20">
            <ProductSections sections={sections} locale={activeLocale} />
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
