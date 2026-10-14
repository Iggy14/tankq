"use client";

import { type ComponentProps, useRef, useState } from "react";

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
import { cn } from "@/lib/utils";

const PRODUCTS_HREF = "/products";
const NAV_VALUE = "products";

export type ProductNavCategory = {
  id: ProductCategoryId;
  label: string;
  /** Where the category title goes (see `categoryHref`). */
  href: ComponentProps<typeof Link>["href"];
  /** Listed indented under the title; empty for a category with 0-1 products. */
  products: { href: string; label: string }[];
};

type ProductsNavMenuProps = {
  /** The nav label, already translated by the server Header. */
  label: string;
  /**
   * Category names, already resolved to the active locale by the Header.
   */
  categories: ProductNavCategory[];
  /** Labels the dropdown for screen readers. */
  menuLabel: string;
};

/**
 * The header's Products item: a link that also opens a category dropdown.
 *
 * Base UI's NavigationMenu opens on hover by default, and its trigger takes a
 * `render` element, so the trigger stays a real anchor - clicking it goes to
 * the unfiltered listing while hovering reveals the categories.
 *
 * Closing is taken over from Base UI here (`value`/`onValueChange` on
 * `NavigationMenu`, controlled) purely so a click on any link inside closes
 * the dropdown immediately, rather than leaving it open over whatever page it
 * just navigated to until the pointer moves away. `pointerInsideRef` tracks
 * hover across the trigger and content so leaving that region still closes
 * with no added delay of its own.
 *
 * The dropdown lists the category titles, each a link; a category with 2+
 * products shows them indented right under it, also as links. Always open - no
 * nested expanders.
 */
export function ProductsNavMenu({
  label,
  categories,
  menuLabel,
}: ProductsNavMenuProps) {
  // next-intl's usePathname strips the locale prefix, so /th/products -> /products.
  const pathname = usePathname();
  const isActive = isNavLinkActive(PRODUCTS_HREF, pathname);

  const [open, setOpen] = useState(false);
  const pointerInsideRef = useRef(false);

  // Closes right away once nothing is hovered - no grace timer here.
  function tryClose() {
    if (!pointerInsideRef.current) {
      setOpen(false);
    }
  }

  // Closes right away regardless of hover state - for a click on any link
  // inside, which should never leave the dropdown lingering on the page it
  // just navigated to.
  function closeNow() {
    pointerInsideRef.current = false;
    setOpen(false);
  }

  function handlePointerEnter() {
    pointerInsideRef.current = true;
  }

  function handlePointerLeave() {
    pointerInsideRef.current = false;
    tryClose();
  }

  return (
    <NavigationMenu
      // Rendered as a plain element: the header already provides the <nav>
      // landmark, and the default here would nest a second one inside it.
      render={
        <div onMouseEnter={handlePointerEnter} onMouseLeave={handlePointerLeave} />
      }
      value={open ? NAV_VALUE : null}
      onValueChange={(value, eventDetails) => {
        if (value !== null) {
          setOpen(true);
          return;
        }
        // Escape and tabbing away are real closes; honor those. Everything
        // else closing (hover-leave, outside press) is decided by this
        // component's own tracking above instead.
        if (eventDetails.reason === "escape-key" || eventDetails.reason === "focus-out") {
          closeNow();
          return;
        }
        eventDetails.cancel();
      }}
    >
      <NavigationMenuList>
        <NavigationMenuItem value={NAV_VALUE}>
          <NavigationMenuTrigger
            nativeButton={false}
            render={<Link href={PRODUCTS_HREF} />}
            aria-current={isActive ? "page" : undefined}
            onClick={closeNow}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "relative h-9 px-3 text-base",
              isActive &&
                // Matches NavLink's tab indicator so the item sits in the row
                // identically. -bottom-[14px] = (h-16 header - h-9 button) / 2.
                "text-brand hover:text-brand after:absolute after:inset-x-3 after:-bottom-[14px] after:h-0.5 after:rounded-full after:bg-brand after:content-['']",
            )}
          >
            {label}
          </NavigationMenuTrigger>

          {/* One onClick here, not one per link: it catches every category
              link inside, since React bubbles clicks through the component
              tree - same as the hover tracking above - not the DOM tree.
              Without this, clicking a link left the dropdown showing over
              whatever page it just navigated to, until the pointer was moved
              away. */}
          <NavigationMenuContent onClick={closeNow}>
            <ul aria-label={menuLabel} className="w-64">
              {categories.map((category) => (
                <li key={category.id}>
                  <NavigationMenuLink render={<Link href={category.href} />}>
                    {category.label}
                  </NavigationMenuLink>
                  {category.products.length > 0 && (
                    <ul
                      aria-label={category.label}
                      className="ml-3 flex flex-col gap-0.5 border-l border-border pl-2"
                    >
                      {category.products.map((product) => (
                        <li key={product.label}>
                          <NavigationMenuLink render={<Link href={product.href} />}>
                            {product.label}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
