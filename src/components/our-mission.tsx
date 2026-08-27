import Image from "next/image";
import { useTranslations } from "next-intl";

import { FadeInUp } from "@/components/fade-in-up";
import { MISSION_VALUES_ID } from "@/components/our-story";

/**
 * The six `about.mission.items` entries, in display order. Rendered as a
 * 2-column grid on the left so their combined height roughly tracks the
 * square photo beside them instead of running far past it.
 */
const MISSION_ITEMS = [
  "mission",
  "vision",
  "engineering",
  "qc",
  "partners",
  "sustainability",
] as const;

/**
 * The about page's mission band, anchored by `<OurStory>`'s "Our Values"
 * button (`#mission-values`). Mirrors that button's destination id via the
 * shared `MISSION_VALUES_ID` constant rather than a second literal.
 */
export function OurMission() {
  const t = useTranslations("about.mission");

  return (
    <section
      id={MISSION_VALUES_ID}
      className="mx-auto w-full max-w-6xl scroll-mt-16 px-4 py-16 sm:px-6 sm:py-20"
    >
      {/* Explicit `lg:col-start`/`lg:row-start` placement (rather than
          grouping the title with the photo in one flex column) so the title
          sits only above the photo's column while the text grid's top edge
          lines up with the photo's top edge, not the title's. On mobile,
          plain DOM order stacks title, then photo, then text. */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-x-16 lg:gap-y-6">
        <FadeInUp className="lg:col-start-2 lg:row-start-1">
          <h2 className="text-4xl leading-none font-bold tracking-tight sm:text-5xl">
            {t("title")}
          </h2>
        </FadeInUp>

        <FadeInUp
          className="relative aspect-square w-full max-w-md lg:col-start-2 lg:row-start-2"
          delay={0.05}
        >
          <Image
            src="/about/mission.jpg"
            alt={t("imageAlt")}
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 24rem, 100vw"
          />
        </FadeInUp>

        <FadeInUp
          className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-start-1 lg:row-start-2"
          delay={0.1}
        >
          {MISSION_ITEMS.map((key) => (
            <div key={key} className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold">
                {t(`items.${key}.heading`)}
              </h3>
              <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                {t(`items.${key}.text`)}
              </p>
              <div className="mt-2 border-t border-border" />
            </div>
          ))}
        </FadeInUp>
      </div>
    </section>
  );
}
