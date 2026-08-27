"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  images: string[];
  /** The product title — used to describe every frame. */
  alt: string;
};

/**
 * The expanded frame on the left with the thumbnail rail beside it on the
 * right; below wide screens the rail drops underneath as a four-across strip.
 * Client-side because picking a frame is local state; the images themselves
 * are still statically optimised.
 *
 * With a single image the rail is dropped and this renders as a plain figure.
 */
export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const t = useTranslations("products");
  const [activeIndex, setActiveIndex] = useState(0);

  // Guards against a data entry with an empty `images` array.
  const active = images[activeIndex] ?? images[0];
  const hasRail = images.length > 1;

  return (
    <div
      className={cn(
        "grid gap-4",
        hasRail && "lg:grid-cols-3 lg:items-start lg:gap-6",
      )}
    >
      <div
        className={cn(
          "overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10",
          hasRail && "lg:col-span-2",
        )}
      >
        <Image
          key={active}
          src={active}
          alt={alt}
          width={1280}
          height={960}
          priority
          sizes="(min-width: 1024px) 56rem, 100vw"
          className="aspect-4/3 w-full object-cover"
        />
      </div>

      {hasRail && (
        <ul className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-3">
          {images.map((image, index) => (
            <li key={image}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={t("gallery.viewImage", { number: index + 1 })}
                aria-current={index === activeIndex ? "true" : undefined}
                className={cn(
                  "block w-full cursor-pointer overflow-hidden rounded-lg bg-muted ring-1 transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  index === activeIndex
                    ? "ring-2 ring-primary"
                    : "ring-foreground/10 hover:ring-foreground/30",
                )}
              >
                <Image
                  src={image}
                  alt=""
                  width={200}
                  height={150}
                  sizes="10rem"
                  className="aspect-4/3 w-full object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
