import { cache } from "react";

import type { Localized } from "./localized";
import { fetchWpCategories } from "./wp/catalogue";
import { isWpEnabled } from "./wp/client";

/**
 * Product category data.
 *
 * Categories are the top-level grouping a product belongs to. Like the product
 * catalogue, the names are dynamic content: both locales live inline and are
 * read as `category.title[locale]`, not through next-intl.
 *
 * Every product in `src/lib/products.ts` carries a `categoryId` pointing at one
 * of these. The list comes from WordPress when `WP_API_URL` is set and from the
 * array below otherwise, so the ids are plain strings: a product naming a
 * category that does not exist is no longer a compile error, it just matches no
 * category pill.
 */

export interface ProductCategory {
  /** Stable identifier, referenced by `Product.categoryId`. */
  id: string;
  title: Localized;
  /** Manual sort order for category listings and filters. */
  order: number;
}

export const productCategories: ProductCategory[] = [
  {
    id: "frp-water-tank",
    title: {
      th: "ถังเก็บน้ำไฟเบอร์กลาส",
      en: "FRP Water Tank",
    },
    order: 1,
  },
  {
    id: "pe-water-tank",
    title: {
      th: "ถังเก็บน้ำ PE",
      en: "PE Water Tank",
    },
    order: 2,
  },
  {
    id: "frp-wastewater-treatment-tank",
    title: {
      th: "ถังบำบัดน้ำเสียไฟเบอร์กลาส",
      en: "FRP Wastewater Treatment Tank",
    },
    order: 3,
  },
  {
    id: "pe-septic-tank-grease-trap",
    title: {
      th: "ถังบำบัดน้ำเสีย PE และถังดักไขมัน",
      en: "PE Septic Tank & Grease Trap",
    },
    order: 4,
  },
  {
    id: "epoxy-flooring",
    title: {
      th: "พื้นอีพ็อกซี่",
      en: "Epoxy Flooring",
    },
    order: 5,
  },
  {
    id: "polyurethane-concrete-flooring",
    title: {
      th: "พื้นพียู",
      en: "Polyurethane Concrete Flooring",
    },
    order: 6,
  },
  {
    id: "water-wastewater-treatment-system",
    title: {
      th: "ระบบน้ำดีและน้ำเสีย",
      en: "Water & Wastewater Treatment System",
    },
    order: 7,
  },
];

/** A category id: a WordPress post slug, or the `id` of a built-in row. */
export type ProductCategoryId = string;

const loadCategories = cache(
  async (): Promise<ProductCategory[]> =>
    isWpEnabled() ? fetchWpCategories() : productCategories,
);

/** The full list in listing order. */
export async function getAllProductCategories(): Promise<ProductCategory[]> {
  return [...(await loadCategories())].sort((a, b) => a.order - b.order);
}

export async function getProductCategoryById(
  id: ProductCategoryId,
): Promise<ProductCategory | undefined> {
  return (await loadCategories()).find((category) => category.id === id);
}
