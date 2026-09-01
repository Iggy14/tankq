import type { AppLocale } from "@/i18n/routing";
import type { Localized } from "@/lib/localized";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type SpecTableProps = {
  columns: Localized[];
  rows: Localized[][];
  locale: AppLocale;
  /** Outer spacing, owned by whoever places the table. */
  className?: string;
};

/**
 * The size chart itself, without a heading - shared by <SpecTableSection>,
 * which gives it its own section, and by the `table` block inside a
 * <ContentSection>, which drops it into a run of copy.
 *
 * The first cell of a row is its header (the model or capacity, typically) and
 * stays left-aligned; every other column holds figures, so it is right-aligned
 * with tabular numerals to keep the digits in a column. The table scrolls
 * sideways on narrow screens rather than wrapping cells, which would break the
 * reading order of a size chart.
 */
export function SpecTable({ columns, rows, locale, className }: SpecTableProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl ring-1 ring-border",
        className,
      )}
    >
      <Table>
        <TableHeader>
          <TableRow className="border-b-0 bg-navy hover:bg-navy">
            {columns.map((column, columnIndex) => (
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
          {rows.map((row, rowIndex) => (
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
  );
}
