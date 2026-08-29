"use client";

import { useOptimistic, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeShortLabels, routing, type AppLocale } from "@/i18n/routing";

export function LanguageSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  // next-intl's usePathname strips the locale prefix, so /th/products -> /products.
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  // The knob has to move on click, not when the new route finishes rendering.
  // useOptimistic snaps back on its own once the transition settles.
  const [activeLocale, setActiveLocale] = useOptimistic(locale);

  function onToggle() {
    const nextLocale = routing.locales.find((value) => value !== activeLocale);
    if (!nextLocale) return;

    // Re-renders the same route under the other locale and updates the
    // NEXT_LOCALE cookie so the choice sticks on later visits.
    startTransition(() => {
      setActiveLocale(nextLocale);
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={isPending}
      aria-label={t("switchLanguage")}
      className={cn(
        "relative inline-flex h-8 items-center rounded-full border border-border bg-muted p-0.5",
        "text-xs font-semibold transition-colors hover:border-primary/40",
        "focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
        "disabled:pointer-events-none disabled:opacity-70",
      )}
    >
      {/* The sliding knob sits under the labels so the active one reads on it. */}
      <span
        aria-hidden
        className={cn(
          "absolute top-0.7 left-1 h-6 w-8 rounded-full bg-primary shadow-sm",
          "transition-transform duration-200 ease-out",
          activeLocale === routing.locales[0] ? "translate-x-0" : "translate-x-7",
        )}
      />
      {routing.locales.map((value) => (
        <span
          key={value}
          className={cn(
            "relative z-10 inline-flex h-7 w-8 items-center justify-center rounded-full transition-colors",
            value === activeLocale ? "text-primary-foreground" : "text-muted-foreground",
          )}
        >
          {localeShortLabels[value]}
        </span>
      ))}
    </button>
  );
}
