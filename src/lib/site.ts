import type { Metadata } from "next";

import { routing } from "@/i18n/routing";

/**
 * The canonical production origin, used to build absolute URLs for metadata
 * that requires them (metadataBase, JSON-LD). Overridable via env so a
 * preview deploy is not stamped with the production host.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tankq-solution.com";

/**
 * Builds `generateMetadata`'s `alternates` for a page, given its locale-less
 * pathname (`""` for the home page, `"/about"`, `/products/${slug}`, ...).
 * `localePrefix: "always"` means every route exists at both `/th` and `/en`,
 * so this tells Google which one a given page's canonical URL is and that
 * the other locale is its translation, not duplicate content. Paths are
 * resolved against `metadataBase`, so relative ones are enough.
 */
export function alternatesFor(
  locale: string,
  pathname: string,
): Metadata["alternates"] {
  return {
    canonical: `/${locale}${pathname}`,
    languages: Object.fromEntries(
      routing.locales.map((otherLocale) => [
        otherLocale,
        `/${otherLocale}${pathname}`,
      ]),
    ),
  };
}
