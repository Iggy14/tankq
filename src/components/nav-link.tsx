"use client";

import type { ReactNode } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

export function NavLink({ href, children }: NavLinkProps) {
  // next-intl's usePathname strips the locale prefix, so /th/products -> /products.
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      // Styled with the shadcn button recipe rather than <Button render={...}>,
      // which would pull the header across the client boundary.
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "relative",
        isActive &&
          // -bottom-[18px] = (h-16 header - h-7 button) / 2, so the bar lands on
          // the header's bottom border and reads as a tab indicator.
          "text-brand hover:text-brand after:absolute after:inset-x-2.5 after:-bottom-[18px] after:h-0.5 after:rounded-full after:bg-brand after:content-['']",
      )}
    >
      {children}
    </Link>
  );
}
