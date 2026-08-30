"use client";

import { useEffect, useState } from "react";

/** Length of the count-up, in milliseconds. Unhurried, but still a count. */
const DURATION_MS = 1600;
/** Fast start, gentle settle - reads as a quick count rather than a linear tick. */
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

type AnimatedStatValueProps = {
  /** The translated stat value, e.g. "15+", "500+", or "Full Support". */
  value: string;
  className?: string;
  /**
   * Flip to `true` to run the count-up. It plays once per flip; the caller
   * latches this on first viewport entry, so it never replays afterwards.
   */
  start?: boolean;
};

/**
 * Renders a stat's value, counting up from 0 to its leading integer (e.g.
 * "15+" counts 0 -> 15, then the "+" is appended once) the first time `start`
 * turns true. A value with no leading number (e.g. "Full Support") renders
 * as-is, unanimated.
 *
 * Initial render shows the final value - correct for no-JS/crawlers - then,
 * once hydrated, an unstarted value parks at 0 so it is already at the bottom
 * of the count when it scrolls into view. Skips the animation under the OS
 * "reduce motion" setting.
 */
export function AnimatedStatValue({
  value,
  className,
  start = true,
}: AnimatedStatValueProps) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";

  const [display, setDisplay] = useState(target ?? 0);

  useEffect(() => {
    if (target === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const startTime = performance.now();
    let frame: number;

    const tick = (now: number) => {
      // Not started yet: hold at the bottom of the count, so scrolling the
      // value into view begins from 0 rather than flashing the final number.
      if (!start) {
        setDisplay(0);
        return;
      }
      const progress = Math.min((now - startTime) / DURATION_MS, 1);
      setDisplay(Math.round(target * easeOutCubic(progress)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start]);

  if (target === null) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span className={className}>
      {display}
      {suffix}
    </span>
  );
}
