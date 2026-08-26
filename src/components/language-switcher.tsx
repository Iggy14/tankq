"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckIcon, GlobeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeLabels, routing, type AppLocale } from "@/i18n/routing";

export function LanguageSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  // next-intl's usePathname strips the locale prefix, so /th/products -> /products.
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onSelect(nextLocale: AppLocale) {
    if (nextLocale === locale) return;

    // Re-renders the same route under the other locale and updates the
    // NEXT_LOCALE cookie so the choice sticks on later visits.
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            aria-label={t("switchLanguage")}
            disabled={isPending}
          >
            <GlobeIcon />
            {localeLabels[locale]}
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="min-w-36">
        {routing.locales.map((value) => (
          <DropdownMenuItem key={value} onClick={() => onSelect(value)}>
            <CheckIcon className={value === locale ? "opacity-100" : "opacity-0"} />
            {localeLabels[value]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
