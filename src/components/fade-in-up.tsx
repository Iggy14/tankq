"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { createContext, useContext, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/** How far below its resting place the content starts, in pixels. */
const OFFSET_PX = 16;
/** Length of one item's entrance, in seconds (Motion works in seconds). */
const DURATION_SECONDS = 0.45;
/** Gap between consecutive items inside a <FadeInUpGroup>. */
const STAGGER_SECONDS = 0.08;
/** Fast out, gentle settle - no overshoot, so it reads as calm rather than bouncy. */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
/**
 * Trigger line: the entrance plays as soon as any part of the element crosses
 * 64px above the bottom of the viewport.
 *
 * Deliberately an inset rather than a "fraction of the element" threshold.
 * IntersectionObserver caps the reported ratio at viewport height / element
 * height, so a fractional threshold is physically unreachable for anything
 * taller than a few screens: the products grid at one column, or a long detail
 * page section, would never fire and would sit at opacity 0 forever on narrow
 * viewports. An inset is independent of how tall the element is.
 */
const VIEWPORT_MARGIN = "0px 0px -64px 0px";
/** Any sliver of the element counts, for the reason above. */
const DEFAULT_AMOUNT = "some" as const;

type ViewportAmount = number | "some" | "all";

/**
 * True inside a <FadeInUpGroup>. Items read it to skip their own viewport
 * trigger and inherit the group's instead - Motion propagates variant names
 * down to any child that declares matching variants and no animation props.
 */
const GroupContext = createContext(false);

/**
 * Shared viewport config. `once` so nothing re-hides after it has been seen.
 */
function viewportOptions(amount: ViewportAmount) {
  return { once: true, amount, margin: VIEWPORT_MARGIN } as const;
}

type FadeInUpProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait after the trigger. Ignored inside a group, which staggers instead. */
  delay?: number;
  /**
   * How much of the element must be in view. Prefer the default; a numeric
   * fraction cannot be reached by elements taller than a few viewports.
   */
  amount?: ViewportAmount;
  /** Entrance length in seconds. Defaults to DURATION_SECONDS; raise it for a slower, calmer reveal. */
  duration?: number;
};

/**
 * Reveals its children with a short fade-in-up the first time they scroll into
 * view. Content that is already on screen at load animates immediately, because
 * the underlying IntersectionObserver reports its first entry on mount.
 *
 * Wrap a single block, or nest several inside <FadeInUpGroup> to have them
 * cascade. Under the OS "reduce motion" setting the slide is dropped and only
 * the fade remains.
 *
 * The hidden start state is server-rendered as an inline opacity: 0, so the
 * <noscript> rule in the locale layout clears it for browsers that never run
 * the script.
 */
export function FadeInUp({
  children,
  className,
  delay = 0,
  amount = DEFAULT_AMOUNT,
  duration = DURATION_SECONDS,
}: FadeInUpProps) {
  const prefersReducedMotion = useReducedMotion();
  const inGroup = useContext(GroupContext);

  const variants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : OFFSET_PX },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: EASE,
        delay: inGroup ? 0 : delay,
      },
    },
  };

  return (
    <motion.div
      data-fade-in-up
      className={cn(className)}
      variants={variants}
      // Inside a group these are omitted so the parent drives the sequence.
      {...(inGroup
        ? {}
        : {
            initial: "hidden",
            whileInView: "visible",
            viewport: viewportOptions(amount),
          })}
    >
      {children}
    </motion.div>
  );
}

type FadeInUpGroupProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before the first child starts. */
  delay?: number;
  /** See <FadeInUp>. Groups wrap whole grids, so the default matters most here. */
  amount?: ViewportAmount;
};

/**
 * Triggers once when it scrolls into view, then plays its nested <FadeInUp>
 * children one after another. The group itself never moves, so it is safe to
 * give it the layout classes (grid, flex, gap) the children used to sit under.
 */
export function FadeInUpGroup({
  children,
  className,
  delay = 0,
  amount = DEFAULT_AMOUNT,
}: FadeInUpGroupProps) {
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: STAGGER_SECONDS, delayChildren: delay },
    },
  };

  return (
    <GroupContext.Provider value={true}>
      <motion.div
        className={cn(className)}
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions(amount)}
      >
        {children}
      </motion.div>
    </GroupContext.Provider>
  );
}
