"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "motion/react";

import { AnimatedStatValue } from "@/components/animated-stat-value";
import { FadeInUp } from "@/components/fade-in-up";
import { cn } from "@/lib/utils";

type StatItemProps = {
  icon: ReactNode;
  value: string;
  label: string;
  /**
   * "default" is the home hero's headline size; "sm" is a quieter reading for
   * a row that sits below a page title (e.g. the projects page's stats band),
   * so the numbers don't compete with it.
   */
  size?: "default" | "sm";
};

/**
 * One entry in a stats row (the home hero's <StatsStrip>, the projects page's
 * <ProjectStats>, ...). The count-up in <AnimatedStatValue> plays exactly
 * once, the first time the item scrolls into view - `once: true` keeps the
 * flag latched, so leaving and re-entering the viewport (or hovering) never
 * replays it.
 */
export function StatItem({ icon, value, label, size = "default" }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: "some", once: true });

  return (
    <FadeInUp>
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-3 px-5 py-4 sm:px-4 lg:px-5 lg:py-5 find-me-here",
          size === "sm" && "gap-2 px-4 py-3 lg:px-4 lg:py-3",
        )}
      >
        {icon}
        <div className="flex flex-col">
          <AnimatedStatValue
            value={value}
            start={isInView}
            className={cn(
              "text-2xl font-bold tracking-tight text-primary sm:text-4xl lg:text-4xl xl:text-5xl",
              size === "sm" && "text-xl sm:text-2xl lg:text-2xl xl:text-3xl",
            )}
          />
          <span className="text-xs text-navy">{label}</span>
        </div>
      </div>
    </FadeInUp>
  );
}
