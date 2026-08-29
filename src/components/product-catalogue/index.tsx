"use client";

import { useSearchParams } from "next/navigation";

import {
  CATEGORY_PARAM,
  parseActiveCategory,
} from "@/lib/product-category-url";
import type { Product } from "@/lib/products";

import { CatalogueView } from "./catalogue-view";

// Re-exported so the page can prerender the unfiltered view as this component's
// Suspense fallback without reaching past the folder boundary.
export { CatalogueView };

type ProductCatalogueProps = {
  /** The full catalogue, in listing order - the page passes `getAllProducts()`. */
  products: Product[];
};

/**
 * The listing page's filter row and grid, driven by `?category=`.
 *
 * The URL is the single source of truth so the header's Products dropdown can
 * link straight into a category from anywhere on the site, and so the back
 * button and a shared link both do the obvious thing.
 *
 * `useSearchParams` suspends while the route is prerendered, so the page wraps
 * this in a `<Suspense>` whose fallback is the same view at "all". That keeps
 * the whole grid in the build-time HTML instead of a skeleton. `useSearchParams`
 * is locale-agnostic, hence `next/navigation` rather than `@/i18n/navigation`.
 */
export function ProductCatalogue({ products }: ProductCatalogueProps) {
  const active = parseActiveCategory(useSearchParams().get(CATEGORY_PARAM));

  return <CatalogueView products={products} active={active} />;
}
