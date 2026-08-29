"use client";

import { useTranslations } from "next-intl";

import { FadeInUp, FadeInUpGroup } from "@/components/fade-in-up";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { reasons, Slides, useSlideshow } from "./slideshow";

/**
 * The cards and their paired photo panel. Left column on desktop, stacked with
 * the panel underneath on phones.
 *
 * One index drives both halves — and the section backdrop besides. It lives in
 * `SlideshowProvider`; this component only reads it and hands hover back to it.
 */
export function Showcase() {
  const t = useTranslations("home.whyUs");
  const { current, show, setPaused } = useSlideshow();

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
        <Slides sizes="(max-width: 1024px) 100vw, 50vw" />

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
