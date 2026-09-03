import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

import { Tank } from "./tank";

/**
 * The navy band that opens the footer: the closing pitch, the contact CTA and
 * the LINE QR on the left, the breakout tank photo on the right.
 *
 * The tank is tilted and pinned to `-top-*`, so it breaches the band's own top
 * edge into the page above - nothing here may set `overflow-hidden` (or
 * `overflow-y-hidden`) or that breach gets clipped. `overflow-x-clip` is fine
 * (and necessary): the tank is wide enough at large breakpoints to push past
 * the viewport's right edge and force a page-wide horizontal scrollbar
 * without it.
 */
export function CtaBand() {
  const t = useTranslations();

  return (
    <section className="relative overflow-x-clip bg-[#1960C8] text-navy-foreground dark:bg-navy">
      <div className="relative mx-auto grid w-full max-w-[88rem] gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center md:py-24">
        <div className="relative z-10 max-w-lg space-y-5">
          <h2 className="text-3xl leading-[1.15] font-semibold tracking-tight text-balance sm:text-4xl">
            {t("footer.ctaTitle")}{" "}
            <span className="text-white">{t("footer.ctaTitleAccent")}</span>
          </h2>
          <p className="max-w-md text-navy-foreground/80">
            {t("footer.ctaSubtitle")}
          </p>
          <Button
            size="lg"
            className="h-12 gap-2 px-6 text-base has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5"
            nativeButton={false}
            role="link"
            render={<Link href="/contact" />}
          >
            {t("common.ctaButton")}
            <ArrowRight aria-hidden />
          </Button>

          <div className="flex items-center gap-4 pt-2">
            <a
              href="https://page.line.me/597iheyw"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("footer.lineQrTitle")}
              className="flex size-28 shrink-0 items-center justify-center rounded-2xl bg-white p-3 shadow-lg transition-transform hover:scale-105"
            >
              <Image
                src="/contactus/line-qr.PNG"
                alt=""
                width={112}
                height={112}
                className="size-full object-contain"
              />
            </a>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-navy-foreground">
                {t("footer.lineQrTitle")}
              </p>
              <p className="text-sm text-navy-foreground/70">
                {t("footer.contactLine")}
              </p>
            </div>
          </div>
        </div>

        <div className="relative hidden h-[22rem] md:block">
          <div
            aria-hidden
            className="absolute top-1/2 right-12 h-72 w-72 -translate-y-1/2 rounded-full bg-brand/25 blur-3xl"
          />
          <Tank alt={t("footer.tankImageAlt")} />
        </div>
      </div>
    </section>
  );
}
