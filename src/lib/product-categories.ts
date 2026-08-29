import type { Localized } from "./localized";

/**
 * Product category data.
 *
 * Categories are the top-level grouping a product belongs to. Like the product
 * catalogue, the names are dynamic content: both locales live inline and are
 * read as `category.title[locale]`, not through next-intl.
 *
 * Every product in `src/lib/products.ts` carries a `categoryId` pointing at one
 * of the ids below. The ids are frozen into `ProductCategoryId`, so a product
 * naming a category that does not exist is a compile error.
 */

export interface ProductCategory {
  /** Stable identifier, referenced by `Product.categoryId`. */
  id: string;
  title: Localized;
  /** Manual sort order for category listings and filters. */
  order: number;
}

export const productCategories = [
  {
    id: "frp-vertical-water-tank",
    title: {
      th: "ถังเก็บน้ำไฟเบอร์กลาสทรงตั้ง",
      en: "FRP Vertical Water Tank",
    },
    order: 1,
  },
  {
    id: "frp-horizontal-water-tank",
    title: {
      th: "ถังเก็บน้ำไฟเบอร์กลาสทรงนอน",
      en: "FRP Horizontal Water Tank",
    },
    order: 2,
  },
  {
    id: "pe-water-tank",
    title: {
      th: "ถังเก็บน้ำ PE บนดิน/ใต้ดิน",
      en: "PE On Ground & Underground Water Tank",
    },
    order: 3,
  },
  {
    id: "frp-wastewater-treatment-tank",
    title: {
      th: "ถังบำบัดน้ำเสียไฟเบอร์กลาส",
      en: "FRP Wastewater Treatment Tank",
    },
    order: 4,
  },
  {
    id: "septic-tank-grease-trap",
    title: {
      th: "ถังบำบัดน้ำเสีย PE และถังดักไขมัน",
      en: "Septic Tank & Grease Trap",
    },
    order: 5,
  },
  {
    id: "epoxy-pu-flooring",
    title: {
      th: "พื้นอีพ็อกซี่และพื้นพียู",
      en: "Epoxy & PU Flooring",
    },
    order: 6,
  },
] as const satisfies readonly ProductCategory[];

/** One row of the array above, with its `id` narrowed to its own literal. */
export type ProductCategoryEntry = (typeof productCategories)[number];

/** Every id declared above, as a union - the type of `Product.categoryId`. */
export type ProductCategoryId = ProductCategoryEntry["id"];

/**
 * The full list in listing order.
 *
 * Returns the entries rather than the wider `ProductCategory`, so a caller
 * keying something off `category.id` - the listing page's icon map, say - gets
 * the `ProductCategoryId` union and not a bare `string`.
 */
export function getAllProductCategories(): readonly ProductCategoryEntry[] {
  return [...productCategories].sort((a, b) => a.order - b.order);
}

export function getProductCategoryById(
  id: ProductCategoryId,
): ProductCategoryEntry | undefined {
  return productCategories.find((category) => category.id === id);
}
