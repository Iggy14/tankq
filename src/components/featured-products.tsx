import Image from "next/image";
import { hasLocale, useLocale, useTranslations } from "next-intl";

import { FadeInUp, FadeInUpGroup } from "@/components/fade-in-up";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getFeaturedProducts } from "@/lib/products";

/** Anchor target for the hero's "Products" button. */
export const FEATURED_PRODUCTS_ID = "products";

/**
 * The featured slice of the catalogue, three across one row on desktop.
 *
 * Only the cover image (`images[0]`) is shown here; the rest belong to the
 * detail page. Titles and descriptions come from the data itself rather than
 * the message files, so they are read as `product.title[locale]`.
 */
export function FeaturedProducts() {
  const t = useTranslations("home.products");
  const locale = useLocale();
  // Narrows the request locale to the two we actually ship copy for, without a
  // cast — an unknown locale would never reach here past the layout's guard.
  const activeLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;

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
          <h2 className="text-center text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
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
              <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-foreground/25">
                {/* Direct child of Card on purpose: the recipe rounds and
                    unpads a leading <img> for edge-to-edge covers. */}
                <Image
                  src={product.images[0]}
                  alt={product.title[activeLocale]}
                  width={640}
                  height={480}
                  sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 90vw"
                  className="aspect-4/3 w-full bg-muted object-cover transition-transform duration-300 group-hover/card:scale-[1.03]"
                />

                <CardHeader>
                  <CardTitle className="text-lg">
                    {product.title[activeLocale]}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1">
                  <CardDescription className="line-clamp-3 leading-relaxed">
                    {product.description[activeLocale]}
                  </CardDescription>
                </CardContent>

                <CardFooter>
                  {/* No destination yet — the detail route is still to come. */}
                  <Button variant="outline" size="sm">
                    {t("viewDetail")}
                  </Button>
                </CardFooter>
              </Card>
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
