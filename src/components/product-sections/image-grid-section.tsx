import Image from "next/image";

import type { AppLocale } from "@/i18n/routing";
import type { ImageGridSection as ImageGridSectionData } from "@/lib/product-sections";

type ImageGridSectionProps = {
  section: ImageGridSectionData;
  locale: AppLocale;
  /** Ties the visible heading to the grid for screen readers. */
  headingId: string;
};

/**
 * A grid of pictures, three across on a desktop and stepping down to one on a
 * phone — a dimension drawing shrunk to a third of a narrow screen is
 * unreadable.
 *
 * The pictures stand on the page unframed: no card, no ground, no corner
 * rounding, so the only space between them is the grid gap. Each fills a
 * square tile — cropped to fit rather than squashed, since a distorted
 * dimension drawing would misrepresent the thing it measures. Supply artwork
 * that is square or close to it, and trimmed of its own margin: whitespace
 * baked into a picture reads as a hole in the grid.
 */
export function ImageGridSection({
  section,
  locale,
  headingId,
}: ImageGridSectionProps) {
  return (
    <section aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="text-center text-2xl font-semibold tracking-tight text-balance text-primary sm:text-3xl"
      >
        {section.title[locale]}
      </h2>

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {section.images.map((image) => (
          <li key={image.src}>
            <Image
              src={image.src}
              alt={image.alt[locale]}
              width={730}
              height={650}
              sizes="(min-width: 1024px) 29rem, (min-width: 640px) 50vw, 100vw"
              className="aspect-square w-full object-cover"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
