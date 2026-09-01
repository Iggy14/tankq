import type { AppLocale } from "@/i18n/routing";
import type { ContentList } from "@/lib/product-sections";
import { cn } from "@/lib/utils";

type ListProps = {
  list: ContentList;
  locale: AppLocale;
  /** 0 for a top-level list, incremented for every level of nesting. */
  depth?: number;
};

/**
 * A nested list inside a <ContentSection>, ordered or not.
 *
 * Recursive: an item's sub-list renders inside that item's `<li>` rather than
 * between items, which is where HTML expects it and what lets a screen reader
 * announce the nesting. The element itself is a real `<ol>` or `<ul>`, so the
 * markers are decoration and stay hidden from assistive tech.
 *
 * A marker sits in a fixed-width slot beside the text - the same `size-6` slot
 * the tick lists elsewhere on the site use - so wrapped lines align under the
 * first line instead of under the bullet. Nested levels are drawn back: a
 * hollow ring rather than a filled dot, a muted number rather than a primary
 * one, so depth reads without introducing a second colour.
 */
export function List({ list, locale, depth = 0 }: ListProps) {
  const ListTag = list.ordered ? "ol" : "ul";
  const nested = depth > 0;

  return (
    <ListTag className="flex flex-col gap-2">
      {list.items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span
            aria-hidden
            className="flex size-6 shrink-0 items-center justify-center"
          >
            {list.ordered ? (
              <span
                className={cn(
                  "font-mono text-sm leading-none font-semibold tabular-nums",
                  nested ? "text-muted-foreground" : "text-primary",
                )}
              >
                {index + 1}.
              </span>
            ) : (
              <span
                className={cn(
                  "size-2 rounded-full",
                  nested ? "border-2 border-primary" : "bg-primary",
                )}
              />
            )}
          </span>

          <div className="flex-1">
            <span className="block text-base leading-relaxed text-pretty text-muted-foreground">
              {item.text[locale]}
            </span>

            {item.children && (
              <div className="mt-2">
                <List list={item.children} locale={locale} depth={depth + 1} />
              </div>
            )}
          </div>
        </li>
      ))}
    </ListTag>
  );
}
