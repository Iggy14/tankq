/**
 * The canonical production origin, used to build absolute URLs for metadata
 * that requires them (metadataBase, JSON-LD). Overridable via env so a
 * preview deploy is not stamped with the production host.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tankq-solution.com";
