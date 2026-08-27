import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

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
import { toAppLocale } from "@/i18n/locale";
import type { Product } from "@/lib/products";

/** Three-up on desktop, two-up on tablet, full width on phones. */
export const PRODUCT_CARD_SIZES =
  "(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 90vw";

type ProductCardProps = {
  product: Product;
  /**
   * `next/image` sizes hint. Defaults to the three-column grid both the
   * homepage and the listing page use; override for a different layout.
   */
  sizes?: string;
  /** Set on above-the-fold cards so their cover is not lazy-loaded. */
  priority?: boolean;
};

/**
 * One catalogue entry: cover image, title, truncated description and a link
 * through to its detail page.
 *
 * Shared by the homepage's featured row, the products listing and the
 * "other products" strip, so all three stay identical by construction. Titles
 * and descriptions come from the data itself rather than the message files,
 * so they are read as `product.title[locale]`.
 */
export function ProductCard({
  product,
  sizes = PRODUCT_CARD_SIZES,
  priority = false,
}: ProductCardProps) {
  const t = useTranslations("products");
  const locale = toAppLocale(useLocale());

  return (
    <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-foreground/25">
      {/* Direct child of Card on purpose: the recipe rounds and unpads a
          leading <img> for edge-to-edge covers. */}
      <Image
        src={product.images[0]}
        alt={product.title[locale]}
        width={640}
        height={480}
        sizes={sizes}
        priority={priority}
        className="aspect-4/3 w-full bg-muted object-cover transition-transform duration-300 group-hover/card:scale-[1.03]"
      />

      <CardHeader>
        <CardTitle className="text-lg">{product.title[locale]}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        <CardDescription className="line-clamp-3 leading-relaxed">
          {product.description[locale]}
        </CardDescription>
      </CardContent>

      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          role="link"
          render={<Link href={`/products/${product.slug}`} />}
        >
          {/* Names the product for screen readers, which would otherwise hear
              a page full of identical "View detail" links. */}
          {t("viewDetail")}
          <span className="sr-only"> — {product.title[locale]}</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
