import { Fragment } from "react";
import { HouseIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@/i18n/navigation";
import { siteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * One step of the trail. `href` is the app-internal, locale-less path (what
 * `Link` expects) — the same value on the last crumb also names the current
 * page for the JSON-LD below, even though that crumb never renders as a link.
 */
export type Crumb = {
  label: string;
  href?: string;
};

function absoluteHref(locale: string, href: string) {
  return `${siteUrl}/${locale}${href === "/" ? "" : href}`;
}

type BreadcrumbsProps = {
  /** Everything after "Home", which this component prepends itself. */
  items: Crumb[];
  /**
   * Aligns the trail to the wider `88rem` container instead of the `6xl` most
   * pages use. Pass it on a page whose content runs wide, or the trail sits
   * indented from the heading beneath it.
   */
  wide?: boolean;
};

/**
 * The trail band that sits directly under the sticky header on every page
 * except the homepage — "Home > Products > FRP Vertical Water Tank".
 *
 * Home is always the first crumb, so callers only describe their own depth.
 * Any item with an `href` renders as a link and the final one as plain text
 * marked `aria-current="page"`, which is what the shadcn recipe expects.
 */
export function Breadcrumbs({ items, wide = false }: BreadcrumbsProps) {
  const t = useTranslations();
  const locale = useLocale();

  // Google reads this, not the visible <nav>, for the "site.com > Products >
  // ..." trail it shows under a search result. Position 1 is always Home; the
  // rest mirror `items` in order.
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("nav.home"),
        item: absoluteHref(locale, "/"),
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        ...(item.href ? { item: absoluteHref(locale, item.href) } : {}),
      })),
    ],
  };

  return (
    <div className="w-full border-b border-border bg-muted/40">
      {/* `<` is escaped so a label or href containing "</script>" can't break
          out of the block; every value here is our own content/route data,
          never arbitrary user input, but this keeps it safe regardless. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbList).replace(/</g, "\\u003c"),
        }}
      />
      <div
        className={cn(
          "mx-auto w-full px-4 py-3 sm:px-6",
          wide ? "max-w-[88rem]" : "max-w-6xl",
        )}
      >
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

            {items.map((item, index) => {
              // The last crumb is always the current page: plain text, never
              // a link, even though it now carries `href` too (for the
              // JSON-LD above).
              const isLast = index === items.length - 1;

              return (
                // Separators are siblings of the items, not nested inside them —
                // both render as <li>, and the recipe styles them that way.
                // The index is a stable key: a route's trail is fixed at build
                // time, nothing is inserted or reordered at runtime.
                <Fragment key={index}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {!isLast && item.href ? (
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
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
