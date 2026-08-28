"use client";

import { useEffect, useState } from "react";

/** Length of the count-up, in milliseconds. Short and snappy, not a slow crawl. */
const DURATION_MS = 900;
/** Fast start, gentle settle - reads as a quick count rather than a linear tick. */
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

type AnimatedStatValueProps = {
  /** The translated stat value, e.g. "15+", "500+", or "Full Support". */
  value: string;
  className?: string;
  /**
   * Bump this (e.g. ++ on hover) to replay the count-up. Left at its default,
   * the value still counts up once on mount.
   */
  replayKey?: number;
};

/**
 * Renders a stat's value, counting up from 0 to its leading integer (e.g.
 * "15+" counts 0 -> 15, then the "+" is appended once) whenever `replayKey`
 * changes, including on mount. A value with no leading number (e.g. "Full
 * Support") renders as-is, unanimated.
 *
 * Initial render shows the final value - correct for no-JS/crawlers - then the
 * mount effect drives it back down to 0 and counts back up, so hydration never
 * flashes "0". Skips the animation under the OS "reduce motion" setting.
 */
export function AnimatedStatValue({
  value,
  className,
  replayKey = 0,
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
      const progress = Math.min((now - startTime) / DURATION_MS, 1);
      setDisplay(Math.round(target * easeOutCubic(progress)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, replayKey]);

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
