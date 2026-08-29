import type { Localized } from "./localized";

/**
 * The at-a-glance facts shown under a product's description on its detail page.
 *
 * A spec is a couple of words - what the tank is made of, what it is for, whose
 * brand it carries - not a sentence. Like the rest of the catalogue it is
 * content, so both locales live inline and are read as `spec.label[locale]`.
 *
 * `icon` names a slot rather than a component: the lucide icon it resolves to
 * lives in `SPEC_ICONS` in `src/components/product-specs.tsx`, so this file
 * stays pure data. Adding an id here without a row there is a compile error.
 */

export const productSpecIcons = [
  "material",
  "waterStorage",
  "wasteWaterTreatment",
  "greaseTrap",
  "brand",
] as const;

/** Every icon slot declared above, as a union. */
export type ProductSpecIconId = (typeof productSpecIcons)[number];

export interface ProductSpec {
  /** Optional - a spec with no icon renders a bullet instead. */
  icon?: ProductSpecIconId;
  label: Localized;
}
