import { Award, Factory, Headset, ShieldCheck, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";

import { FadeInUpGroup } from "@/components/fade-in-up";
import { StatItem } from "@/components/stat-item";

/**
 * The five headline stats, in display order. Each entry names its icon and the
 * `home.stats.*` key prefix its copy lives under — adding a stat means adding
 * one row here plus the matching `<key>Value` / `<key>Label` strings in
 * `messages/{en,th}.json`.
 */
const stats = [
  { key: "experience", Icon: Trophy },
  { key: "projects", Icon: Factory },
  { key: "industries", Icon: ShieldCheck },
  { key: "warranty", Icon: Award },
  { key: "support", Icon: Headset },
] as const satisfies readonly { key: string; Icon: LucideIcon }[];

/**
 * A metrics bar pulled up over the hero's bottom curve with a negative margin,
 * so it lands in the same first screen as the hero rather than waiting below
 * the fold. Five stats sit in one row on desktop, collapsing to two-up then
 * one-up on smaller screens. The bar is one flat, tinted panel spanning the
 * same width as the hero's content — `divide-*` separates the items inside
 * it, but no stat gets its own card.
 */
export function StatsStrip() {
  const t = useTranslations("home.stats");

  return (
    <section className="relative z-30 w-full px-4 sm:px-6">
      <FadeInUpGroup className="mx-auto -mt-20 grid w-full max-w-[88rem] grid-cols-1 divide-y divide-border bg-white sm:-mt-24 sm:grid-cols-2 sm:divide-x lg:-mt-40 lg:grid-cols-5 lg:divide-y-0">
        {stats.map(({ key, Icon }) => (
          <StatItem
            key={key}
            icon={<Icon className="size-6 shrink-0 text-primary" aria-hidden />}
            value={t(`${key}Value`)}
            label={t(`${key}Label`)}
          />
        ))}
      </FadeInUpGroup>
    </section>
  );
}
