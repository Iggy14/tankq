import {
  BadgeCheck,
  Droplets,
  Funnel,
  Layers,
  Recycle,
  type LucideIcon,
} from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import type { ProductSpec, ProductSpecIconId } from "@/lib/product-specs";

/**
 * The icon per spec slot. Presentation, so it lives here rather than in
 * `src/lib/product-specs.ts`, which stays pure content - the same split
 * `CATEGORY_ICONS` makes in `product-catalogue/category-filter.tsx`, and the
 * two agree on the icons they share.
 *
 * Keyed by the frozen `ProductSpecIconId` union: adding a slot without
 * choosing an icon fails to compile instead of rendering a blank space.
 */
const SPEC_ICONS: Record<ProductSpecIconId, LucideIcon> = {
  material: Layers,
  waterStorage: Droplets,
  wasteWaterTreatment: Recycle,
  greaseTrap: Funnel,
  brand: BadgeCheck,
};

type ProductSpecsProps = {
  specs: ProductSpec[];
  locale: AppLocale;
};

/**
 * The row of at-a-glance facts under a product's description.
 *
 * Plain text rather than chips or dividers: the row sits between the
 * description and the CTA buttons, so it has to read as a quick summary
 * without competing with either. Small and semibold carries the emphasis.
 *
 * The icon is decorative - the list markup already says "list item" and the
 * label carries the meaning - so it is hidden from assistive tech, and a spec
 * that names no icon gets a bullet dot so the row stays aligned.
 */
export function ProductSpecs({ specs, locale }: ProductSpecsProps) {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
      {specs.map((spec, index) => {
        const Icon = spec.icon ? SPEC_ICONS[spec.icon] : undefined;

        return (
          <li
            key={index}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            {Icon ? (
              <Icon
                aria-hidden
                className="size-4 shrink-0 text-teal-foreground"
              />
            ) : (
              <span
                aria-hidden
                className="size-1.5 shrink-0 rounded-full bg-teal-foreground"
              />
            )}
            {spec.label[locale]}
          </li>
        );
      })}
    </ul>
  );
}
