import type { Localized } from "./localized";
import {
  getAllProductCategories,
  type ProductCategoryId,
} from "./product-categories";
import { getAllProducts } from "./products";

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

/**
 * Reads a raw query value into a selection, given the ids that exist.
 *
 * Anything unrecognised - a typo, a stale link, a removed category - falls back
 * to "all" rather than leaving the visitor on an empty grid. The valid ids are
 * passed in because they come from the CMS, so this stays a pure function a
 * client component can call.
 */
export function parseActiveCategory(
  value: string | null | undefined,
  validIds: readonly string[],
): ActiveCategory {
  return value && validIds.includes(value) ? value : "all";
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
 * listing as usual. Pass the products in that category.
 */
export function categoryHref(
  category: ProductCategoryId,
  inCategory: readonly { slug: string }[],
) {
  return inCategory.length === 1
    ? `/products/${inCategory[0].slug}`
    : productsHref(category);
}

/** One category as the pills and menus need it: label data and a ready href. */
export interface CategoryLink {
  id: ProductCategoryId;
  title: Localized;
  href: ReturnType<typeof categoryHref>;
}

/**
 * Every category with its href, in listing order. Resolved on the server and
 * handed down as plain data, since the filter pills are a client component and
 * cannot read the catalogue themselves.
 */
export async function getCategoryLinks(): Promise<CategoryLink[]> {
  const [categories, products] = await Promise.all([
    getAllProductCategories(),
    getAllProducts(),
  ]);

  return categories.map((category) => ({
    id: category.id,
    title: category.title,
    href: categoryHref(
      category.id,
      products.filter((product) => product.categoryId === category.id),
    ),
  }));
}
