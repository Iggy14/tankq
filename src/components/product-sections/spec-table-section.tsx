import type { AppLocale } from "@/i18n/routing";
import type { SpecTableSection as SpecTableSectionData } from "@/lib/product-sections";

import { SpecTable } from "./spec-table";

type SpecTableSectionProps = {
  section: SpecTableSectionData;
  locale: AppLocale;
  /** Ties the visible heading to the table for screen readers. */
  headingId: string;
};

/**
 * A specification table as a section of its own - sizes, capacities, weights.
 *
 * The table is <SpecTable>; this adds the heading and the section landmark.
 * A table that belongs inside a run of copy is the `table` block of a
 * <ContentSection> instead, which renders the same chart without a heading.
 */
export function SpecTableSection({
  section,
  locale,
  headingId,
}: SpecTableSectionProps) {
  return (
    <section aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="text-center text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
      >
        {section.title[locale]}
      </h2>

      <SpecTable
        columns={section.columns}
        rows={section.rows}
        locale={locale}
        columnAlign={section.columnAlign}
        className="mt-8"
      />
    </section>
  );
}
