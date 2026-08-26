"use client";

import Image from "next/image";
import { DraftingCompass, ShieldCheck, Truck, Wrench } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";

import { FadeInUp, FadeInUpGroup } from "@/components/fade-in-up";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * The four selling points, in display order. Each entry names its icon, the
 * `home.whyUs.*` key prefix its copy lives under, and the photo the showcase
 * panel pairs it with — so adding a reason means adding one row here plus the
 * matching `<key>Title` / `<key>Description` strings in `messages/{en,th}.json`.
 *
 * The panel steps through `image` in exactly this order, so row N of this list
 * is card N and photo N.
 */
const reasons = [
  { key: "engineered", Icon: DraftingCompass, image: "/why/engineered.jpg" },
  { key: "warranty", Icon: ShieldCheck, image: "/why/warranty.jpg" },
  { key: "delivery", Icon: Truck, image: "/why/delivery.jpg" },
  { key: "service", Icon: Wrench, image: "/why/service.jpg" },
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

/**
 * The cards and their paired photo panel. Left column on desktop, stacked with
 * the panel underneath on phones.
 *
 * One index drives both halves: the panel cycles it on a timer, and hovering a
 * card takes it over — the timer stops and the photo holds. Letting go restarts
 * the timer from the card that was hovered rather than snapping back, so the
 * loop simply carries on from wherever the visitor left it.
 */
export function WhyTankQShowcase() {
  const t = useTranslations("home.whyUs");
  const prefersReducedMotion = useReducedMotion();

  const [current, setCurrent] = useState(0);
  // The layer sitting under the incoming one during a crossfade; -1 before the
  // first change, when there is nothing to fade away from.
  const [previous, setPrevious] = useState(-1);
  // True while a card is hovered — stops the timer and shortens the crossfade.
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

  const crossfadeSeconds = paused
    ? HOVER_CROSSFADE_SECONDS
    : AUTO_CROSSFADE_SECONDS;

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
      {/* Two-up from the first breakpoint — a 2x2 block beside the panel on
          desktop, and the same block above it on tablets. The group staggers
          the cards, so they arrive in reading order. */}
      <FadeInUpGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {reasons.map(({ key, Icon }, index) => (
          <FadeInUp key={key} className="h-full">
            <Card
              // `active` covers both routes into the highlight: the timer
              // landing on this card, and a visitor hovering it. The lift +
              // deepened ring is the whole treatment; the icon tile flips to
              // the accent colour via `group/card`, which Card already sets.
              data-active={index === current}
              onMouseEnter={() => {
                show(index);
                setPaused(true);
              }}
              onMouseLeave={() => setPaused(false)}
              className="h-full transition-all duration-300 data-[active=true]:-translate-y-1 data-[active=true]:shadow-lg data-[active=true]:ring-foreground/25"
            >
              <CardHeader className="gap-4">
                <span className="flex size-11 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors duration-300 group-data-[active=true]/card:bg-primary group-data-[active=true]/card:text-primary-foreground">
                  <Icon className="size-5" aria-hidden />
                </span>
                <CardTitle className="text-lg">{t(`${key}Title`)}</CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription className="leading-relaxed">
                  {t(`${key}Description`)}
                </CardDescription>
              </CardContent>
            </Card>
          </FadeInUp>
        ))}
      </FadeInUpGroup>

      {/* Fixed 4:3 box on phones; on desktop the aspect ratio is dropped so the
          grid stretches the panel to the full height of the card column.
          Everything here mirrors the active card, so it is hidden from
          assistive tech rather than read out twice. */}
      <FadeInUp
        aria-hidden
        className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10 lg:aspect-auto lg:h-full"
      >
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
              // Only the incoming layer fades, over the outgoing one held at
              // full opacity underneath. Fading both at once would let the
              // panel background show through at the midpoint and flash.
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
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          );
        })}

        {/* Names the photo's card, numbered to match its position in the grid,
            over a scrim that keeps the caption legible on every image. */}
        <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-black/75 via-black/40 to-transparent p-5 pt-16">
          <p className="flex items-baseline gap-2.5 text-sm font-medium text-white sm:text-base">
            <span className="font-mono text-xs text-white/60 tabular-nums">
              {String(current + 1).padStart(2, "0")}
            </span>
            {t(`${reasons[current].key}Title`)}
          </p>
        </div>
      </FadeInUp>
    </div>
  );
}
