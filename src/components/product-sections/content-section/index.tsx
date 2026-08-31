import type { AppLocale } from "@/i18n/routing";
import type { ContentSection as ContentSectionData } from "@/lib/product-sections";

import { Figure } from "./figure";
import { List } from "./list";

type ContentSectionProps = {
  section: ContentSectionData;
  locale: AppLocale;
  /** Ties the visible heading to the block flow for screen readers. */
  headingId: string;
};

/**
 * A heading over an ordered run of mixed blocks - paragraphs, pictures and
 * lists in whatever order the data declares.
 *
 * Everything sits in one column at the prose measure, so a picture lines up
 * with the copy around it and the whole section reads as one article rather
 * than a stack of unrelated blocks. The gap here is between blocks; the gap
 * between sections belongs to the page.
 *
 * Paragraphs are left-aligned, unlike <ParagraphSection>'s single centred one:
 * centring reads as a pull quote at one paragraph and as a mess at three.
 *
 * The switch is exhaustive over <ContentBlock>, so adding a kind of block
 * without a branch here is a type error, same discipline as the section
 * registry one level up.
 */
export function ContentSection({
  section,
  locale,
  headingId,
}: ContentSectionProps) {
  return (
    <section aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="text-center text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
      >
        {section.title[locale]}
      </h2>

      <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-6">
        {section.blocks.map((block, index) => {
          switch (block.type) {
            case "paragraph":
              return (
                <p
                  key={index}
                  className="text-base leading-relaxed text-pretty text-muted-foreground"
                >
                  {block.body[locale]}
                </p>
              );

            case "image":
              return <Figure key={index} block={block} locale={locale} />;

            case "list":
              return <List key={index} list={block} locale={locale} />;
          }
        })}
      </div>
    </section>
  );
}
