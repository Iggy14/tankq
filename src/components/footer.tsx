import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

const footerLinks = [
  { href: "/", key: "home" },
  { href: "/products", key: "products" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-2">
          <p className="text-base font-semibold tracking-tight">{t("common.companyName")}</p>
          <p className="text-sm text-muted-foreground">{t("common.tagline")}</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {footerLinks.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto w-full max-w-6xl px-4 py-4 text-xs text-muted-foreground sm:px-6">
          © {year} {t("common.companyName")}. {t("common.allRightsReserved")}
        </p>
      </div>
    </footer>
  );
}
