"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import Image from "next/image";

import { Link } from "@/i18n/navigation";

/**
 * How far below its resting place the tank starts, in pixels. Much larger than
 * the page's usual `<FadeInUp>` settle on purpose — this is the footer's one
 * hero moment, so the rise has to be impossible to miss.
 */
const RISE_PX = 240;
/** Length of the entrance, in seconds (Motion works in seconds). */
const DURATION_SECONDS = 1.1;
/** Expo-out: covers most of the distance early, then glides to a stop. */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
/** Fraction of the tank that must be on screen before it plays. */
const VIEWPORT_AMOUNT = 0.3;

type FooterTankProps = {
  /** Translated alt text — doubles as the link's accessible name. */
  alt: string;
};

/**
 * The tank photo in the footer CTA band. Deliberately oversized relative to its
 * `h-[22rem]` placeholder box: the excess is what pushes it past the band's top
 * edge and off the right edge, so it reads as breaking out of the section
 * rather than sitting inside it. Nothing up the tree may set `overflow-hidden`
 * or that breach gets clipped.
 *
 * Rises into place the first time it scrolls into view, then scales up on hover
 * and links through to the products page. Under the OS "reduce motion" setting
 * the rise and the hover growth are dropped and only the fade remains.
 */
export function FooterTank({ alt }: FooterTankProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : RISE_PX,
      scale: prefersReducedMotion ? 1 : 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: DURATION_SECONDS, ease: EASE },
    },
  };

  return (
    <div className="absolute -top-20 right-0 w-[21rem] rotate-[13deg] drop-shadow-2xl sm:-right-6 lg:-top-40 lg:right-0 lg:w-[25rem] xl:w-[29rem]">
      {/* The reveal lives on its own element so the hover transform below never
          fights it for the same `transform` property. */}
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: VIEWPORT_AMOUNT }}
      >
        <Link
          href="/products"
          className="block origin-bottom transition-transform duration-500 ease-out hover:scale-[1.06] focus-visible:scale-[1.06] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-brand motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:focus-visible:scale-100"
        >
          <Image
            src="/footer/tank.png"
            alt={alt}
            width={640}
            height={800}
            className="h-auto w-full"
          />
        </Link>
      </motion.div>
    </div>
  );
}
