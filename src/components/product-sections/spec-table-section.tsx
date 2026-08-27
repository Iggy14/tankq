import type { AppLocale } from "@/i18n/routing";
import type { SpecTableSection as SpecTableSectionData } from "@/lib/product-sections";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type SpecTableSectionProps = {
  section: SpecTableSectionData;
  locale: AppLocale;
  /** Ties the visible heading to the table for screen readers. */
  headingId: string;
};

/**
 * A specification table — sizes, capacities, weights.
 *
 * The first cell of a row is its header (the capacity, typically) and stays
 * left-aligned; every other column holds figures, so it is right-aligned with
 * tabular numerals to keep the digits in a column. The table scrolls sideways
 * on narrow screens rather than wrapping cells, which would break the reading
 * order of a size chart.
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

      <div className="mt-8 overflow-hidden rounded-xl ring-1 ring-border">
        <Table>
          <TableHeader>
            <TableRow className="border-b-0 bg-navy hover:bg-navy">
              {section.columns.map((column, columnIndex) => (
                <TableHead
                  key={columnIndex}
                  scope="col"
                  className={cn(
                    "h-12 px-4 text-navy-foreground",
                    columnIndex > 0 && "text-right",
                  )}
                >
                  {column[locale]}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {section.rows.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="border-border odd:bg-muted/40">
                {row.map((cell, cellIndex) =>
                  cellIndex === 0 ? (
                    // A <th> rather than a cell, so the figures beside it are
                    // announced with the size they belong to.
                    <TableHead
                      key={cellIndex}
                      scope="row"
                      className="h-auto px-4 py-3 tabular-nums"
                    >
                      {cell[locale]}
                    </TableHead>
                  ) : (
                    <TableCell
                      key={cellIndex}
                      className="px-4 py-3 text-right tabular-nums text-muted-foreground"
                    >
                      {cell[locale]}
                    </TableCell>
                  ),
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
