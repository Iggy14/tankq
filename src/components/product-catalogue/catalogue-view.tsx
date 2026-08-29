"use client";

import { useTranslations } from "next-intl";

import { FadeInUp, FadeInUpGroup } from "@/components/fade-in-up";
import { ProductCard } from "@/components/product-card";
import type { ActiveCategory } from "@/lib/product-category-url";
import type { Product } from "@/lib/products";

import { CategoryFilter } from "./category-filter";

type CatalogueViewProps = {
  /** The full catalogue, in listing order. */
  products: Product[];
  active: ActiveCategory;
};

/**
 * The filter row and the grid, for a given selection.
 *
 * A pure function of its props, with no idea where the selection came from.
 * That is what lets the page prerender it at "all" as the Suspense fallback
 * while the URL-reading version hydrates over the top - see `index.tsx`.
 */
export function CatalogueView({ products, active }: CatalogueViewProps) {
  const t = useTranslations("products");

  const visible =
    active === "all"
      ? products
      : products.filter((product) => product.categoryId === active);

  return (
    <>
      <FadeInUp className="mt-10">
        <CategoryFilter active={active} />
      </FadeInUp>

      {visible.length === 0 ? (
        <p
          role="status"
          className="mt-12 text-center text-sm text-muted-foreground"
        >
          {t("emptyCategory")}
        </p>
      ) : (
        <FadeInUpGroup
          // Remounts on every filter change. The group's viewport latch is
          // `once: true`, so without a fresh element the incoming cards would
          // snap in with no entrance.
          key={active}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((product, index) => (
            <FadeInUp key={product.id} className="h-full">
              {/* The first row is above the fold on most desktops. */}
              <ProductCard product={product} priority={index < 3} />
            </FadeInUp>
          ))}
        </FadeInUpGroup>
      )}
    </>
  );
}
