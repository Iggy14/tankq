import { FadeInUp } from "@/components/fade-in-up";
import type { AppLocale } from "@/i18n/routing";
import type { ProductSection } from "@/lib/product-sections";

import { CheckListSection } from "./check-list-section";
import { ImageGridSection } from "./image-grid-section";
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
    const headingId = `product-section-${index}`;

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

      case "checkList":
        return (
          <FadeInUp key={headingId}>
            <CheckListSection
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
    }
  });
}
