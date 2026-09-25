import type { Metadata } from "next";
import { Anuphan, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";

import { FloatingContact } from "@/components/floating-contact";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { OrganizationJsonLd } from "@/components/organization-json-ld";
import { ScrollToTop } from "@/components/scroll-to-top";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";
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
    // Lets every page's relative metadata (JSON-LD URLs today; Open Graph
    // images and canonical links if added later) resolve against the real
    // domain instead of being emitted as invalid relative URLs.
    metadataBase: new URL(siteUrl),
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
      // next-themes sets the "dark" class on this element before hydration,
      // via a script it injects itself, so a light/dark mismatch here is
      // expected and this is the tool's documented way to silence it.
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {/* The scroll reveals are server-rendered at opacity: 0 and only
            cleared once Motion hydrates. If the script never runs the page
            would look empty, so drop the hidden start state outright. */}
        <noscript>
          <style>{`[data-fade-in-up]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Without props the provider inherits locale + messages from the
              request config, making them available to client components. */}
          <NextIntlClientProvider>
            <OrganizationJsonLd locale={locale} />
            <ScrollToTop />
            <Header />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
            <FloatingContact />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
