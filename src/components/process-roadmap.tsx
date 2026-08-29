import {
  ClipboardList,
  FlaskConical,
  Layers,
  Thermometer,
  Ruler,
  ShieldCheck,
  PackageCheck,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { FadeInUp } from "@/components/fade-in-up";

/**
 * The eight production/QC stages, in display order. Each entry names its icon
 * and the `quality.processStep<N>` key prefix its copy lives under - same
 * list-in-code / copy-in-messages split as `hero/stats-strip.tsx`.
 */
const steps = [
  { n: 1, Icon: ClipboardList },
  { n: 2, Icon: FlaskConical },
  { n: 3, Icon: Layers },
  { n: 4, Icon: Thermometer },
  { n: 5, Icon: Ruler },
  { n: 6, Icon: ShieldCheck },
  { n: 7, Icon: PackageCheck },
  { n: 8, Icon: Truck },
] as const satisfies readonly { n: number; Icon: LucideIcon }[];

/** viewBox units - width is arbitrary, height sets the wave's aspect ratio. */
const VIEW_WIDTH = 1000;
const VIEW_HEIGHT = 260;
/** Node vertical position, in viewBox units, alternating high / low. */
const NODE_Y_HIGH = 46;
const NODE_Y_LOW = 214;

/**
 * Smooth wave through evenly-spaced, alternating-height points: each segment
 * is a cubic bezier whose control points sit level with their own anchor, so
 * the tangent at every node is horizontal and the curve reads as one
 * continuous ribbon rather than a chain of humps.
 */
function buildWavePath(xs: number[], ys: number[]) {
  let d = `M ${xs[0]} ${ys[0]}`;
  for (let i = 0; i < xs.length - 1; i++) {
    const half = (xs[i + 1] - xs[i]) / 2;
    d += ` C ${xs[i] + half} ${ys[i]}, ${xs[i + 1] - half} ${ys[i + 1]}, ${xs[i + 1]} ${ys[i + 1]}`;
  }
  return d;
}

const nodeXs = steps.map((_, i) => ((i + 0.5) / steps.length) * VIEW_WIDTH);
const nodeYs = steps.map((_, i) => (i % 2 === 0 ? NODE_Y_HIGH : NODE_Y_LOW));
const wavePath = buildWavePath(nodeXs, nodeYs);

/**
 * The copy rows sit on a finer 16-column grid (two units per icon) so each
 * step's text can span roughly double an icon's width - room for the longer
 * titles/descriptions - while staying centred on its own node. `textColStart`
 * clamps the span so the two end nodes don't overflow the row.
 */
const TEXT_COLS = 16;
const TEXT_SPAN = 4;
function textColStart(i: number) {
  return Math.min(Math.max(2 * i, 1), TEXT_COLS - TEXT_SPAN + 1);
}

/**
 * Same-side neighbours (1&3, 2&4, ...) sit two nodes apart, so putting all of
 * them on one line reads as one long, sparse row. Alternating a near/far tier
 * within each side - 1 and 5 hug the wave, 3 and 7 sit further out, and the
 * same for 2/6 and 4/8 - lets each block sit close to its own icon instead.
 */
function tierOf(i: number) {
  return Math.floor(i / 2) % 2;
}
const TIER_NEAR = 0;
const TIER_FAR = 1;

type Translate = ReturnType<typeof useTranslations>;

function StepCopy({ n, t }: { n: number; t: Translate }) {
  return (
    <>
      <span className="text-sm font-black text-primary">0{n}</span>
      <h3 className="mt-1 text-sm font-bold tracking-tight text-primary uppercase xl:text-base">
        {t(`processStep${n}Title`)}
      </h3>
      <p className="mt-1 text-xs leading-snug text-pretty text-muted-foreground xl:text-sm">
        {t(`processStep${n}Description`)}
      </p>
    </>
  );
}

function TextRow({
  show,
  t,
  className,
}: {
  show: (i: number) => boolean;
  t: Translate;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-[repeat(16,minmax(0,1fr))] gap-x-4 ${className ?? ""}`}>
      {steps.map(({ n }, i) => (
        <div
          key={n}
          className="text-center"
          style={{ gridColumn: `${textColStart(i)} / span ${TEXT_SPAN}` }}
        >
          {show(i) ? <StepCopy n={n} t={t} /> : null}
        </div>
      ))}
    </div>
  );
}

/**
 * The FRP production process as a full-width, horizontal chain of numbered
 * icon nodes connected by one wavy ribbon - a horizontal, navy take on
 * `references/process-roadmap.svg`. The ribbon is a decorative SVG behind an
 * HTML grid of circles and copy; both share the same percent-based
 * coordinates so they line up regardless of viewport width. Copy for the
 * high nodes (odd steps) sits above the wave, low nodes (even steps) below,
 * each staggered into a near/far tier (see `tierOf`) so same-side neighbours
 * don't have to spread across one long row to stay legible.
 *
 * Below `lg` the wave has no room to breathe with eight nodes, so it drops to
 * a plain vertical numbered list instead.
 */
export function ProcessRoadmap() {
  const t = useTranslations("quality");

  return (
    <FadeInUp className="mt-10 w-full sm:mt-12">
      {/* Wave layout: lg and up */}
      <div className="hidden lg:block">
        {/* High nodes (1, 3, 5, 7): far tier first, near tier hugs the wave. */}
        <TextRow show={(i) => i % 2 === 0 && tierOf(i) === TIER_FAR} t={t} />
        <TextRow
          show={(i) => i % 2 === 0 && tierOf(i) === TIER_NEAR}
          t={t}
          className="mt-1"
        />

        <div
          className="relative mt-1 w-full"
          style={{ aspectRatio: `${VIEW_WIDTH} / ${VIEW_HEIGHT}` }}
        >
          <svg
            viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full text-navy"
            aria-hidden
          >
            <path
              d={wavePath}
              fill="none"
              stroke="currentColor"
              strokeWidth={22}
              strokeLinecap="round"
            />
          </svg>

          {steps.map(({ n, Icon }, i) => (
            <div
              key={n}
              className="absolute flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-navy xl:size-24"
              style={{
                left: `${(nodeXs[i] / VIEW_WIDTH) * 100}%`,
                top: `${(nodeYs[i] / VIEW_HEIGHT) * 100}%`,
              }}
            >
              <div className="flex size-[82%] items-center justify-center rounded-full bg-background">
                <Icon className="size-7 text-navy xl:size-8" aria-hidden />
              </div>
            </div>
          ))}
        </div>

        {/* Low nodes (2, 4, 6, 8): near tier hugs the wave, far tier last. */}
        <TextRow
          show={(i) => i % 2 === 1 && tierOf(i) === TIER_NEAR}
          t={t}
          className="mt-1"
        />
        <TextRow
          show={(i) => i % 2 === 1 && tierOf(i) === TIER_FAR}
          t={t}
          className="mt-1"
        />
      </div>

      {/* Stacked fallback: below lg */}
      <ol className="mx-auto flex max-w-md flex-col gap-6 lg:hidden">
        {steps.map(({ n, Icon }) => (
          <li key={n} className="flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-navy">
              <div className="flex size-[82%] items-center justify-center rounded-full bg-background">
                <Icon className="size-5 text-navy" aria-hidden />
              </div>
            </div>
            <div>
              <span className="text-xs font-black text-foreground">0{n}</span>
              <h3 className="text-sm font-bold tracking-tight text-navy uppercase">
                {t(`processStep${n}Title`)}
              </h3>
              <p className="mt-1 text-sm leading-snug text-pretty text-muted-foreground">
                {t(`processStep${n}Description`)}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </FadeInUp>
  );
}
