import type { Localized } from "./localized";

/**
 * Optional, per-product content blocks rendered below the gallery on a detail
 * page.
 *
 * Products differ in what they need to show — one wants a size table, the next
 * a datasheet download, another a chart — so instead of a bespoke page per
 * product, each product gets an ordered list of sections and
 * <ProductSections> maps every `type` to a component.
 *
 * This file is the shape only. The data lives in
 * `src/lib/product-section-data.ts`, keyed by `Product.id`.
 *
 * To add a kind of section: add a member to this union, then handle it in
 * `src/components/product-sections/index.tsx`. The switch there is exhaustive,
 * so TypeScript flags the missing branch for you.
 */

/**
 * Text alignment for one column of a <SpecTable>.
 *
 * The row header (column 0) is always left-aligned regardless of this value.
 * Every other column defaults to "right" with tabular figures, which suits a
 * size chart's numbers; set "left" or "center" for a column that holds words
 * instead (a pipe size, a note) so it is not treated as a right-aligned
 * figure.
 */
export type SpecColumnAlign = "left" | "center" | "right";

/**
 * A table of specifications - capacities, dimensions, weights.
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
  /** Per-column alignment, parallel to `columns`. Omit for the all-right-aligned default. */
  columnAlign?: SpecColumnAlign[];
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
 * One step in an <OrderedListSection>.
 *
 * `title` names the thing in a couple of words and `body` explains it in a
 * sentence or two - the number itself is not stored, it comes from the item's
 * position, so reordering the array renumbers the list.
 */
export interface OrderedListItem {
  title: Localized;
  body: Localized;
}

/**
 * A numbered list of short write-ups - a process, a range of systems, a set of
 * options - laid out two across with each item's number sitting above it.
 *
 * Reach for this over <BulletListSection> when the items need a sentence of
 * explanation rather than a phrase, and over <SpecTableSection> when they are
 * prose rather than figures. The order is meaningful enough to number: if it
 * is not, a bullet list is the honest block.
 */
export interface OrderedListSection {
  type: "orderedList";
  title: Localized;
  items: OrderedListItem[];
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

/**
 * A list inside a <ContentSection>, ordered or not.
 *
 * Split out from <ContentListBlock> so an item's `children` can be the same
 * shape as the list it sits in: a sub-list is just another list, and it may
 * flip from bullets to numbers at any level.
 */
export interface ContentList {
  ordered: boolean;
  items: ContentListItem[];
}

/**
 * One item of a <ContentList>.
 *
 * `text` is a phrase or a sentence, not a paragraph. `children` nests a
 * sub-list under it to any depth; nothing else nests, so an item cannot hold a
 * picture or a run of prose - if it needs one, it is really its own block.
 */
export interface ContentListItem {
  text: Localized;
  /** A sub-list rendered indented under this item. */
  children?: ContentList;
}

/**
 * One paragraph in a <ContentSection>'s flow.
 *
 * Unlike <ParagraphSection>, which is a whole section and caps itself at one
 * paragraph, these stack: a section may carry as many as the copy needs.
 */
export interface ContentParagraphBlock {
  type: "paragraph";
  body: Localized;
}

/**
 * One picture in a <ContentSection>'s flow, shown at its own aspect ratio
 * across the text column - a drawing, a diagram, a site photograph.
 *
 * `width` and `height` are the file's intrinsic pixel size, required by
 * `next/image`: guessing a ratio here shifts the layout on every image whose
 * real shape differs. `alt` is localized and required, same as an image grid's;
 * `caption` is optional and prints under the picture.
 */
export interface ContentImageBlock {
  type: "image";
  src: string;
  alt: Localized;
  width: number;
  height: number;
  caption?: Localized;
}

/** A list in a <ContentSection>'s flow - see <ContentList> for the nesting. */
export interface ContentListBlock extends ContentList {
  type: "list";
}

/**
 * A table in a <ContentSection>'s flow - a sizing chart sitting mid-article
 * rather than standing alone as its own section.
 *
 * Same contract as <SpecTableSection>: every cell is localized, each row must
 * have as many cells as `columns`, and the first cell of a row is its header.
 * It carries no `title` of its own - the section's heading already names it,
 * and a second heading inside the flow would read as a new section.
 *
 * This is the one block that leaves the prose measure: a sizing table runs to
 * ten columns or more, which is unreadable at the text column's width, so it
 * spans the full section instead. `caption` is optional and prints under it.
 */
export interface ContentTableBlock {
  type: "table";
  columns: Localized[];
  rows: Localized[][];
  caption?: Localized;
  /** Per-column alignment, parallel to `columns`. Omit for the all-right-aligned default. See <SpecColumnAlign>. */
  columnAlign?: SpecColumnAlign[];
}

/**
 * One block in a <ContentSection>.
 *
 * This is its own discriminated union, separate from <ProductSection>, so the
 * `"paragraph"` tag here is unrelated to <ParagraphSection>'s and the two do
 * not collide. Do not rename either to "fix" the overlap.
 */
export type ContentBlock =
  | ContentParagraphBlock
  | ContentImageBlock
  | ContentListBlock
  | ContentTableBlock;

/**
 * A title over an ordered run of mixed blocks - paragraphs, pictures, lists
 * and tables, in whatever order the copy reads best.
 *
 * Reach for this when a product's story is one short article rather than
 * several separate blocks: the single-purpose sections above each impose their
 * own heading, which chops a continuous piece of copy into unrelated parts.
 * When the content really is one table, one list or one paragraph, use the
 * section built for it instead - it is laid out for that shape.
 */
export interface ContentSection {
  type: "content";
  title: Localized;
  blocks: ContentBlock[];
}

export type ProductSection =
  | SpecTableSection
  | BulletListSection
  | OrderedListSection
  | ParagraphSection
  | ImageGridSection
  | ContentSection;
