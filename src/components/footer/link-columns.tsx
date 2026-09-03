import { Mail, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { SOCIAL_LINKS } from "@/lib/social-links";

/**
 * The two nav columns, in display order. `key` is the `nav.*` translation key
 * the label comes from, so these reuse the header's wording rather than
 * carrying a second copy of it.
 */
const productLinks = [
  { href: "/products", key: "products" },
  { href: "/quality", key: "quality" },
  { href: "/service", key: "service" },
] as const;

const companyLinks = [
  { href: "/about", key: "about" },
  { href: "/projects", key: "projects" },
] as const;

type LinkColumnProps = {
  title: string;
  items: readonly { href: string; key: string }[];
};

/** One link list in the grid - title plus a stack of nav links. */
function LinkColumn({ title, items }: LinkColumnProps) {
  const t = useTranslations();

  return (
    <div className="space-y-3">
      <p className="text-[1.1375rem] font-semibold text-navy-foreground">{title}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.key}>
            <Link
              href={item.href}
              className="text-[1.1375rem] text-navy-foreground/70 transition-colors hover:text-navy-foreground"
            >
              {t(`nav.${item.key}`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The lower footer's grid: the brand block and company details, the two nav
 * columns, then the contact details with the social icon row under them.
 */
export function LinkColumns() {
  const t = useTranslations();

  return (
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
          <p className="text-sm font-semibold text-navy-foreground">
            {t("footer.contactTitle")}
          </p>
          <p className="text-sm text-navy-foreground/70">
            {t("footer.companyName")}
          </p>
          <p className="text-sm text-navy-foreground/70">
            {t("footer.companyDescription")}
          </p>
          <p className="text-sm text-navy-foreground/70">
            {t("footer.companyAddress")}
          </p>
        </div>
      </div>

      <LinkColumn title={t("footer.columns.products")} items={productLinks} />
      <LinkColumn title={t("footer.columns.company")} items={companyLinks} />

      <div className="space-y-3">
        <p className="text-[1.1375rem] font-semibold text-navy-foreground">
          {t("footer.columns.contact")}
        </p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-[1.1375rem] text-navy-foreground/70">
            <MessageCircle aria-hidden className="size-5 shrink-0" />
            {t("footer.contactLine")}
          </li>
          <li>
            <a
              href={`mailto:${t("footer.contactEmail")}`}
              className="flex items-center gap-2 text-[1.1375rem] text-navy-foreground/70 transition-colors hover:text-navy-foreground"
            >
              <Mail aria-hidden className="size-5 shrink-0" />
              {t("footer.contactEmail")}
            </a>
          </li>
          <li>
            <a
              href={`tel:${t("footer.contactPhone")}`}
              className="flex items-center gap-2 text-[1.1375rem] text-navy-foreground/70 transition-colors hover:text-navy-foreground"
            >
              <Phone aria-hidden className="size-5 shrink-0" />
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
              className="flex size-8 items-center justify-center rounded-full bg-white p-1.5 shadow-md ring-1 ring-navy-foreground/10 transition-transform hover:scale-105"
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
  );
}
