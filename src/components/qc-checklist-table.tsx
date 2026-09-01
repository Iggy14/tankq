import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/**
 * The checklist rows, in display order. Only the row numbers live here - each
 * one's four cells come from the `quality.qcRow<N>*` keys, the same
 * list-in-code / copy-in-messages split as `process-roadmap.tsx`.
 */
const rows = [1, 2, 3, 4, 5, 6, 7, 8] as const;

/** The `quality.qcCol*` key suffixes, left to right. */
const columns = ["Item", "Standard", "Instrument", "Result"] as const;

/**
 * The per-tank QC checklist - what is inspected, against what, with what, and
 * the outcome.
 *
 * Styled after the product detail pages' spec table (primary-color header,
 * zebra body, ringed container that scrolls sideways when narrow), but every
 * column here holds words rather than figures, so all four stay left-aligned
 * instead of right-aligning the figures under a size chart. The first cell of
 * a row is a <th> so the standard and instrument beside it are announced with
 * the item they belong to.
 */
export function QcChecklistTable() {
  const t = useTranslations("quality");
  const headingId = "qc-checklist";

  return (
    <section aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="text-center text-2xl font-bold tracking-tight text-balance text-foreground sm:text-3xl md:text-4xl"
      >
        {t("qcTableTitle")}
      </h2>

      <div className="mt-8 overflow-hidden rounded-xl ring-1 ring-border">
        <Table>
          <TableHeader>
            <TableRow className="border-b-0 bg-primary hover:bg-primary">
              {columns.map((column) => (
                <TableHead
                  key={column}
                  scope="col"
                  className="h-12 px-4 text-primary-foreground"
                >
                  {t(`qcCol${column}`)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((n) => (
              <TableRow key={n} className="border-border odd:bg-muted/40">
                <TableHead scope="row" className="h-auto px-4 py-3">
                  {t(`qcRow${n}Item`)}
                </TableHead>
                <TableCell className="px-4 py-3 text-muted-foreground">
                  {t(`qcRow${n}Standard`)}
                </TableCell>
                <TableCell className="px-4 py-3 text-muted-foreground">
                  {t(`qcRow${n}Instrument`)}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 font-medium text-primary">
                    <Check className="size-4" strokeWidth={3} aria-hidden />
                    {t(`qcRow${n}Result`)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
