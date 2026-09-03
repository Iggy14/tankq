import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { NavLink } from "@/components/nav-link";
import { ProductsNavMenu } from "@/components/products-nav-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { toAppLocale } from "@/i18n/locale";
import { getAllProductCategories } from "@/lib/product-categories";
import { productsHref } from "@/lib/product-category-url";

const navItems = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/products", key: "products" },
  { href: "/projects", key: "projects" },
  { href: "/quality", key: "quality" },
  { href: "/service", key: "service" },
  { href: "/blog", key: "blog" },
] as const;

export function Header() {
  const t = useTranslations();
  const locale = toAppLocale(useLocale());

  // Category names are content, not chrome, so they are read from the data here
  // once and handed to both menus - the same reason MobileNav takes its labels
  // as props rather than translating them itself.
  const categories = getAllProductCategories().map((category) => ({
    id: category.id,
    label: category.title[locale],
  }));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur">
      {/* Equal-width outer columns (1fr each) keep the auto-width nav centred on
          the header itself, not just between the brand and the actions. */}
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-5 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:justify-normal lg:px-6">
        <Link href="/" className="lg:justify-self-start">
          <Image
            src="/brand/tankq-logo.png"
            alt={t("common.companyName")}
            width={304}
            height={149}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) =>
            item.key === "products" ? (
              <ProductsNavMenu
                key={item.key}
                label={t("nav.products")}
                menuLabel={t("nav.productsMenu")}
                categories={categories}
              />
            ) : (
              <NavLink key={item.key} href={item.href}>
                {t(`nav.${item.key}`)}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2 lg:justify-self-end">
          <ThemeToggle
            darkLabel={t("common.switchToDarkMode")}
            lightLabel={t("common.switchToLightMode")}
          />
          <LanguageSwitcher />
          <Button
            size="lg"
            nativeButton={false}
            role="link"
            render={<Link href="/contact" />}
            className="hidden lg:flex"
            // The theme's light/dark tokens have no "on top of the navy band"
            // surface, so the glass treatment is spelled out here.
          >
            {t("common.ctaButton")}
          </Button>
          <MobileNav
            items={navItems.map((item) => ({
              href: item.href,
              label: t(`nav.${item.key}`),
              // Hover is not available on a phone, so the categories ride along
              // as a nested group under Products.
              children:
                item.key === "products"
                  ? categories.map((category) => ({
                      href: productsHref(category.id),
                      label: category.label,
                    }))
                  : undefined,
            }))}
            menuLabel={t("common.openMenu")}
            ctaHref="/contact"
            ctaLabel={t("common.ctaButton")}
          />
        </div>
      </div>
    </header>
  );
}
