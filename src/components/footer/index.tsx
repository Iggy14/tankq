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
          instead of showing as a hard line. */}
      <div className="relative bg-foreground text-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 z-0 bg-linear-to-t from-foreground from-10% to-transparent sm:-top-15 sm:h-15"
        />
        <div className="relative z-10 mx-auto w-full max-w-[88rem] px-4 py-14 sm:px-6">
          <LinkColumns />
        </div>

        <div className="border-t border-background/10">
          <p className="mx-auto w-full max-w-[88rem] px-4 py-4 text-xs text-background/60 sm:px-6">
            © {year} {t("common.companyName")}. {t("common.allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}
