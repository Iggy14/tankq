"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView } from "motion/react";

import { AnimatedStatValue } from "@/components/animated-stat-value";
import { FadeInUp } from "@/components/fade-in-up";

type StatItemProps = {
  icon: ReactNode;
  value: string;
  label: string;
};

/**
 * One entry in the <StatsStrip>. Owns two replay triggers for
 * <AnimatedStatValue>'s count-up:
 * - hovering the item
 * - the item entering the viewport again after having left it - which is
 *   what fires when a visitor navigates to another page and back, since
 *   that's just this element leaving and re-entering view rather than a
 *   guaranteed unmount/remount.
 * The first time it comes into view (page load) is left alone: the mount
 * itself already plays the count-up, so bumping here too would restart it
 * mid-animation.
 */
export function StatItem({ icon, value, label }: StatItemProps) {
  const [replayKey, setReplayKey] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: "some" });
  const hasAppearedBefore = useRef(false);

  useEffect(() => {
    if (!isInView) return;
    if (!hasAppearedBefore.current) {
      hasAppearedBefore.current = true;
      return;
    }
    setReplayKey((key) => key + 1);
  }, [isInView]);

  return (
    <FadeInUp>
      <div
        ref={ref}
        className="flex items-center justify-center gap-3 px-5 py-4 sm:px-4 lg:px-5 lg:py-5"
        onMouseEnter={() => setReplayKey((key) => key + 1)}
      >
        {icon}
        <div className="flex flex-col">
          <AnimatedStatValue
            value={value}
            replayKey={replayKey}
            className="text-2xl font-bold tracking-tight text-primary sm:text-3xl lg:text-4xl"
          />
          <span className="text-xs text-navy">{label}</span>
        </div>
      </div>
    </FadeInUp>
  );
}
