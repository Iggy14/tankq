import { cn } from "@/lib/utils";

/**
 * Faint topographic contour lines, drawn behind a section. Absolutely fills its
 * parent, so the parent must be `relative isolate` (the layer sits at `-z-10`,
 * under the parent's own content but above its background). Decorative only.
 *
 * The lines are `public/home/contours.svg` used as a mask, so the colour is a
 * theme token (`bg-primary/..`) rather than baked into the file. Override the
 * tint or opacity through `className`. It drifts slowly and stands still under
 * `prefers-reduced-motion`.
 */
export function ContourBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div
        className={cn(
          "size-full bg-primary/40 mask-[url(/home/contours.svg)] mask-cover mask-center mask-no-repeat motion-safe:animate-contour-drift",
          className,
        )}
      />
    </div>
  );
}
