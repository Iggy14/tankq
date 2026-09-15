import { Check, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { FadeInUp } from "@/components/fade-in-up";
import { Card, CardContent } from "@/components/ui/card";

/**
 * The five prep-info bullets, in display order. Each names the `contact.prepare.*`
 * key its copy lives under - adding a bullet means adding one row here plus the
 * matching string in `messages/{en,th}.json`.
 */
const prepareItems = [
  "chemical",
  "capacity",
  "temperature",
  "location",
  "drawing",
] as const;

/**
 * The contact-details rows shown under the logo. `labelKey` names the
 * `contact.*` string for the row's bold heading; `valueKey` names the
 * `footer.*` string that already holds the raw value, so this card reuses
 * the footer's copy instead of duplicating it.
 */
const contactRows = [
  { key: "address", icon: MapPin, labelKey: "addressLabel", valueKey: "companyAddress" },
  { key: "phone", icon: Phone, labelKey: "phoneLabel", valueKey: "contactPhone" },
  { key: "email", icon: Mail, labelKey: "emailLabel", valueKey: "contactEmail" },
  { key: "line", icon: MessageCircle, labelKey: "lineLabel", valueKey: "contactLine" },
] as const;

/**
 * Sits below the "engineer replies" line on the contact page: a LINE QR code
 * beside the TankQ logo, company blurb, and contact details, with the "what
 * to have ready" checklist underneath. The QR gets the same hover growth as
 * the footer's tank photo (`footer/tank.tsx`) so the two clickable photos on
 * the site read as one interaction pattern.
 */
export function ContactPrepare() {
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");
  const tFooter = useTranslations("footer");

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-3xl">
        <div className="grid grid-cols-1 items-start justify-items-center gap-12 sm:grid-cols-2 sm:gap-x-16">
          <FadeInUp className="flex flex-col items-center gap-3">
            <a
              href="https://page.line.me/597iheyw"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("prepareQrCaption")}
              className="flex size-60 shrink-0 items-center justify-center rounded-2xl bg-white p-4 shadow-lg ring-1 ring-foreground/10 transition-transform duration-500 ease-out hover:scale-[1.06] focus-visible:scale-[1.06] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-brand motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:focus-visible:scale-100 sm:size-72"
            >
              <Image
                src="/contactus/line-qr.PNG"
                alt={t("prepareQrAlt")}
                width={288}
                height={288}
                className="size-full object-contain"
              />
            </a>
            <p className="text-sm font-medium text-muted-foreground">
              {t("prepareQrCaption")}
            </p>
          </FadeInUp>

          <FadeInUp className="flex w-full max-w-sm flex-col items-center gap-4">
            <Image
              src="/brand/tankq-logo.png"
              alt={tCommon("companyName")}
              width={304}
              height={149}
              className="h-10 w-auto sm:h-12"
            />
            <p className="text-left text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
              {tFooter("companyDescription")}
            </p>
          </FadeInUp>
        </div>

        <div aria-hidden className="mx-auto my-10 h-px w-full bg-border sm:my-12" />

        <div className="grid grid-cols-1 items-start justify-items-center gap-12 sm:grid-cols-2 sm:gap-x-16">
          <FadeInUp className="flex w-full max-w-sm flex-col items-center gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
              {t("prepareTitle")}
            </h2>

            <Card className="w-full">
              <CardContent>
                <ul className="flex flex-col gap-4">
                  {prepareItems.map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
                      >
                        <Check className="size-4" strokeWidth={3} />
                      </span>
                      <span className="text-base leading-relaxed text-pretty">
                        {t(`prepare.${key}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </FadeInUp>

          <FadeInUp className="flex w-full max-w-sm flex-col items-center gap-4 pt-0 sm:pt-10">
            <ul className="flex w-full flex-col gap-4">
              {contactRows.map(({ key, icon: Icon, labelKey, valueKey }) => {
                const value =
                  key === "line"
                    ? tFooter(valueKey).replace(/^Line:\s*/i, "")
                    : tFooter(valueKey);

                return (
                  <li key={key} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
                    >
                      <Icon className="size-5" />
                    </span>
                    <span className="flex flex-col">
                      <span className="font-semibold text-foreground">
                        {t(labelKey)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {value}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
