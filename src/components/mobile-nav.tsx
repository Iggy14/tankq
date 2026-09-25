"use client";

import { Menu as MenuIcon, X as XIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { type ComponentProps, useState } from "react";

import { LogoLink } from "@/components/logo-link";
import { isNavLinkActive } from "@/components/nav-link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, usePathname } from "@/i18n/navigation";
import { SOCIAL_LINKS } from "@/lib/social-links";
import { cn } from "@/lib/utils";

type MobileNavLink = {
  href: ComponentProps<typeof Link>["href"];
  label: string;
};

type MobileNavChild = MobileNavLink & {
  /** Accessible label for this child's own expand toggle, when it has grandchildren. */
  expandLabel?: string;
  /** A second level, e.g. a category's products under it - see ProductsNavMenu's desktop equivalent. */
  children?: MobileNavLink[];
};

type MobileNavItem = MobileNavLink & {
  href: string;
  /** Rendered under the item as a collapsible sub-list, for sections with their own sub-pages. */
  children?: MobileNavChild[];
};

type MobileNavProps = {
  items: MobileNavItem[];
  menuLabel: string;
  closeLabel: string;
  logoAlt: string;
  ctaHref: string;
  ctaLabel: string;
};

export function MobileNav({
  items,
  menuLabel,
  closeLabel,
  logoAlt,
  ctaHref,
  ctaLabel,
}: MobileNavProps) {
  // next-intl's usePathname strips the locale prefix, so /th/products -> /products.
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Only the social row's aria-labels come from here - everything else is
  // passed down as props so Header (a server component) resolves it once.
  const t = useTranslations();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="outline" size="icon-sm" aria-label={menuLabel} className="lg:hidden">
            <MenuIcon />
          </Button>
        }
      />
      <SheetContent
        side="right"
        showCloseButton={false}
        className="gap-0 p-0 data-[side=right]:w-1/2 data-[side=right]:min-w-[260px] lg:hidden"
      >
        <SheetTitle className="sr-only">{menuLabel}</SheetTitle>

        <SheetHeader className="flex-row items-center justify-between gap-2 border-b border-border p-4">
          <LogoLink onClick={() => setOpen(false)}>
            <Image
              src="/brand/tankq-logo.png"
              alt={logoAlt}
              width={304}
              height={149}
              className="h-7 w-auto"
            />
          </LogoLink>
          <SheetClose
            render={<Button variant="ghost" size="icon-sm" aria-label={closeLabel} />}
          >
            <XIcon />
          </SheetClose>
        </SheetHeader>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
          {items.map((item) =>
            item.children ? (
              <Accordion key={item.href}>
                <AccordionItem value={item.href} className="border-none">
                  <AccordionTrigger
                    className={cn(
                      "rounded-md px-3 py-3 text-base font-medium hover:bg-muted hover:no-underline data-open:text-brand",
                      isNavLinkActive(item.href, pathname) && "text-brand",
                    )}
                  >
                    {item.label}
                  </AccordionTrigger>
                  <AccordionContent className="pb-1 pl-3 [&_a]:no-underline">
                    <div className="flex flex-col gap-0.5 border-l border-border pl-3">
                      {item.children.map((child) =>
                        child.children ? (
                          <Accordion key={child.label}>
                            <AccordionItem value={child.label} className="border-none">
                              <div className="flex items-center gap-0.5">
                                <Link
                                  href={child.href}
                                  onClick={() => setOpen(false)}
                                  className="flex-1 rounded-md px-2 py-2 text-base text-muted-foreground no-underline hover:bg-muted hover:text-foreground"
                                >
                                  {child.label}
                                </Link>
                                <AccordionTrigger
                                  aria-label={child.expandLabel}
                                  className="w-auto flex-none justify-center gap-0 rounded-md p-2 hover:bg-muted hover:no-underline"
                                />
                              </div>
                              <AccordionContent className="pb-1 pl-2 [&_a]:no-underline">
                                <div className="flex flex-col gap-0.5 border-l border-border pl-3">
                                  {child.children.map((product) => (
                                    <Link
                                      key={product.label}
                                      href={product.href}
                                      onClick={() => setOpen(false)}
                                      className="rounded-md px-2 py-2 text-base text-muted-foreground no-underline hover:bg-muted hover:text-foreground"
                                    >
                                      {product.label}
                                    </Link>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        ) : (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="rounded-md px-2 py-2 text-base text-muted-foreground no-underline hover:bg-muted hover:text-foreground"
                          >
                            {child.label}
                          </Link>
                        ),
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-3 text-base font-medium hover:bg-muted",
                  isNavLinkActive(item.href, pathname) && "text-brand",
                )}
              >
                {item.label}
              </Link>
            ),
          )}

          {/* Sits directly under Service - the last item above - so the extra
              top padding sets it apart as its own row instead of another link. */}
          <div className="flex items-center gap-3 px-3 pt-8">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.key}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(`home.socials.${social.key}`)}
                className="flex size-8 items-center justify-center overflow-hidden rounded-[22%] transition-transform hover:scale-105"
              >
                <Image
                  src={social.src}
                  alt=""
                  width={32}
                  height={32}
                  className="size-full object-cover"
                />
              </a>
            ))}
          </div>
        </nav>

        {/* The header CTA only lives in the navbar from lg up, so the menu carries
            it on mobile - styled as a button so it still reads as the primary action. */}
        <div className="border-t border-border p-4">
          <Button
            size="lg"
            nativeButton={false}
            role="link"
            render={<Link href={ctaHref} onClick={() => setOpen(false)} />}
            className="w-full"
          >
            {ctaLabel}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
