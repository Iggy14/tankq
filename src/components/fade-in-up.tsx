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
/** Fast out, gentle settle — no overshoot, so it reads as calm rather than bouncy. */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
/**
 * Fraction of the element that must be on screen before it plays. Small enough
 * that tall sections start as soon as their top edge clears the fold.
 */
const DEFAULT_AMOUNT = 0.2;

/**
 * True inside a <FadeInUpGroup>. Items read it to skip their own viewport
 * trigger and inherit the group's instead — Motion propagates variant names
 * down to any child that declares matching variants and no animation props.
 */
const GroupContext = createContext(false);

type FadeInUpProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait after the trigger. Ignored inside a group, which staggers instead. */
  delay?: number;
  /** Visibility threshold, 0–1. Ignored inside a group. */
  amount?: number;
};

/**
 * Reveals its children with a short fade-in-up the first time they scroll into
 * view. Content that is already on screen at load animates immediately, because
 * the underlying IntersectionObserver reports its first entry on mount.
 *
 * Wrap a single block, or nest several inside <FadeInUpGroup> to have them
 * cascade. Under the OS "reduce motion" setting the slide is dropped and only
 * the fade remains.
 */
export function FadeInUp({
  children,
  className,
  delay = 0,
  amount = DEFAULT_AMOUNT,
}: FadeInUpProps) {
  const prefersReducedMotion = useReducedMotion();
  const inGroup = useContext(GroupContext);

  const variants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : OFFSET_PX },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATION_SECONDS,
        ease: EASE,
        delay: inGroup ? 0 : delay,
      },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      // Inside a group these are omitted so the parent drives the sequence.
      {...(inGroup
        ? {}
        : {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, amount },
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
  /** Visibility threshold, 0–1, for the group as a whole. */
  amount?: number;
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
        viewport={{ once: true, amount }}
      >
        {children}
      </motion.div>
    </GroupContext.Provider>
  );
}
