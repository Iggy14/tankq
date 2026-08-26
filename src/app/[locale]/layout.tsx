import type { Metadata } from "next";
import { Anuphan, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { routing } from "@/i18n/routing";
import "../globals.css";

// Anuphan is a variable Thai/Latin family: smooth, humanist letterforms with
// proper Thai loops and vowel positioning, so th and en copy share one face.
const anuphan = Anuphan({
  variable: "--font-anuphan",
  subsets: ["thai", "latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Pre-render both /th and /en at build time.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Localized site-wide title template + description; each page fills in the title.
export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: {
      default: t("companyName"),
      template: `%s | ${t("companyName")}`,
    },
    description: t("tagline"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  // Guard against unsupported locales reaching the segment directly.
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Required for static rendering: makes the locale available to all
  // next-intl server APIs further down the tree.
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${anuphan.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {/* Without props the provider inherits locale + messages from the
            request config, making them available to client components. */}
        <NextIntlClientProvider>
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
