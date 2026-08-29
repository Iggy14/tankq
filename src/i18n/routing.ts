import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Thai first: it is the default and the fallback when detection fails.
  locales: ["th", "en"],
  defaultLocale: "th",

  // Always show the locale in the URL, including the default one: /th/about, /en/about
  localePrefix: "always",
});

export type AppLocale = (typeof routing.locales)[number];

export const localeLabels: Record<AppLocale, string> = {
  th: "ไทย",
  en: "English",
};

// Two-letter codes for tight chrome like the header's language switch, where
// the full label would not fit.
export const localeShortLabels: Record<AppLocale, string> = {
  th: "TH",
  en: "EN",
};
