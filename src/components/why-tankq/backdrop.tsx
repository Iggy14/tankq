"use client";

import { Slides } from "./slideshow";

/**
 * The section's full-bleed backdrop: the same photo the showcase panel is
 * showing, left legible and only knocked back with a light wash of the page
 * ground. It shares the panel's index, so the two always change together.
 *
 * Purely decorative — the cards carry the meaning — so the whole layer is
 * hidden from assistive tech.
 */
export function Backdrop() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      {/* Softened by a hair — not to hide the photo, but so it reads as ground
          rather than competing with the sharp copy of itself in the panel. The
          scale is only there to keep that blur off the section's edges. */}
      <Slides sizes="100vw" imageClassName="aspect-video scale-105" />

      {/* The wash: a light coat of page ground over the whole thing — enough to
          take the glare off without losing the photo — then a second pass that
          runs it back to solid at the top and bottom so the section dissolves
          into the ones either side instead of ending on a hard edge.

          Both need `z-10` to clear the slide layers, which carry an inline
          z-index of 2 while they crossfade; without it the photo paints over
          the wash and changing these classes does nothing at all. */}
      <div className="absolute inset-0 z-10 bg-navy/70" />
      <div className="absolute inset-0 z-10 bg-linear-to-b from-background from-5% via-transparent to-background to-95%" />
    </div>
  );
}
