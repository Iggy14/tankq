import { MoveDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { FadeInUp, FadeInUpGroup } from "@/components/fade-in-up";
import { FEATURED_PRODUCTS_ID } from "@/components/featured-products";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

import { Slideshow } from "./slideshow";
import { StatsStrip } from "./stats-strip";

// Rotating hero backdrop; the slideshow loops through these in order.
const heroImages = [
  "/hero/tankq-hero-1.jpg",
  "/hero/tankq-hero-2.jpg",
  "/hero/tankq-hero-3.jpg",
  "/hero/tankq-hero-4.webp",
] as const;

/**
 * The home page's opening screen: one full viewport (minus the 4rem sticky
 * header), of which only the top half is the navy hero band. The stats strip
 * fills the bottom half, pulled up over the band's curved edge with its own
 * negative margin so both land on the same first screen.
 */
export function Hero() {
  const t = useTranslations();

  return (
    <section className="flex w-full flex-col lg:min-h-[calc(100svh-4rem)]">
      {/* The band, and the section's top half — from `lg` up it and the stats
          strip below split the section's height evenly (`flex-1` on both).
          Everything inside dissolves into this one navy, so the photo and the
          flat colour never show a seam. `isolate` keeps the stacking order
          local; `overflow-hidden` clips the photo to the band. */}
      <div className="relative isolate flex w-full flex-col overflow-hidden bg-navy text-navy-foreground lg:flex-1">
        {/* Full-bleed on phones; from `lg` up it is anchored to the right edge
            and given 90% of the band, leaving a 10% strip of flat navy on the
            left. Widen/narrow the photo here — `lg:w-[…]` is the only knob. */}
        <div className="absolute inset-0 z-0 lg:left-auto lg:w-[90%]">
          <Slideshow
            images={heroImages}
            className="absolute inset-0"
            // From `lg` up the crop window sits below centre, so the panel keeps
            // more of each photo's bottom half. Phones stay centred.
            imageClassName="aspect-video lg:object-[50%_60%]"
          />

          {/* On phones, one flat navy tint over the whole photo — no gradient.
              From `lg` up that flat colour is dropped and the dissolve takes
              over: measured across the photo panel (not the band), solid navy
              for the first stretch so the panel's left edge never shows a seam
              against the flat navy beside it, then thinning across to the right.
              It never reaches `transparent` — the photo keeps a navy cast the
              whole way over, and a `transparent` stop would pull the midpoint
              towards grey. */}
          <div
            aria-hidden
            className="absolute inset-0 z-10 bg-navy/80 lg:bg-transparent lg:bg-linear-to-r lg:from-navy lg:from-20% lg:via-navy/50 lg:via-45% lg:to-navy/0 lg:to-90%"
          />
        </div>

        {/* One wash over band and photo alike — a lit corner behind the copy and
            a deeper navy in the far corner. Applying it above the dissolve keeps
            both sides of the band the exact same colour. */}
        <div
          aria-hidden
          className="absolute inset-0 z-10 bg-linear-to-br from-primary/40 via-navy/20 via-45% to-navy/65"
        />

        {/* On load this is already on screen, so the cascade plays straight
            away — it carries the layout (flex/gap) the band used to hold. */}
        <FadeInUpGroup className="relative z-20 mx-auto flex w-full max-w-[88rem] flex-col items-start gap-6 px-4 pt-14 pb-24 sm:px-6 lg:flex-1 lg:justify-center lg:pt-16 lg:pb-28">
          <FadeInUp>
            <p className="text-sm font-semibold tracking-[0.2em] text-brand uppercase">
              {t("home.heroEyebrow")}
            </p>
          </FadeInUp>

          <FadeInUp>
            <h1 className="max-w-lg text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl xl:text-6xl">
              {t("home.heroTitle")}
              <br />
              <span className="text-brand">{t("home.heroTitleAccent")}</span>
            </h1>
          </FadeInUp>

          <FadeInUp>
            <p className="max-w-lg text-base leading-relaxed text-pretty text-navy-foreground/80">
              {t("home.heroSubtitle")}
            </p>
          </FadeInUp>

          <FadeInUp className="flex flex-wrap gap-3 mt-6">
            {/* `render` is Base UI's composition prop (the equivalent of Radix's
              `asChild`); `nativeButton={false}` tells it the rendered element is
              an <a>, not a <button>. That shim also stamps role="button", so
              each CTA restores role="link" — these navigate, they don't act. */}
            {/* Same-page jump rather than a route change: it drops the visitor
              on the featured products further down. The smooth scroll comes
              from `scroll-behavior` in globals.css. */}
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              role="link"
              render={<a href={`#${FEATURED_PRODUCTS_ID}`} />}
              // The theme's light/dark tokens have no "on top of the navy band"
              // surface, so the glass treatment is spelled out here.
              className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
            >
              {t("home.heroCta")}
              <MoveDown aria-hidden />
            </Button>

            <Button
              size="lg"
              nativeButton={false}
              role="link"
              render={<Link href="/contact" />}
            >
              {t("common.ctaButton")}
            </Button>
          </FadeInUp>
        </FadeInUpGroup>

        {/* The band's bottom edge: a shallow sweep rising to the right, drawn in
            the page ground so it reads as the white below cutting into the navy.
            `preserveAspectRatio="none"` lets it stretch to any width. */}
        <svg
          aria-hidden
          viewBox="0 0 1440 96"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 z-30 h-10 w-full fill-background sm:h-14 lg:h-20"
        >
          <path d="M0 96V70c245 6 452 2 686-19C920 30 1180 12 1440 0v96H0Z" />
        </svg>
      </div>

      {/* The section's bottom half. */}
      <StatsStrip />
    </section>
  );
}
