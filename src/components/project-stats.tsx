import { Factory, MapPin, ShieldCheck, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { FadeInUpGroup } from "@/components/fade-in-up";
import { StatItem } from "@/components/stat-item";

/**
 * The four headline stats, in display order. Each entry names its icon and
 * the `projects.stats.*` key prefix its copy lives under - same
 * list-in-code / copy-in-messages split as `hero/stats-strip.tsx`.
 */
const stats = [
  { key: "projects", Icon: Trophy },
  { key: "industries", Icon: ShieldCheck },
  { key: "experience", Icon: Factory },
  { key: "provinces", Icon: MapPin },
] as const satisfies readonly { key: string; Icon: LucideIcon }[];

/**
 * The projects page's headline metrics bar, sitting between the hero and the
 * case-studies title below it. A full-width band - the same `px-4 sm:px-6`
 * gutters as the page's other sections keep its edges lined up with the hero
 * above. `size="sm"` on `StatItem` keeps the numbers a notch below the page
 * title above them, rather than competing with it. Four stats divide evenly
 * at every breakpoint (2-up, then 4-up) so the row never leaves an orphan
 * cell, unlike the home hero's five-stat strip. Same count-up-on-scroll
 * behaviour as `hero/stats-strip.tsx`, via the shared `StatItem`.
 */
export function ProjectStats() {
  const t = useTranslations("projects.stats");

  return (
    <section className="flex w-full flex-col justify-center bg-background px-4 py-6 sm:px-6">
      <FadeInUpGroup className="mx-auto grid w-full max-w-[88rem] grid-cols-2 items-center divide-y divide-border lg:grid-cols-4 lg:divide-x lg:divide-y-0">
        {stats.map(({ key, Icon }) => (
          <StatItem
            key={key}
            size="sm"
            icon={<Icon className="size-5 shrink-0 text-primary" aria-hidden />}
            value={t(`${key}Value`)}
            label={t(`${key}Label`)}
          />
        ))}
      </FadeInUpGroup>
    </section>
  );
}
