import type { AppLocale } from "@/i18n/routing";
import type { ContentSection as ContentSectionData } from "@/lib/product-sections";
import { cn } from "@/lib/utils";

import { Figure } from "./figure";
import { List } from "./list";
import { Table } from "./table";

/**
 * The reading measure every block but a table is held to. The flow itself is
 * full width so a table can span it; the prose is centred inside that.
 */
const PROSE_COLUMN = "mx-auto w-full max-w-3xl";

type ContentSectionProps = {
  section: ContentSectionData;
  locale: AppLocale;
  /** Ties the visible heading to the block flow for screen readers. */
  headingId: string;
  /**
   * Whether to draw the short close below this section - see the comment on
   * it below. Defaults to `true`; `product-sections/index.tsx` passes `false`
   * for the last section in a product's list, since the page itself already
   * marks that boundary (the related-products strip's own top rule).
   */
  showDivider?: boolean;
};

/**
 * A heading over an ordered run of mixed blocks - paragraphs, pictures, lists
 * and tables in whatever order the data declares.
 *
 * Paragraphs, pictures and lists sit in one column at the prose measure, so a
 * picture lines up with the copy around it and the whole section reads as one
 * article rather than a stack of unrelated blocks. A `table` is the exception
 * and spans the full section - see <Table>. The gap here is between blocks;
 * the gap between sections belongs to the page.
 *
 * Paragraphs are left-aligned, unlike <ParagraphSection>'s single centred one:
 * centring reads as a pull quote at one paragraph and as a mess at three.
 *
 * The switch is exhaustive over <ContentBlock>, so adding a kind of block
 * without a branch here is a type error, same discipline as the section
 * registry one level up.
 */
export function ContentSection({
  section,
  locale,
  headingId,
  showDivider = true,
}: ContentSectionProps) {
  return (
    <section aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="text-center text-2xl font-semibold tracking-tight text-balance text-primary sm:text-3xl"
      >
        {section.title[locale]}
      </h2>

      <div className="mt-8 flex flex-col gap-6">
        {section.blocks.map((block, index) => {
          switch (block.type) {
            case "paragraph":
              return (
                <p
                  key={index}
                  className={cn(
                    PROSE_COLUMN,
                    "text-base leading-relaxed text-pretty text-muted-foreground",
                  )}
                >
                  {block.body[locale]}
                </p>
              );

            case "image":
              return (
                <div key={index} className={PROSE_COLUMN}>
                  <Figure block={block} locale={locale} />
                </div>
              );

            case "list":
              return (
                <div key={index} className={PROSE_COLUMN}>
                  <List list={block} locale={locale} />
                </div>
              );

            case "table":
              return <Table key={index} block={block} locale={locale} />;
          }
        })}
      </div>

      {/* A short close, not a full-width rule - the section boundary itself
          is the big `gap-20` between sections in the page; this just marks
          the end of this one's flow. Capped well under the prose column's
          own width so it never reads wider than the picture above it. */}
      {showDivider && (
        <div
          aria-hidden
          className="mx-auto mt-10 h-px w-64 rounded-full bg-primary/30"
        />
      )}
    </section>
  );
}
