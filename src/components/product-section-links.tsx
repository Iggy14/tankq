import type { AppLocale } from "@/i18n/routing";
import type { ProductSectionLink } from "@/lib/product-sections";

type ProductSectionLinksProps = {
  links: ProductSectionLink[];
  locale: AppLocale;
};

/**
 * A row of jump links to sections further down the same detail page, shown
 * in the same spot a product's `specs` row would sit - see
 * `ProductSectionLink` in `src/lib/product-sections.ts` for how `sectionId`
 * ties back to a section's own `id`.
 *
 * Plain anchors, not `next-intl`'s `Link`: this only ever jumps within the
 * current page, never across a route, so there is no locale prefix to add.
 * Underlined on hover rather than carrying a permanent underline or icon,
 * matching the rest of the site's link treatment.
 */
export function ProductSectionLinks({
  links,
  locale,
}: ProductSectionLinksProps) {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
      {links.map((link) => (
        <li key={link.sectionId}>
          <a
            href={`#product-section-${link.sectionId}`}
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            {link.label[locale]}
          </a>
        </li>
      ))}
    </ul>
  );
}
