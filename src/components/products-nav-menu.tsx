"use client";

import { isNavLinkActive } from "@/components/nav-link";
import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link, usePathname } from "@/i18n/navigation";
import type { ProductCategoryId } from "@/lib/product-categories";
import { categoryHref } from "@/lib/product-category-url";
import { cn } from "@/lib/utils";

const PRODUCTS_HREF = "/products";

type ProductsNavMenuProps = {
  /** The nav label, already translated by the server Header. */
  label: string;
  /** Category names, already resolved to the active locale by the Header. */
  categories: { id: ProductCategoryId; label: string }[];
  /** Labels the dropdown for screen readers. */
  menuLabel: string;
};

/**
 * The header's Products item: a link that also opens a category dropdown.
 *
 * Base UI's NavigationMenu opens on hover by default, and its trigger takes a
 * `render` element, so the trigger stays a real anchor - clicking it goes to
 * the unfiltered listing while hovering reveals the categories. Menu semantics
 * would have been wrong here; these are links, not commands.
 *
 * It deliberately does not read `useSearchParams` to mark the current category.
 * The header renders on every page, and that hook would force a Suspense
 * boundary onto all of them.
 */
export function ProductsNavMenu({
  label,
  categories,
  menuLabel,
}: ProductsNavMenuProps) {
  // next-intl's usePathname strips the locale prefix, so /th/products -> /products.
  const pathname = usePathname();
  const isActive = isNavLinkActive(PRODUCTS_HREF, pathname);

  return (
    // Rendered as a plain element: the header already provides the <nav>
    // landmark, and the default here would nest a second one inside it.
    <NavigationMenu render={<div />}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            nativeButton={false}
            render={<Link href={PRODUCTS_HREF} />}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "relative px-2",
              isActive &&
                // Matches NavLink's tab indicator so the item sits in the row
                // identically. -bottom-[18px] = (h-16 header - h-7 button) / 2.
                "text-brand hover:text-brand after:absolute after:inset-x-2 after:-bottom-[18px] after:h-0.5 after:rounded-full after:bg-brand after:content-['']",
            )}
          >
            {label}
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul aria-label={menuLabel} className="w-64">
              {categories.map((category) => (
                <li key={category.id}>
                  <NavigationMenuLink
                    render={<Link href={categoryHref(category.id)} />}
                  >
                    {category.label}
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
