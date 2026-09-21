import { productCategories, type ProductCategoryId } from "./product-categories";
import { getProductsByCategory } from "./products";

/**
 * The `?category=` contract for the products listing page.
 *
 * The listing filter is driven by the URL rather than component state, because
 * the header's Products dropdown has to link into a preselected category from
 * anywhere on the site. Three components read this module - the filter pills,
 * the header dropdown and the mobile menu - so it lives in `src/lib` rather
 * than inside any one of them.
 */

/** The query key. Spelled once, here. */
export const CATEGORY_PARAM = "category";

/** What the listing page is currently showing. */
export type ActiveCategory = ProductCategoryId | "all";

function isProductCategoryId(value: string): value is ProductCategoryId {
  return productCategories.some((category) => category.id === value);
}

/**
 * Reads a raw query value into a selection.
 *
 * Anything unrecognised - a typo, a stale link, a removed category - falls back
 * to "all" rather than leaving the visitor on an empty grid.
 */
export function parseActiveCategory(
  value: string | null | undefined,
): ActiveCategory {
  return value && isProductCategoryId(value) ? value : "all";
}

/**
 * The listing-page href for a selection, in the shape next-intl's `Link` takes.
 *
 * "all" is a bare string on purpose: next-intl serializes a `query` object
 * unconditionally, so an empty one would leave a trailing "?" on the URL.
 */
export function productsHref(category: ActiveCategory) {
  return category === "all"
    ? "/products"
    : { pathname: "/products", query: { [CATEGORY_PARAM]: category } };
}

/**
 * Where a category link should go. A category with exactly one product skips
 * the listing and points at that product's detail page; anything else (several
 * products, or none, which still shows `products.emptyCategory`) filters the
 * listing as usual. Resolved at build time from static data, so the link stays
 * a plain crawlable href.
 */
export function categoryHref(category: ProductCategoryId) {
  const inCategory = getProductsByCategory(category);
  return inCategory.length === 1
    ? `/products/${inCategory[0].slug}`
    : productsHref(category);
}
