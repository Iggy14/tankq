import type { AppLocale } from "@/i18n/routing";

/**
 * A value that exists once per supported locale.
 *
 * Dynamic content (product copy, table headers, section titles) carries both
 * locales inline and is read as `value[locale]`. next-intl messages stay
 * reserved for static UI chrome.
 */
export type Localized<T = string> = Record<AppLocale, T>;
