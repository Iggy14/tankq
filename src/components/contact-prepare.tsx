import { Check } from "lucide-react";
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
 * Sits below the "engineer replies" line on the contact page: a LINE QR code
 * beside a checklist of what to have ready before reaching out. The QR gets
 * the same hover growth as the footer's tank photo (`footer/tank.tsx`) so the two
 * clickable photos on the site read as one interaction pattern.
 */
export function ContactPrepare() {
  const t = useTranslations("contact");

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
      <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-12">
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
          <p className="text-sm font-medium text-navy/70">
            {t("prepareQrCaption")}
          </p>
        </FadeInUp>

        <FadeInUp className="flex flex-col gap-4 sm:-mt-8">
          <h2 className="text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
            {t("prepareTitle")}
          </h2>

          <Card>
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
      </div>
    </section>
  );
}
