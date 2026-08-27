import type { AppLocale } from "@/i18n/routing";
import type { ParagraphSection as ParagraphSectionData } from "@/lib/product-sections";

type ParagraphSectionProps = {
  section: ParagraphSectionData;
  locale: AppLocale;
  /** Ties the visible heading to the prose for screen readers. */
  headingId: string;
};

/**
 * A heading over a single paragraph of prose.
 *
 * The measure is capped well short of the page width — long lines are hard to
 * track back from — and the text is centred to sit with the heading, matching
 * the centred intro at the top of a detail page.
 */
export function ParagraphSection({
  section,
  locale,
  headingId,
}: ParagraphSectionProps) {
  return (
    <section aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="text-center text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
      >
        {section.title[locale]}
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-pretty text-muted-foreground">
        {section.body[locale]}
      </p>
    </section>
  );
}
