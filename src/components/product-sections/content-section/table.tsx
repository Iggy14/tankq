import type { AppLocale } from "@/i18n/routing";
import type { ContentTableBlock } from "@/lib/product-sections";

import { SpecTable } from "../spec-table";

type TableProps = {
  block: ContentTableBlock;
  locale: AppLocale;
};

/**
 * A size chart in a <ContentSection>'s flow.
 *
 * Unlike the paragraphs, pictures and lists around it, this is not held to the
 * prose measure: it spans the whole section, because a chart of ten columns or
 * more squeezed into the text column is exactly the unreadable screenshot this
 * block exists to replace. It still scrolls sideways on a phone.
 *
 * The chart itself is <SpecTable>, the same component behind a standalone
 * `specTable` section, so both look identical wherever a reader meets them.
 */
export function Table({ block, locale }: TableProps) {
  return (
    <figure>
      <SpecTable
        columns={block.columns}
        rows={block.rows}
        locale={locale}
        columnAlign={block.columnAlign}
      />

      {block.caption && (
        <figcaption className="mt-2 text-center text-sm leading-relaxed text-pretty text-muted-foreground">
          {block.caption[locale]}
        </figcaption>
      )}
    </figure>
  );
}
