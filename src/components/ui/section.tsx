import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The two grounds the page alternates between as the visitor scrolls. Navy is
 * the same `--navy` the header, footer and dark chrome already use, so a dark
 * band is a tone on this component rather than a colour spelled out per page.
 *
 * Deliberately not overriding `--muted-foreground` on the navy tone: cards
 * inside a dark band keep their own white surface, and a token override here
 * would leak into them and make their body copy unreadable. Copy that sits
 * directly on navy uses `text-navy-foreground/70` instead.
 */
const toneClasses = {
  light: "bg-background text-foreground",
  // A navy slab shadow cast onto a navy ground is invisible, so the band drops
  // --hard-shadow to near-black for everything inside it. Only the shadow is
  // overridden: --border-strong is still drawn on the white face of a card, so
  // it has to stay dark.
  navy: "bg-navy text-navy-foreground [--hard-shadow:oklch(0.12_0.02_251.65_/_0.5)]",
} as const

type SectionTone = keyof typeof toneClasses

/**
 * A full-bleed horizontal band. It owns the ground and the vertical rhythm
 * only — inner width is still the page's job, so wrap the contents in the
 * usual `mx-auto w-full max-w-6xl`.
 */
function Section({
  className,
  tone = "light",
  ...props
}: React.ComponentProps<"section"> & { tone?: SectionTone }) {
  return (
    <section
      data-slot="section"
      data-tone={tone}
      className={cn(
        "w-full px-4 py-20 sm:px-6",
        toneClasses[tone],
        className
      )}
      {...props}
    />
  )
}

export { Section, type SectionTone }
