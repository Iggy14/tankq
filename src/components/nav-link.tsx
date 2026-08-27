"use client";

import type { ReactNode } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

// Shared with MobileNav so the desktop nav and the dropdown menu agree on
// which item is "active". next-intl's usePathname strips the locale prefix,
// so /th/products -> /products.
export function isNavLinkActive(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = isNavLinkActive(href, pathname);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      // Styled with the shadcn button recipe rather than <Button render={...}>,
      // which would pull the header across the client boundary.
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "relative px-2",
        isActive &&
          // -bottom-[18px] = (h-16 header - h-7 button) / 2, so the bar lands on
          // the header's bottom border and reads as a tab indicator.
          "text-brand hover:text-brand after:absolute after:inset-x-2 after:-bottom-[18px] after:h-0.5 after:rounded-full after:bg-brand after:content-['']",
      )}
    >
      {children}
    </Link>
  );
}
