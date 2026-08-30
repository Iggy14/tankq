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
 * A metrics bar that fills the hero section's bottom half, below the band's
 * curved edge — from `lg` up it takes an even share of the section's height
 * (`flex-1`) and centres itself in it. Five stats sit in one row on desktop,
 * collapsing to two-up then one-up on smaller screens. The bar is one flat
 * panel spanning the same width as the hero's content — `divide-*` separates
 * the items inside it, but no stat gets its own card.
 */
export function StatsStrip() {
  const t = useTranslations("home.stats");

  return (
    <section className="relative z-30 flex w-full items-center flex-col justify-center px-4 py-10 sm:px-6 lg:flex-1 lg:py-6">
      <FadeInUpGroup className="mx-auto grid w-full items-center max-w-[88rem] grid-cols-1 bg-white sm:grid-cols-2 lg:grid-cols-5">
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
