import type { AppLocale } from "@/i18n/routing";
import type { OrderedListSection as OrderedListSectionData } from "@/lib/product-sections";

type OrderedListSectionProps = {
  section: OrderedListSectionData;
  locale: AppLocale;
  /** Ties the visible heading to the list for screen readers. */
  headingId: string;
};

/**
 * A numbered list of short write-ups, two across.
 *
 * The number sits above its item rather than beside it, so the copy below
 * starts on the same left edge as the item's name and both columns share one
 * text edge however long the item runs. It is drawn from the item's position
 * and zero-padded to two digits, which keeps "01" and "10" the same width;
 * `<ol>` already announces the order, so the figure itself is hidden from
 * assistive tech rather than read out twice.
 *
 * A rule over each item is what separates one from the next - no card, no
 * ground - matching the unframed blocks around it. Two columns from `sm` up:
 * the items are a sentence or two, and a single column would run the section
 * far down the page.
 */
export function OrderedListSection({
  section,
  locale,
  headingId,
}: OrderedListSectionProps) {
  return (
    <section aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="text-center text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
      >
        {section.title[locale]}
      </h2>

      <ol className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
        {section.items.map((item, index) => (
          <li key={index} className="border-t border-border pt-5">
            <span
              aria-hidden
              className="block font-mono text-2xl leading-none font-semibold tabular-nums text-primary"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3 className="mt-4 text-lg font-semibold tracking-tight text-balance">
              {item.title[locale]}
            </h3>

            <p className="mt-2 text-base leading-relaxed text-pretty text-muted-foreground">
              {item.body[locale]}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
