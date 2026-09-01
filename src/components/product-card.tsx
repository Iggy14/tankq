import Image from "next/image";
import { useLocale } from "next-intl";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
 * One catalogue entry: cover image with its title and a two-line description
 * centred underneath, the whole tile linking through to the detail page.
 *
 * Nothing but the picture and the words shows at rest; the card shell - a
 * primary-blue ring and a shadow tinted the same, for the water read - fades
 * in on hover. Padding is constant in both states, so the shell appears around
 * the tile without moving it.
 *
 * Shared by the homepage's featured row, the products listing and the
 * "other products" strip, so all three stay identical by construction. Titles
 * and descriptions come from the data itself rather than the message files, so
 * they are read as `product.title[locale]`.
 */
export function ProductCard({
  product,
  sizes = PRODUCT_CARD_SIZES,
  priority = false,
}: ProductCardProps) {
  const locale = toAppLocale(useLocale());

  return (
    <Link
      href={`/products/${product.slug}`}
      className="block h-full rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Card
        size="sm"
        className="h-full bg-transparent shadow-none ring-transparent transition-all duration-300 hover:-translate-y-1 hover:bg-card hover:shadow-lg hover:shadow-primary/25 hover:ring-primary/40"
      >
        <CardContent>
          {/* Its own frame rather than a direct child of Card: the recipe
              rounds only the top of a leading <img> for edge-to-edge covers,
              and this card wants the picture rounded all round. */}
          <div className="overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.images[0]}
              alt={product.title[locale]}
              width={640}
              height={480}
              sizes={sizes}
              priority={priority}
              className="aspect-4/3 w-full object-cover transition-transform duration-300 group-hover/card:scale-[1.03]"
            />
          </div>
        </CardContent>

        <CardHeader>
          <CardTitle className="text-center text-xl font-bold text-primary sm:text-2xl">
            {product.title[locale]}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-center leading-relaxed">
            {product.description[locale]}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
