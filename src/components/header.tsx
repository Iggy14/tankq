import Image from "next/image";
import { useTranslations } from "next-intl";

import { LanguageSwitcher } from "@/components/language-switcher";
import { NavLink } from "@/components/nav-link";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const navItems = [
  { href: "/", key: "home" },
  { href: "/products", key: "products" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur">
      {/* Equal-width outer columns (1fr each) keep the auto-width nav centred on
          the header itself, not just between the brand and the actions. */}
      <div className="mx-auto grid h-16 w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="justify-self-start">
          <Image
            src="/brand/tankq-logo.png"
            alt={t("common.companyName")}
            width={304}
            height={149}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => (
            <NavLink key={item.key} href={item.href}>
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 justify-self-end">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className={buttonVariants({ size: "sm", className: "hidden sm:inline-flex" })}
          >
            {t("common.ctaButton")}
          </Link>
        </div>
      </div>
    </header>
  );
}
