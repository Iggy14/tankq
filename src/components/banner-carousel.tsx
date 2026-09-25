"use client";

import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import type { AnimationPlaybackControls, PanInfo } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { ContourBackdrop } from "@/components/contour-backdrop";

/**
 * The pictures, in display order. `key` is the `home.productBanner.<key>` alt.
 * Each has a light-mode and a dark-mode artwork (white vs navy backdrop).
 */
const SLIDES = [
  { key: "slide1", light: "/home/banner-1.webp", dark: "/home/banner-1-dark.webp" },
  { key: "slide2", light: "/home/banner-2.webp", dark: "/home/banner-2-dark.webp" },
] as const;

/** The two artworks of a slide, told apart by theme: only one is displayed. */
const THEME_VARIANTS = [
  { theme: "light", className: "dark:hidden" },
  { theme: "dark", className: "hidden dark:block" },
] as const;

/**
 * The strip is the slides plus a copy of the first one on the end. Advancing
 * off the last real slide slides on to that copy, and once it lands the strip
 * jumps back to the real first slide - the two look identical, so the motion
 * always runs the same way (right to left) instead of rewinding.
 */
const STRIP = [...SLIDES, SLIDES[0]];

/** How long a picture holds before the next one slides in. */
const HOLD_MS = 2800;
/** Length of one slide, in seconds (Motion works in seconds). Slow on purpose. */
const SLIDE_SECONDS = 1.2;
/** A drag past this fraction of the width changes slide. */
const DRAG_THRESHOLD = 0.2;
/** ...or a flick faster than this, in px/s. */
const FLICK_VELOCITY = 500;

/**
 * A near full-width strip of pictures (30px gutters) that slides itself along
 * every few seconds. Visitors can also drag / swipe it. The auto-advance stops
 * while the pointer is over the strip or pressed, so it never moves under
 * someone's hand. Under `prefers-reduced-motion` it never advances by itself
 * and changes slide without the slide animation.
 */
export function BannerCarousel() {
  const t = useTranslations("home.productBanner");
  const prefersReducedMotion = useReducedMotion();

  const containerRef = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);
  // Index into STRIP of the slide on screen (or sliding on). A ref, not state:
  // nothing renders from it, and the timer and gesture handlers need the
  // latest value without being rebuilt on every slide.
  const indexRef = useRef(0);

  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const paused = hovered || pressed;

  const goTo = useCallback(
    (target: number) => {
      const width = containerRef.current?.clientWidth ?? 0;
      const last = STRIP.length - 1;
      const next = Math.max(0, Math.min(target, last));

      indexRef.current = next;
      controlsRef.current?.stop();
      controlsRef.current = animate(x, -next * width, {
        duration: prefersReducedMotion ? 0 : SLIDE_SECONDS,
        ease: [0.4, 0, 0.2, 1],
        onComplete: () => {
          // Landed on the copy of the first slide: swap it for the real one.
          if (next === last) {
            indexRef.current = 0;
            x.set(0);
          }
        },
      });
    },
    [x, prefersReducedMotion],
  );

  useEffect(() => {
    if (paused || prefersReducedMotion) return;

    const timer = setInterval(() => goTo(indexRef.current + 1), HOLD_MS);

    return () => clearInterval(timer);
  }, [paused, prefersReducedMotion, goTo]);

  // Keep the strip on its slide when the viewport is resized.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      x.set(-indexRef.current * container.clientWidth);
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, [x]);

  function handlePointerDown() {
    setPressed(true);

    const release = new AbortController();
    const end = () => {
      setPressed(false);
      release.abort();
    };
    window.addEventListener("pointerup", end, { signal: release.signal });
    window.addEventListener("pointercancel", end, { signal: release.signal });
  }

  function handleDragEnd(_event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) {
    const width = containerRef.current?.clientWidth ?? 0;
    if (!width) return;

    // Where the drag started, as a slide index.
    const start = Math.round(-(x.get() - info.offset.x) / width);

    if (info.offset.x < -width * DRAG_THRESHOLD || info.velocity.x < -FLICK_VELOCITY) {
      goTo(start + 1);
    } else if (info.offset.x > width * DRAG_THRESHOLD || info.velocity.x > FLICK_VELOCITY) {
      goTo(start - 1);
    } else {
      goTo(start);
    }
  }

  return (
    // The outer div only adds plain space below the section. The inner wrapper
    // supplies the gutters and carries the contour lines that peek out around
    // the carousel, by the same amount on top and bottom; the carousel itself
    // is the opaque rounded box inside it.
    <div className="w-full pb-12 sm:pb-14">
      <div className="relative isolate w-full px-7.5 py-4 sm:py-6">
        <ContourBackdrop />
        <section
          ref={containerRef}
          aria-roledescription="carousel"
          aria-label={t("label")}
          className="relative w-full overflow-hidden rounded-xl bg-muted"
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onPointerDown={handlePointerDown}
        >
          <motion.div
            drag="x"
            // The strip is wider than the section; the section is the drag box, so
            // the strip can be pulled exactly to its last slide and no further.
            dragConstraints={containerRef}
            dragElastic={0.12}
            // `goTo` settles the strip itself; Motion's own throw would fight it.
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            // Width is a multiple of the section's, so it can't be a fixed class.
            style={{ x, width: `${STRIP.length * 100}%` }}
            className="flex cursor-grab active:cursor-grabbing"
          >
            {STRIP.map((slide, index) => {
              const { key } = slide;
              const isCopy = index === SLIDES.length;

              return (
                <div
                  key={isCopy ? `${key}-copy` : key}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} / ${SLIDES.length}`}
                  aria-hidden={isCopy || undefined}
                  className="min-w-0 flex-1"
                >
                  {THEME_VARIANTS.map(({ theme, className }) => (
                    <Image
                      key={theme}
                      src={slide[theme]}
                      alt={isCopy ? "" : t(key)}
                      width={2560}
                      height={1280}
                      sizes="100vw"
                      // Off-screen slides sit clipped, so a lazy load would only start
                      // once they slid into view and pop in half way across. Fetch
                      // them all up front, but behind the page's own critical images.
                      loading="eager"
                      fetchPriority="low"
                      draggable={false}
                      className={`h-auto w-full select-none ${className}`}
                    />
                  ))}
                </div>
              );
            })}
          </motion.div>
        </section>
      </div>
    </div>
  );
}
