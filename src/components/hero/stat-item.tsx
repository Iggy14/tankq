"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "motion/react";

import { FadeInUp } from "@/components/fade-in-up";

import { AnimatedStatValue } from "./animated-stat-value";

type StatItemProps = {
  icon: ReactNode;
  value: string;
  label: string;
};

/**
 * One entry in the <StatsStrip>. The count-up in <AnimatedStatValue> plays
 * exactly once, the first time the item scrolls into view - `once: true` keeps
 * the flag latched, so leaving and re-entering the viewport (or hovering)
 * never replays it.
 */
export function StatItem({ icon, value, label }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: "some", once: true });

  return (
    <FadeInUp>
      <div
        ref={ref}
        className="flex items-center justify-center gap-3 px-5 py-4 sm:px-4 lg:px-5 lg:py-5 find-me-here"
      >
        {icon}
        <div className="flex flex-col">
          <AnimatedStatValue
            value={value}
            start={isInView}
            className="text-2xl font-bold tracking-tight text-primary sm:text-4xl lg:text-4xl xl:text-5xl"
          />
          <span className="text-xs text-navy">{label}</span>
        </div>
      </div>
    </FadeInUp>
  );
}
