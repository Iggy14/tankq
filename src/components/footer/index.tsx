import { useTranslations } from "next-intl";

import { CtaBand } from "./cta-band";
import { LinkColumns } from "./link-columns";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer>
      <CtaBand />

      {/* Lower footer: a shade darker than the band above. The top edge fades
          from the CTA band's navy into this section's own darker background
          (gradient overlay behind the z-10 content) so the seam dissolves
          instead of showing as a hard line. In dark mode the pair drops to
          navy over black, so the gradient's `from-*` has to flip with it. */}
      {/* text-navy-foreground, not text-background: this band's own bg is a
          fixed hex in light mode, but --background flips dark in .dark, which
          would take this text down with it even though the blue never moves. */}
      <div className="relative bg-[#0594DB] text-navy-foreground dark:bg-black">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 z-0 bg-linear-to-t from-[#0594DB] from-10% to-transparent sm:-top-15 sm:h-15 dark:from-black"
        />
        <div className="relative z-10 mx-auto w-full max-w-[88rem] px-4 py-14 sm:px-6">
          <LinkColumns />
        </div>

        <div className="border-t border-navy-foreground/10">
          <p className="mx-auto w-full max-w-[88rem] px-4 py-4 text-xs text-navy-foreground/60 sm:px-6">
            © {year} {t("common.companyName")}. {t("common.allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}
