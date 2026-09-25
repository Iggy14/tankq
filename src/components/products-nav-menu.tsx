"use client";

import { useRef, useState } from "react";

import { isNavLinkActive } from "@/components/nav-link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
const NAV_VALUE = "products";

type CategoryProduct = { slug: string; title: string };

type ProductsNavMenuProps = {
  /** The nav label, already translated by the server Header. */
  label: string;
  /**
   * Category names and their products, already resolved to the active
   * locale by the Header.
   */
  categories: {
    id: ProductCategoryId;
    label: string;
    /** Accessible label for the expand toggle, already interpolated by Header. */
    expandLabel: string;
    products: CategoryProduct[];
  }[];
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
 * A category with 2+ products gets a `ChevronDown` and expands in place
 * (`ui/accordion`) to list them, instead of a second popup - it only opens on
 * click, never hover, matching `MobileNav`'s accordion for the same data. A
 * category with exactly one product skips straight to it via `categoryHref`
 * and gets no arrow; one with none has nothing to list and gets no arrow
 * either.
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
              link and product link inside, since React bubbles clicks
              through the component tree - same as the hover tracking above -
              not the DOM tree. Without this, clicking a link left the
              dropdown showing over whatever page it just navigated to, until
              the pointer was moved away. The expand/collapse toggle below
              stops its own click from reaching here, since that should only
              open its panel, not close the whole dropdown. */}
          <NavigationMenuContent onClick={closeNow}>
            <ul aria-label={menuLabel} className="w-64">
              {categories.map((category) => {
                const isExpandable = category.products.length > 1;

                if (!isExpandable) {
                  return (
                    <li key={category.id}>
                      <NavigationMenuLink
                        render={<Link href={categoryHref(category.id)} />}
                      >
                        {category.label}
                      </NavigationMenuLink>
                    </li>
                  );
                }

                return (
                  <li key={category.id}>
                    <Accordion>
                      <AccordionItem value={category.id} className="border-none">
                        <div className="flex items-center gap-0.5">
                          <NavigationMenuLink
                            render={<Link href={categoryHref(category.id)} />}
                            className="flex-1"
                          >
                            {category.label}
                          </NavigationMenuLink>
                          <AccordionTrigger
                            aria-label={category.expandLabel}
                            onClick={(event) => event.stopPropagation()}
                            className="w-auto flex-none justify-center gap-0 rounded-lg p-2 hover:bg-muted hover:no-underline"
                          />
                        </div>
                        <AccordionContent className="pb-1 pl-2 [&_a]:no-underline">
                          <ul aria-label={category.label} className="flex flex-col gap-0.5 border-l border-border pl-3">
                            {category.products.map((product) => (
                              <li key={product.slug}>
                                <NavigationMenuLink
                                  render={<Link href={`/products/${product.slug}`} />}
                                >
                                  {product.title}
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </li>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
