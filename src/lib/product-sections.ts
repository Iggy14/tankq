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

/**
 * How each item in a <BulletListSection> is marked.
 *
 * `check` reads as a claim being ticked off - compliance, features, what the
 * product does for you. `dot` is the neutral bullet for a list that is simply
 * enumerating things and would overclaim with a tick.
 */
export type BulletMarker = "check" | "dot";

/**
 * A list of short, scannable points - compliance, options, services - each
 * rendered beside its `marker`.
 *
 * Items are single lines of copy, not paragraphs; keep them to a phrase so the
 * list stays a glance-and-go summary rather than a wall of prose.
 */
export interface BulletListSection {
  type: "bulletList";
  title: Localized;
  /** Ticks or plain bullets - see <BulletMarker>. */
  marker: BulletMarker;
  items: Localized[];
}

/**
 * A heading and a single body paragraph — the plain prose block for anything
 * that is simply told rather than tabulated or listed.
 *
 * One paragraph by design: a block that needs several is really several
 * sections, and stacking them keeps the spacing between blocks consistent.
 */
export interface ParagraphSection {
  type: "paragraph";
  title: Localized;
  body: Localized;
}

/**
 * One picture in an <ImageGridSection>.
 *
 * `alt` is localized and required — the drawings and photos in a grid carry
 * information (a capacity, a fitting), so an empty alt would drop it.
 */
export interface ImageGridItem {
  src: string;
  alt: Localized;
}

/**
 * A grid of pictures under a heading — standard designs, site photographs,
 * fitting options.
 *
 * Images are shown whole rather than cropped to fill, so a set that mixes
 * aspect ratios still reads; give the set a consistent shape where you can.
 */
export interface ImageGridSection {
  type: "imageGrid";
  title: Localized;
  images: ImageGridItem[];
}

export type ProductSection =
  | SpecTableSection
  | BulletListSection
  | ParagraphSection
  | ImageGridSection;
