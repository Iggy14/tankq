import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { getAllProducts } from "@/lib/products";
import { siteUrl } from "@/lib/site";

// Locale-less paths of every page that should be indexed. `/projects` is left
// out on purpose while it is unlinked from the site - see docs/TODO.md.
const staticPaths = ["", "/products", "/about", "/quality", "/service", "/contact"];

/**
 * One entry per locale per page, each pointing at its translations through
 * `alternates.languages` so search engines treat /th and /en as a pair.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths.map((path) => ({ path, priority: path === "" ? 1 : 0.8 })),
    ...getAllProducts().map((product) => ({
      path: `/products/${product.slug}`,
      priority: 0.7,
    })),
  ];

  return paths.flatMap(({ path, priority }) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((other) => [other, `${siteUrl}/${other}${path}`]),
        ),
      },
    })),
  );
}
