import { Check } from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import type { CheckListSection as CheckListSectionData } from "@/lib/product-sections";

type CheckListSectionProps = {
  section: CheckListSectionData;
  locale: AppLocale;
  /** Ties the visible heading to the list for screen readers. */
  headingId: string;
};

/**
 * A checked list of selling points.
 *
 * The check icon is decorative — the list markup already says "list item" — so
 * it is hidden from assistive tech and the copy carries the meaning. Teal is
 * the palette's accent, and it is too light to read on white, so the mark takes
 * the darker `teal-foreground` on a tint of teal rather than sitting on it. Two
 * columns from `sm` up, because the items are short and a single tall column
 * wastes the width of a detail page.
 */
export function CheckListSection({
  section,
  locale,
  headingId,
}: CheckListSectionProps) {
  return (
    <section aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="text-center text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
      >
        {section.title[locale]}
      </h2>

      <ul className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
        {section.items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span
              aria-hidden
              className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal-foreground"
            >
              <Check className="size-4" strokeWidth={3} />
            </span>
            <span className="text-base leading-relaxed text-pretty">
              {item[locale]}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
