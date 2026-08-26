"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/** How long each image stays fully visible before the next one fades in. */
const SLIDE_INTERVAL_MS = 5000;
/** Length of the crossfade, in seconds (Motion works in seconds). */
const CROSSFADE_SECONDS = 1.2;

type HeroSlideshowProps = {
  /** Public-folder paths, shown in order and looped. */
  images: readonly string[];
  className?: string;
};

/**
 * Full-bleed background slideshow: every image is stacked in the same box and
 * only the incoming one animates (0 -> 1) on top of the outgoing one, which is
 * held at full opacity underneath. Cross-fading both layers at once would let
 * the container show through at the midpoint and dim the whole section.
 *
 * The images are decorative — the hero copy carries the meaning — so they are
 * hidden from assistive tech with empty alt text.
 */
export function HeroSlideshow({ images, className }: HeroSlideshowProps) {
  const prefersReducedMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(-1);

  useEffect(() => {
    // Respect the OS "reduce motion" setting: hold on the first image.
    if (prefersReducedMotion || images.length < 2) return;

    const timer = setInterval(() => {
      setCurrent((index) => {
        setPrevious(index);
        return (index + 1) % images.length;
      });
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [images.length, prefersReducedMotion]);

  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden bg-neutral-900", className)}>
      {images.map((src, index) => {
        const isCurrent = index === current;
        const isPrevious = index === previous;

        return (
          <motion.div
            key={src}
            aria-hidden
            className="absolute inset-0"
            // No mount animation: the first slide should already be there.
            initial={false}
            animate={{ opacity: isCurrent || isPrevious ? 1 : 0 }}
            // Only the incoming layer fades; the outgoing one is switched off
            // instantly once it is covered, which is invisible to the viewer.
            transition={
              isCurrent && !prefersReducedMotion
                ? { duration: CROSSFADE_SECONDS, ease: "easeInOut" }
                : { duration: 0 }
            }
            style={{ zIndex: isCurrent ? 2 : isPrevious ? 1 : 0 }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="100vw"
              // The first slide is the LCP element; the rest are in-viewport
              // siblings the browser fetches on its own.
              preload={index === 0}
              className="object-cover"
            />
          </motion.div>
        );
      })}

      {/* Darkens the photography so the hero copy keeps AA contrast on every
          slide, with a heavier wash at the top where the header sits. */}
      <div className="absolute inset-0 z-10 bg-linear-to-b from-black/70 via-black/55 to-black/70" />
    </div>
  );
}
