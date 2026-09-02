import Image from "next/image";
import { useTranslations } from "next-intl";

import { FadeInUp } from "@/components/fade-in-up";
import { Button } from "@/components/ui/button";

/** Anchor target for this section's "Our Values" button. */
export const MISSION_VALUES_ID = "mission-values";

/**
 * The four `home.stats` entries shown under the story photo, in display
 * order. A subset of (and in the same order as) `<StatsStrip>`'s five —
 * "support" doesn't get a callout here.
 */
const STORY_STATS = ["experience", "projects", "industries", "warranty"] as const;

/** Splits a trailing "+" (as in "15+") off into its own `text-primary-foreground` span. */
function renderStatValue(value: string) {
  if (!value.endsWith("+")) return value;

  return (
    <>
      {value.slice(0, -1)}
      <span className="text-primary-foreground">+</span>
    </>
  );
}

/**
 * The about page's origin-story band: a title/CTA column on the left, the
 * founding story to its right, a full-bleed photo underneath, and a dark stat
 * band under that. The title row and the photo share a left inset matching
 * the `max-w-6xl` container every other section on this page uses —
 * `calc((100vw-72rem)/2)` is that container's own side margin once the
 * viewport clears 72rem — but nothing here is centred: each bleeds out to the
 * true right edge of the viewport instead of stopping at the container's
 * right margin, and the stat band drops the left inset too, running the full
 * width of the viewport.
 */
export function OurStory() {
  const t = useTranslations("about.story");
  // Reuses the home page's stat copy rather than duplicating it — the numbers
  // are the same facts, just recast here as a dark full-bleed band instead of
  // the five-up white card `<StatsStrip>` uses.
  const tStats = useTranslations("home.stats");

  return (
    <section className="w-full pt-4 pb-16 sm:pt-6 sm:pb-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <FadeInUp
          className="flex flex-col gap-4 text-base leading-relaxed text-pretty text-primary sm:text-lg"
          delay={0.1}
        >
          <p>{t("paragraph1")}</p>
          <p>{t("paragraph2")}</p>
          <p>{t("paragraph3")}</p>
        </FadeInUp>

        <Button
          variant="outline"
          size="lg"
          className="rounded-full border-primary px-5 text-primary hover:bg-primary/10 hover:text-primary"
          nativeButton={false}
          role="link"
          render={<a href={`#${MISSION_VALUES_ID}`} />}
        >
          {t("valuesButton")}
        </Button>
      </div>

      {/* The left padding lives on this outer, non-positioned wrapper — an
          absolutely positioned `fill` image ignores its own parent's padding
          (it fills the padding box), so the inset has to come from one level
          up or it gets swallowed. No right padding here: this is the one
          element on the page meant to bleed to the true viewport edge.
          `relative z-10` lifts it above the stat band below, which the next
          block's negative margin tucks in underneath the photo's bottom
          half. */}
      <FadeInUp
        className="relative z-10 mt-12 pl-4 sm:mt-16 sm:pl-6 lg:pl-[max(1.5rem,calc((100vw-72rem)/2))]"
        delay={0.15}
      >
        <div className="relative h-[280px] w-full sm:h-[360px] lg:h-[480px]">
          <Image
            src="/about/story.jpg"
            alt={t("imageAlt")}
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </FadeInUp>

      {/* The stat band: full-bleed edge-to-edge and pulled up by exactly half
          the photo's height, so its top half sits *behind* the photo (`z-0`,
          under the photo's `z-10`) instead of following it in flow. The photo
          fully covers that overlap everywhere it reaches — the band only
          shows through in the gutter to the photo's left, peeking out beside
          its bottom half — then continues as the visible band below. Extra
          top padding equal to that same overlap keeps the stats themselves
          sitting just under the photo, exactly where they'd land without the
          overlap. Uses the design system's `--primary` token rather than
          navy, so it reads as an accent band distinct from the navy bands
          elsewhere on the site (footer CTA, hero). */}
      <FadeInUp
        className="relative z-0 -mt-[140px] bg-primary px-4 pt-[180px] pb-10 sm:-mt-[180px] sm:px-6 sm:pt-[228px] sm:pb-12 lg:-mt-[240px] lg:px-[max(1.5rem,calc((100vw-72rem)/2))] lg:pt-[296px] lg:pb-14"
        delay={0.2}
      >
        <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 lg:gap-x-12">
          {STORY_STATS.map((key) => (
            <div key={key}>
              <p className="text-xs text-primary-foreground/70 sm:text-sm">
                {tStats(`${key}Label`)}
              </p>
              <p className="mt-2 text-3xl leading-none font-bold text-primary-foreground sm:text-4xl lg:text-5xl">
                {renderStatValue(tStats(`${key}Value`))}
              </p>
            </div>
          ))}
        </div>
      </FadeInUp>
    </section>
  );
}
