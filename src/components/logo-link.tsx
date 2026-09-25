"use client";

import type { ComponentProps } from "react";

import { zoomToTop } from "@/components/scroll-to-top";
import { Link, usePathname } from "@/i18n/navigation";

// The brand logo: a link home that also scrolls to the top when the visitor is
// already on the home page, where a same-URL link would otherwise do nothing.
export function LogoLink({ onClick, ...props }: Omit<ComponentProps<typeof Link>, "href">) {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      href="/"
      onClick={(event) => {
        onClick?.(event);
        if (pathname === "/") zoomToTop();
      }}
    />
  );
}
