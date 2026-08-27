import { hasLocale } from "next-intl";

import { routing, type AppLocale } from "./routing";

/**
 * Narrows an arbitrary locale string to one we actually ship copy for.
 *
 * Anything unsupported is stopped by the layout's guard long before it gets
 * here, so the fallback is defensive only — it exists so callers can index
 * localized data (`product.title[locale]`) without a cast.
 */
export function toAppLocale(locale: string): AppLocale {
  return hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
}
