"use client";

import Image from "next/image";
import { Expand } from "lucide-react";
import { useTranslations } from "next-intl";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { AppLocale } from "@/i18n/routing";
import type { ContentImageBlock } from "@/lib/product-sections";

import { Lightbox } from "./lightbox";

type FigureProps = {
  block: ContentImageBlock;
  locale: AppLocale;
};

/**
 * A picture in a <ContentSection>'s flow, filling the text column and opening
 * larger when pressed.
 *
 * The block carries the file's intrinsic size, so the picture keeps its own
 * aspect ratio and reserves the right space before it loads. That is the
 * opposite of <ImageGridSection>, which crops every tile square to keep a grid
 * even - wrong here, where a drawing or a diagram has to be shown whole.
 *
 * Client-side only because the dialog is: the picture itself is still
 * statically optimised, and the enlarged copy in <Lightbox> is not requested
 * until it is opened.
 *
 * A caption is optional; when there is one, `<figure>` ties it to the picture
 * rather than leaving a stray line of text under it. The caption sits outside
 * the trigger so that selecting the text does not open the dialog.
 */
export function Figure({ block, locale }: FigureProps) {
  const t = useTranslations("products");

  return (
    <Dialog>
      <figure>
        <DialogTrigger
          aria-label={t("sectionImage.enlarge")}
          className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl ring-1 ring-foreground/10 transition-shadow outline-none hover:ring-foreground/30 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Image
            src={block.src}
            alt={block.alt[locale]}
            width={block.width}
            height={block.height}
            sizes="(min-width: 768px) 48rem, 100vw"
            className="h-auto w-full"
          />

          <span
            aria-hidden
            className="pointer-events-none absolute right-2 bottom-2 flex size-8 items-center justify-center rounded-full bg-navy/75 text-navy-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <Expand className="size-4" />
          </span>
        </DialogTrigger>

        {block.caption && (
          <figcaption className="mt-2 text-center text-sm leading-relaxed text-pretty text-muted-foreground">
            {block.caption[locale]}
          </figcaption>
        )}
      </figure>

      <Lightbox block={block} locale={locale} />
    </Dialog>
  );
}
