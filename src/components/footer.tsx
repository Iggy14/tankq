import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { FooterTank } from "@/components/footer-tank";
import { SOCIAL_LINKS } from "@/components/social-links";
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
          may set `overflow-hidden` (or `overflow-y-hidden`) or that breach
          gets clipped. `overflow-x-clip` is fine (and necessary): the tank is
          wide enough at large breakpoints to push past the viewport's right
          edge and force a page-wide horizontal scrollbar without it. */}
      <section className="relative overflow-x-clip bg-navy text-navy-foreground">
        <div className="relative mx-auto grid w-full max-w-[88rem] gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center md:py-24">
          <div className="relative z-10 max-w-lg space-y-5">
            <h2 className="text-3xl leading-[1.15] font-semibold tracking-tight text-balance sm:text-4xl">
              {t("footer.ctaTitle")}{" "}
              <span className="text-brand">{t("footer.ctaTitleAccent")}</span>
            </h2>
            <p className="max-w-md text-navy-foreground/80">
              {t("footer.ctaSubtitle")}
            </p>
            <Button
              size="lg"
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
            <FooterTank alt={t("footer.tankImageAlt")} />
          </div>
        </div>
      </section>

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
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div className="max-w-xs space-y-3">
              <div className="-mt-2 inline-block rounded-lg bg-white px-3 py-2">
                <Image
                  src="/brand/tankq-logo.png"
                  alt={t("common.companyName")}
                  width={304}
                  height={149}
                  className="h-7 w-auto"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-background">
                  {t("footer.contactTitle")}
                </p>
                <p className="text-sm text-background/70">
                  {t("footer.companyName")}
                </p>
                <p className="text-sm text-background/70">
                  {t("footer.companyDescription")}
                </p>
                <p className="text-sm text-background/70">
                  {t("footer.companyAddress")}
                </p>
              </div>
            </div>

            <FooterLinkColumn
              title={t("footer.columns.products")}
              items={productLinks}
            />
            <FooterLinkColumn
              title={t("footer.columns.company")}
              items={companyLinks}
            />

            <div className="space-y-3">
              <p className="text-sm font-semibold text-background">
                {t("footer.columns.contact")}
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-background/70">
                  <MessageCircle aria-hidden className="size-4 shrink-0" />
                  {t("footer.contactLine")}
                </li>
                <li>
                  <a
                    href={`mailto:${t("footer.contactEmail")}`}
                    className="flex items-center gap-2 text-sm text-background/70 transition-colors hover:text-background"
                  >
                    <Mail aria-hidden className="size-4 shrink-0" />
                    {t("footer.contactEmail")}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${t("footer.contactPhone")}`}
                    className="flex items-center gap-2 text-sm text-background/70 transition-colors hover:text-background"
                  >
                    <Phone aria-hidden className="size-4 shrink-0" />
                    {t("footer.contactPhone")}
                  </a>
                </li>
              </ul>

              <div className="flex justify-end gap-2 pt-10 pr-45">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.key}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t(`home.socials.${social.key}`)}
                    className="flex size-8 items-center justify-center rounded-full bg-white p-1.5 shadow-md ring-1 ring-background/10 transition-transform hover:scale-105"
                  >
                    <Image
                      src={social.src}
                      alt=""
                      width={20}
                      height={20}
                      className="size-full object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
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
