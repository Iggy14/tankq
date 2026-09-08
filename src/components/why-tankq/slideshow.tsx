"use client";

import Image from "next/image";
import { DraftingCompass, ShieldCheck, Truck, Wrench } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { createContext, useContext, useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The four selling points, in display order. Each entry names its icon, the
 * `home.whyUs.*` key prefix its copy lives under, and the photo the showcase
 * panel pairs it with — so adding a reason means adding one row here plus the
 * matching `<key>Title` / `<key>Description` strings in `messages/{en,th}.json`.
 *
 * The slideshow steps through `image` in exactly this order, so row N of this
 * list is card N and photo N.
 */
export const reasons = [
  { key: "engineered", Icon: DraftingCompass, image: "/why/engineered.webp" },
  { key: "warranty", Icon: ShieldCheck, image: "/why/warranty.webp" },
  { key: "delivery", Icon: Truck, image: "/why/delivery.webp" },
  { key: "service", Icon: Wrench, image: "/why/service.webp" },
] as const satisfies readonly {
  key: string;
  Icon: LucideIcon;
  image: string;
}[];

/** How long each photo holds before the next one fades in. */
const SLIDE_INTERVAL_MS = 4000;
/** Length of the unattended crossfade, in seconds (Motion works in seconds). */
const AUTO_CROSSFADE_SECONDS = 0.9;
/** Length of a hover-driven crossfade — short enough to read as an instant swap. */
const HOVER_CROSSFADE_SECONDS = 0.25;

type SlideshowState = {
  /** Index of the photo on screen. */
  current: number;
  /** The layer sitting under the incoming one during a crossfade; -1 before the
   *  first change, when there is nothing to fade away from. */
  previous: number;
  /** How long the incoming layer should take to fade in. */
  crossfadeSeconds: number;
  /** Jump straight to a photo — what hovering a card does. */
  show: (next: number) => void;
  /** True while a card is hovered: stops the timer and shortens the crossfade. */
  setPaused: (paused: boolean) => void;
};

const SlideshowContext = createContext<SlideshowState | null>(null);

export function useSlideshow() {
  const state = useContext(SlideshowContext);

  if (!state) {
    throw new Error(
      "useSlideshow must be used inside <SlideshowProvider>",
    );
  }

  return state;
}

/**
 * Owns the one index that every part of the "Why TankQ" section reads from —
 * the showcase panel, and the section backdrop behind it. Keeping it here is
 * what lets the backdrop show the same photo the panel is on rather than
 * running a second loop of its own.
 *
 * The index cycles on a timer, and hovering a card takes it over — the timer
 * stops and the photo holds. Letting go restarts the timer from the card that
 * was hovered rather than snapping back, so the loop simply carries on from
 * wherever the visitor left it.
 */
export function SlideshowProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(-1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // Respect the OS "reduce motion" setting: hold, and let hover do the work.
    if (paused || prefersReducedMotion) return;

    const timer = setInterval(() => {
      setCurrent((index) => {
        setPrevious(index);
        return (index + 1) % reasons.length;
      });
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [paused, prefersReducedMotion]);

  function show(next: number) {
    setCurrent((index) => {
      if (index !== next) setPrevious(index);
      return next;
    });
  }

  return (
    <SlideshowContext
      value={{
        current,
        previous,
        crossfadeSeconds: paused
          ? HOVER_CROSSFADE_SECONDS
          : AUTO_CROSSFADE_SECONDS,
        show,
        setPaused,
      }}
    >
      {children}
    </SlideshowContext>
  );
}

type SlidesProps = {
  /** Passed straight to every `<Image>` — the caller knows how wide it renders. */
  sizes: string;
  /** Applied to every `<Image>`, on top of `object-cover`. */
  imageClassName?: string;
};

/**
 * The stack of photos itself: every reason's image in the same box, with only
 * the incoming one animating (0 -> 1) on top of the outgoing one, which is held
 * at full opacity underneath. Cross-fading both layers at once would let the
 * box's background show through at the midpoint and flash.
 *
 * Positions itself against the nearest positioned ancestor, so the caller owns
 * the box's size, shape and clipping. Used twice — once by the showcase panel,
 * once by the section backdrop — and both read the same index, so they stay in
 * lockstep for free.
 */
export function Slides({ sizes, imageClassName }: SlidesProps) {
  const prefersReducedMotion = useReducedMotion();
  const { current, previous, crossfadeSeconds } = useSlideshow();

  return (
    <>
      {reasons.map(({ key, image }, index) => {
        const isCurrent = index === current;
        const isPrevious = index === previous;

        return (
          <motion.div
            key={key}
            className="absolute inset-0"
            // No mount animation: the first photo should already be there.
            initial={false}
            animate={{ opacity: isCurrent || isPrevious ? 1 : 0 }}
            transition={
              isCurrent && !prefersReducedMotion
                ? { duration: crossfadeSeconds, ease: "easeInOut" }
                : { duration: 0 }
            }
            style={{ zIndex: isCurrent ? 2 : isPrevious ? 1 : 0 }}
          >
            <Image
              src={image}
              alt=""
              fill
              sizes={sizes}
              className={cn("object-cover", imageClassName)}
            />
          </motion.div>
        );
      })}
    </>
  );
}
