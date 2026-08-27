import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const productLinks = [
  { href: "/products", key: "products" },
  { href: "/quality", key: "quality" },
  { href: "/service", key: "service" },
] as const;

const companyLinks = [
  { href: "/about", key: "about" },
  { href: "/projects", key: "projects" },
  { href: "/blog", key: "blog" },
] as const;

const supportLinks = [
  { href: "/", key: "home" },
  { href: "/contact", key: "contact" },
] as const;

type FooterLinkColumnProps = {
  title: string;
  items: readonly { href: string; key: string }[];
};

/** One link list in the lower footer grid — title plus a stack of nav links. */
function FooterLinkColumn({ title, items }: FooterLinkColumnProps) {
  const t = useTranslations();

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-background">{title}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.key}>
            <Link
              href={item.href}
              className="text-sm text-background/70 transition-colors hover:text-background"
            >
              {t(`nav.${item.key}`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer>
      {/* CTA band: the tank photo is tilted and pinned to `-top-*`, so it
          breaches the band's own top edge into the page above — nothing here
          may set `overflow-hidden` or that breach gets clipped. */}
      <section className="relative bg-navy text-navy-foreground">
        <div className="relative mx-auto grid w-full max-w-[88rem] gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center md:py-24">
          <div className="relative z-10 max-w-lg space-y-5">
            <h2 className="text-3xl leading-[1.15] font-semibold tracking-tight text-balance sm:text-4xl">
              {t("footer.ctaTitle")}{" "}
              <span className="text-brand">{t("footer.ctaTitleAccent")}</span>
            </h2>
            <p className="max-w-md text-navy-foreground/80">{t("footer.ctaSubtitle")}</p>
            <Button
              size="lg"
              nativeButton={false}
              role="link"
              render={<Link href="/contact" />}
            >
              {t("common.ctaButton")}
              <ArrowRight aria-hidden />
            </Button>
          </div>

          <div className="relative hidden h-[22rem] md:block">
            <div
              aria-hidden
              className="absolute top-1/2 right-12 h-72 w-72 -translate-y-1/2 rounded-full bg-brand/25 blur-3xl"
            />
            {/* Deliberately oversized relative to its `h-[22rem]` placeholder
                box: the excess is what pushes it past the band's top edge and
                off the right edge, so it reads as breaking out of the section
                rather than sitting inside it. */}
            <div className="absolute -top-56 right-0 w-[22rem] rotate-[13deg] drop-shadow-2xl sm:-right-6 lg:-top-64 lg:right-0 lg:w-[27rem] xl:w-[30rem]">
              <Image
                src="/footer/tank.png"
                alt={t("footer.tankImageAlt")}
                width={640}
                height={800}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Lower footer: a shade darker than the band above so the two read as
          one dark-navy mass with a visible seam, not two unrelated blocks. */}
      <div className="bg-foreground text-background">
        <div className="mx-auto w-full max-w-[88rem] px-4 py-14 sm:px-6">
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div className="max-w-xs space-y-4">
              <div className="inline-block rounded-lg bg-white px-3 py-2">
                <Image
                  src="/brand/tankq-logo.png"
                  alt={t("common.companyName")}
                  width={304}
                  height={149}
                  className="h-7 w-auto"
                />
              </div>
              <p className="text-sm text-background/70">{t("common.tagline")}</p>
            </div>

            <FooterLinkColumn title={t("footer.columns.products")} items={productLinks} />
            <FooterLinkColumn title={t("footer.columns.company")} items={companyLinks} />
            <FooterLinkColumn title={t("footer.columns.support")} items={supportLinks} />
          </div>
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
