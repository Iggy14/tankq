"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { AppLocale } from "@/i18n/routing";
import type { ContentImageBlock } from "@/lib/product-sections";

type LightboxProps = {
  block: ContentImageBlock;
  locale: AppLocale;
};

/**
 * The enlarged view behind a <Figure>, opened by pressing the picture.
 *
 * The inline picture is capped to the text column's width, which on a big
 * screen can leave it far smaller than the source file - and no bigger than
 * it was inline even when the source has plenty of detail left. This instead
 * fills the available viewport (`object-contain` inside a box sized to it),
 * scaling the picture up as well as down so pressing it always shows a
 * visibly larger, easier to read copy.
 *
 * `sizes` matches the box it fills here rather than the column-width one the
 * inline picture uses, so the browser fetches a copy sized for this bigger
 * box instead of reusing (and stretching) the small inline one.
 *
 * The heading is the picture's `alt`, hidden visually because the picture is
 * right there, but it is what names the dialog for a screen reader.
 */
export function Lightbox({ block, locale }: LightboxProps) {
  const t = useTranslations("products");

  return (
    <DialogContent
      showCloseButton={false}
      className="w-[calc(100vw-1.5rem)] max-w-[calc(100vw-1.5rem)] gap-3 p-3 sm:max-w-[calc(100vw-4rem)]"
    >
      <DialogTitle className="sr-only">{block.alt[locale]}</DialogTitle>

      <div className="relative h-[80vh] w-full rounded-lg bg-muted">
        <Image
          src={block.src}
          alt={block.alt[locale]}
          fill
          sizes="90vw"
          className="object-contain"
        />
      </div>

      {block.caption && (
        <p className="text-center text-sm leading-relaxed text-pretty text-muted-foreground">
          {block.caption[locale]}
        </p>
      )}

      <DialogClose
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className="absolute top-5 right-5 bg-background/80 backdrop-blur-xs"
          />
        }
      >
        <X />
        <span className="sr-only">{t("sectionImage.close")}</span>
      </DialogClose>
    </DialogContent>
  );
}
