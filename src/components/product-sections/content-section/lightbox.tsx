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
 * The point of it is the sizing tables, which are pictures of tables: at the
 * width of the text column their figures are too small to read on a phone. So
 * the picture is drawn at its own pixel size, capped only by the viewport
 * height, and the box around it scrolls - a picture wider than the screen is
 * panned rather than shrunk back to something unreadable. On a desktop the
 * whole thing fits and there is nothing to pan.
 *
 * `sizes` asks for the full-resolution source rather than the column-width one
 * the inline picture uses; serving the small file here would defeat the point.
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

      <div className="overflow-auto rounded-lg bg-muted">
        <Image
          src={block.src}
          alt={block.alt[locale]}
          width={block.width}
          height={block.height}
          sizes="64rem"
          className="mx-auto h-auto w-auto max-h-[80vh] max-w-none"
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
