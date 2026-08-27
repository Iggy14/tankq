import type { Localized } from "./localized";

/**
 * Optional, per-product content blocks rendered below the gallery on a detail
 * page.
 *
 * Products differ in what they need to show — one wants a size table, the next
 * a datasheet download, another a chart — so instead of a bespoke page per
 * product, each product declares an ordered list of sections and
 * <ProductSections> maps every `type` to a component.
 *
 * To add a kind of section: add a member to this union, then handle it in
 * `src/components/product-sections/index.tsx`. The switch there is exhaustive,
 * so TypeScript flags the missing branch for you.
 */

/**
 * A table of specifications — capacities, dimensions, weights.
 *
 * Every cell is localized, because a Thai row may spell out units or use Thai
 * numerals even when the English row is plain digits. Rows are rendered in the
 * order given, and each row must have the same number of cells as `columns`.
 * The first cell of a row is treated as its row header.
 */
export interface SpecTableSection {
  type: "specTable";
  title: Localized;
  columns: Localized[];
  rows: Localized[][];
}

export type ProductSection = SpecTableSection;
