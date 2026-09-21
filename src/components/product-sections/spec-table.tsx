import type { AppLocale } from "@/i18n/routing";
import type { Localized } from "@/lib/localized";
import type { SpecColumnAlign } from "@/lib/product-sections";
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
  /** Per-column alignment, parallel to `columns`. Column 0 ignores this and always stays left. See <SpecColumnAlign>. */
  columnAlign?: SpecColumnAlign[];
  /** Outer spacing, owned by whoever places the table. */
  className?: string;
};

const alignClassName: Record<SpecColumnAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right tabular-nums",
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
export function SpecTable({
  columns,
  rows,
  locale,
  columnAlign,
  className,
}: SpecTableProps) {
  const align = columns.map((_, index) => columnAlign?.[index] ?? "right");

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl ring-1 ring-border",
        className,
      )}
    >
      <Table>
        <TableHeader>
          <TableRow className="border-b-0 bg-primary hover:bg-primary">
            {columns.map((column, columnIndex) => (
              <TableHead
                key={columnIndex}
                scope="col"
                className={cn(
                  "h-12 px-4 text-primary-foreground",
                  columnIndex > 0 && alignClassName[align[columnIndex]],
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
                    className={cn(
                      "px-4 py-3 text-muted-foreground",
                      alignClassName[align[cellIndex]],
                    )}
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
