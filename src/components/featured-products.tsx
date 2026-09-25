import { useTranslations } from "next-intl";

import { FadeInUp, FadeInUpGroup } from "@/components/fade-in-up";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getFeaturedProducts } from "@/lib/products";

/** Anchor target for the hero's "Products" button. */
export const FEATURED_PRODUCTS_ID = "products";

/**
 * The featured slice of the catalogue, three across one row on desktop.
 *
 * Only the cover image (`images[0]`) is shown here; the rest belong to the
 * detail page. The card itself lives in <ProductCard>, shared with the
 * products listing.
 */
export function FeaturedProducts() {
  const t = useTranslations("home.products");

  const featured = getFeaturedProducts();

  return (
    // Matches the hero and "Why TankQ": one full screen minus the 4rem sticky
    // header. `scroll-mt-16` keeps the heading clear of that header when the
    // hero button jumps here.
    <section
      id={FEATURED_PRODUCTS_ID}
      className="flex min-h-[calc(100svh-4rem)] w-full scroll-mt-16 flex-col items-center justify-center px-4 py-20 sm:px-6"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <FadeInUp className="flex flex-col items-center gap-3">
          <h2 className="text-center text-4xl font-semibold tracking-tight text-balance text-primary sm:text-5xl">
            {t("title")}
          </h2>
          <p className="max-w-2xl text-center text-base text-pretty text-muted-foreground sm:text-lg">
            {t("subtitle")}
          </p>
        </FadeInUp>

        {/* One row of three on desktop, two-up on tablet, stacked on phones. */}
        <FadeInUpGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <FadeInUp key={product.id} className="h-full">
              <ProductCard product={product} />
            </FadeInUp>
          ))}
        </FadeInUpGroup>

        <FadeInUp className="flex justify-center">
          <Button
            size="lg"
            nativeButton={false}
            role="link"
            render={<Link href="/products" />}
          >
            {t("viewAll")}
          </Button>
        </FadeInUp>
      </div>
    </section>
  );
}
