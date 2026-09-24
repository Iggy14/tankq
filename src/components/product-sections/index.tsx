import { FadeInUp } from "@/components/fade-in-up";
import type { AppLocale } from "@/i18n/routing";
import type { ProductSection } from "@/lib/product-sections";

import { BulletListSection } from "./bullet-list-section";
import { ContentSection } from "./content-section";
import { ImageGridSection } from "./image-grid-section";
import { OrderedListSection } from "./ordered-list-section";
import { ParagraphSection } from "./paragraph-section";
import { SpecTableSection } from "./spec-table-section";

type ProductSectionsProps = {
  sections: ProductSection[];
  locale: AppLocale;
};

/**
 * Renders a product's optional content blocks in the order the data declares
 * them, each revealing as it scrolls into view. Every `type` maps to one
 * component; the switch is exhaustive, so adding a member to <ProductSection>
 * without a branch here is a type error.
 *
 * Wrap the call site in <FadeInUpGroup> to get the blocks cascading, and let
 * that wrapper own the spacing between them.
 */
export function ProductSections({ sections, locale }: ProductSectionsProps) {
  return sections.map((section, index) => {
    // A stable `id` (set when something links to this section - see
    // `ProductSectionLink`) survives reordering; falling back to the index
    // keeps every other section working without one.
    const headingId = `product-section-${section.id ?? index}`;

    switch (section.type) {
      case "specTable":
        return (
          <FadeInUp key={headingId}>
            <SpecTableSection
              section={section}
              locale={locale}
              headingId={headingId}
            />
          </FadeInUp>
        );

      case "bulletList":
        return (
          <FadeInUp key={headingId}>
            <BulletListSection
              section={section}
              locale={locale}
              headingId={headingId}
            />
          </FadeInUp>
        );

      case "orderedList":
        return (
          <FadeInUp key={headingId}>
            <OrderedListSection
              section={section}
              locale={locale}
              headingId={headingId}
            />
          </FadeInUp>
        );

      case "paragraph":
        return (
          <FadeInUp key={headingId}>
            <ParagraphSection
              section={section}
              locale={locale}
              headingId={headingId}
            />
          </FadeInUp>
        );

      case "imageGrid":
        return (
          <FadeInUp key={headingId}>
            <ImageGridSection
              section={section}
              locale={locale}
              headingId={headingId}
            />
          </FadeInUp>
        );

      case "content":
        return (
          <FadeInUp key={headingId}>
            <ContentSection
              section={section}
              locale={locale}
              headingId={headingId}
              // The last section on the page needs no close of its own - the
              // related-products strip right after it already draws one.
              showDivider={index < sections.length - 1}
            />
          </FadeInUp>
        );
    }
  });
}
