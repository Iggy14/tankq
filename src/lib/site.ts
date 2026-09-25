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

/** Default share image (1200x630) for pages with no image of their own. */
export const DEFAULT_OG_IMAGE = "/og-default.jpg";

/** Open Graph's `og:locale` wants a language_TERRITORY code, not a bare `th`. */
const OG_LOCALES: Record<string, string> = { th: "th_TH", en: "en_US" };

/**
 * Everything a page's `generateMetadata` returns, in one call: title,
 * description, canonical/hreflang, and the Open Graph + Twitter card that
 * decide how a shared link previews (LINE, Facebook). A page's `openGraph`
 * replaces the layout's rather than merging with it, so the whole object has
 * to be built here per page instead of set once in the layout.
 *
 * `title` is the bare page title; the layout's `%s | TankQ` template only
 * applies to `<title>`, not to Open Graph, so the share card shows it as is.
 */
export function pageMetadata({
  locale,
  pathname,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
}: {
  locale: string;
  pathname: string;
  title: string;
  description: string;
  /** Public path of the share image; defaults to `DEFAULT_OG_IMAGE`. */
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: alternatesFor(locale, pathname),
    openGraph: {
      type: "website",
      siteName: "TankQ",
      locale: OG_LOCALES[locale],
      url: `/${locale}${pathname}`,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
