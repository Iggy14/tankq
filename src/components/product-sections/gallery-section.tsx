import { ProductGallery } from "@/components/product-gallery";
import type { AppLocale } from "@/i18n/routing";
import type { GallerySection as GallerySectionData } from "@/lib/product-sections";

type GallerySectionProps = {
  section: GallerySectionData;
  locale: AppLocale;
  /** Ties the visible heading to the gallery for screen readers. */
  headingId: string;
};

/**
 * A heading over a product gallery. Opens one variant on a merged page, so the
 * heading is the variant's name and the pictures that follow are its own.
 */
export function GallerySection({
  section,
  locale,
  headingId,
}: GallerySectionProps) {
  const title = section.title[locale];

  return (
    <section aria-labelledby={headingId} className="scroll-mt-24">
      <h2
        id={headingId}
        className="text-center text-2xl font-semibold tracking-tight text-balance text-primary sm:text-3xl"
      >
        {title}
      </h2>

      <div className="mt-8">
        {/* Only the cover at the top of a page is above the fold. */}
        <ProductGallery images={section.images} alt={title} priority={false} />
      </div>
    </section>
  );
}
