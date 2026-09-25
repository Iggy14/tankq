import { getTranslations } from "next-intl/server";

import { JsonLd } from "@/components/json-ld";
import { SOCIAL_LINKS } from "@/lib/social-links";
import { siteUrl } from "@/lib/site";

/**
 * Site-wide schema.org business record (name, address, phone, logo, social
 * profiles). Reads the same footer strings the page shows, so the structured
 * data can't drift from the visible contact details.
 */
export async function OrganizationJsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "footer" });

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: t("companyName"),
        alternateName: "TankQ",
        url: `${siteUrl}/${locale}`,
        logo: `${siteUrl}/brand/tankq-logo.png`,
        description: t("companyDescription"),
        email: t("contactEmail"),
        telephone: `+66${t("contactPhone").replace(/^0/, "")}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: t("companyAddress"),
          addressCountry: "TH",
        },
        sameAs: SOCIAL_LINKS.map((link) => link.href),
      }}
    />
  );
}
