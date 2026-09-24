"use client";

import {
  Container,
  Cylinder,
  Database,
  Droplets,
  Funnel,
  LayoutGrid,
  PaintRoller,
  Recycle,
  type LucideIcon,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { ComponentProps } from "react";

import { Link } from "@/i18n/navigation";
import { toAppLocale } from "@/i18n/locale";
import {
  getAllProductCategories,
  type ProductCategoryId,
} from "@/lib/product-categories";
import {
  categoryHref,
  productsHref,
  type ActiveCategory,
} from "@/lib/product-category-url";
import { cn } from "@/lib/utils";

/**
 * The pill icons. Presentation, so they live here rather than in
 * `src/lib/product-categories.ts`, which stays pure content - the same split
 * `hero/stats-strip.tsx` makes.
 *
 * Keyed by the frozen `ProductCategoryId` union: adding a category without
 * choosing an icon fails to compile instead of rendering a blank pill.
 */
const CATEGORY_ICONS: Record<ProductCategoryId, LucideIcon> = {
  "frp-vertical-water-tank": Cylinder,
  "frp-horizontal-water-tank": Container,
  "pe-water-tank": Database,
  "frp-wastewater-treatment-tank": Recycle,
  "septic-tank-grease-trap": Funnel,
  "epoxy-pu-flooring": PaintRoller,
  "water-solution": Droplets,
};

type CategoryFilterProps = {
  active: ActiveCategory;
};

/**
 * The row of category pills above the grid.
 *
 * Links rather than buttons: the selection lives in the URL, so each pill is a
 * real destination that can be shared, opened in a new tab and reached by the
 * back button - and the row still works before the page hydrates.
 */
export function CategoryFilter({ active }: CategoryFilterProps) {
  const t = useTranslations("products");
  const locale = toAppLocale(useLocale());
  const categories = getAllProductCategories();

  return (
    <div
      role="group"
      aria-label={t("categoryFilterLabel")}
      className="flex flex-wrap justify-center gap-3"
    >
      <Pill
        Icon={LayoutGrid}
        label={t("allCategories")}
        isActive={active === "all"}
        href={productsHref("all")}
      />

      {categories.map((category) => (
        <Pill
          key={category.id}
          Icon={CATEGORY_ICONS[category.id]}
          label={category.title[locale]}
          isActive={active === category.id}
          href={categoryHref(category.id)}
        />
      ))}
    </div>
  );
}

type PillProps = {
  Icon: LucideIcon;
  label: string;
  isActive: boolean;
  href: ComponentProps<typeof Link>["href"];
};

function Pill({ Icon, label, isActive, href }: PillProps) {
  return (
    <Link
      href={href}
      // The grid is further down the same page, so a jump to the top on every
      // filter change would lose the visitor's place.
      scroll={false}
      aria-current={isActive ? "true" : undefined}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        isActive
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-card text-primary hover:border-primary/40 hover:bg-accent",
      )}
    >
      <Icon className="size-5 shrink-0" aria-hidden="true" />
      {label}
    </Link>
  );
}
