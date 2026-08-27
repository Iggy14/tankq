"use client";

import { Menu as MenuIcon } from "lucide-react";

import { isNavLinkActive } from "@/components/nav-link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type MobileNavItem = {
  href: string;
  label: string;
};

type MobileNavProps = {
  items: MobileNavItem[];
  menuLabel: string;
  ctaHref: string;
  ctaLabel: string;
};

export function MobileNav({ items, menuLabel, ctaHref, ctaLabel }: MobileNavProps) {
  // next-intl's usePathname strips the locale prefix, so /th/products -> /products.
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="icon-sm" aria-label={menuLabel} className="lg:hidden">
            <MenuIcon />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="min-w-48 lg:hidden">
        {items.map((item) => (
          <DropdownMenuItem
            key={item.href}
            render={<Link href={item.href} />}
            className={cn(
              isNavLinkActive(item.href, pathname) && "text-brand focus:text-brand",
            )}
          >
            {item.label}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        {/* The header CTA only lives in the navbar from lg up, so the menu carries
            it on mobile — styled as a button so it still reads as the primary action. */}
        <DropdownMenuItem
          render={<Link href={ctaHref} />}
          className="justify-center bg-primary font-medium text-primary-foreground focus:bg-primary/80 focus:text-primary-foreground"
        >
          {ctaLabel}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
