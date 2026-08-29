"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/** How long each image stays fully visible before the next one fades in. */
const SLIDE_INTERVAL_MS = 5000;
/** Length of the crossfade, in seconds (Motion works in seconds). */
const CROSSFADE_SECONDS = 1.2;

type SlideshowProps = {
  /** Public-folder paths, shown in order and looped. */
  images: readonly string[];
  className?: string;
  /** Applied to every <Image>. For `object-position`, which part of the photo
   *  survives the crop — the panel's own shape stays the caller's business. */
  imageClassName?: string;
};

/**
 * An in-flow photo panel that loops through its images: every one is stacked in
 * the same box and only the incoming one animates (0 -> 1) on top of the
 * outgoing one, which is held at full opacity underneath. Cross-fading both
 * layers at once would let the panel background show through at the midpoint
 * and flash.
 *
 * It owns the stack and the crossfade only — size and shape come from the
 * caller's `className`, so it can be a half-width hero panel here and something
 * else elsewhere.
 *
 * The images are decorative — the hero copy carries the meaning — so they are
 * hidden from assistive tech with empty alt text.
 */
export function Slideshow({
  images,
  className,
  imageClassName,
}: SlideshowProps) {
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
    <div aria-hidden className={cn("relative overflow-hidden bg-muted", className)}>
      {images.map((src, index) => {
        const isCurrent = index === current;
        const isPrevious = index === previous;

        return (
          <motion.div
            key={src}
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
              className={cn("object-cover", imageClassName)}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
