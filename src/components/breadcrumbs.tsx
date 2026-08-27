import { Fragment } from "react";
import { HouseIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@/i18n/navigation";

/** One step of the trail. The last one is the current page and carries no href. */
export type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  /** Everything after "Home", which this component prepends itself. */
  items: Crumb[];
};

/**
 * The trail band that sits directly under the sticky header on every page
 * except the homepage — "Home > Products > FRP Vertical Water Tank".
 *
 * Home is always the first crumb, so callers only describe their own depth.
 * Any item with an `href` renders as a link and the final one as plain text
 * marked `aria-current="page"`, which is what the shadcn recipe expects.
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const t = useTranslations();

  return (
    <div className="w-full border-b border-border bg-muted/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6">
        <Breadcrumb aria-label={t("common.breadcrumb")}>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="inline-flex items-center gap-1.5"
                render={<Link href="/" />}
              >
                <HouseIcon className="size-3.5" aria-hidden="true" />
                {t("nav.home")}
              </BreadcrumbLink>
            </BreadcrumbItem>

            {items.map((item, index) => (
              // Separators are siblings of the items, not nested inside them —
              // both render as <li>, and the recipe styles them that way.
              // The index is a stable key: a route's trail is fixed at build
              // time, nothing is inserted or reordered at runtime.
              <Fragment key={index}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {item.href ? (
                    <BreadcrumbLink render={<Link href={item.href} />}>
                      {item.label}
                    </BreadcrumbLink>
                  ) : (
                    // Long product titles would otherwise wrap the band onto a
                    // second line on phones.
                    <BreadcrumbPage className="max-w-[60vw] truncate sm:max-w-none">
                      {item.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
