import { Check } from "lucide-react";

import { FadeInUp, FadeInUpGroup } from "@/components/fade-in-up";
import { ServiceImage } from "@/components/service-sections/service-image";
import type { AppLocale } from "@/i18n/routing";
import type { Service } from "@/lib/services";

type ServiceSectionProps = {
  service: Service;
  locale: AppLocale;
  /** True on every second row, putting the photo on the right instead. */
  reversed: boolean;
};

/**
 * One service: photo on one side, copy on the other, flipping every other row.
 *
 * The swap is explicit `lg:col-start` placement rather than an order utility,
 * so the DOM order stays photo-then-copy at every width - on mobile the single
 * column reads the same way down the whole page instead of alternating.
 */
export function ServiceSection({
  service,
  locale,
  reversed,
}: ServiceSectionProps) {
  const headingId = `service-${service.id}`;

  return (
    <section
      aria-labelledby={headingId}
      className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16"
    >
      <FadeInUpGroup className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <FadeInUp
          className={reversed ? "lg:col-start-2 lg:row-start-1" : "lg:col-start-1 lg:row-start-1"}
        >
          <ServiceImage service={service} locale={locale} />
        </FadeInUp>

        <FadeInUp
          className={reversed ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-2 lg:row-start-1"}
        >
          <h2
            id={headingId}
            className="text-2xl font-semibold tracking-tight text-balance text-primary sm:text-3xl"
          >
            {service.title[locale]}
          </h2>

          <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground">
            {service.description[locale]}
          </p>

          {/* Same ticked marker as the product detail pages and the contact
              page's checklist. Decorative - the list markup already carries
              the semantics - and white-on-primary so the check reads as an
              affirmative brand accent. */}
          <ul className="mt-6 grid grid-cols-1 gap-y-3">
            {service.points.map((point) => (
              <li key={point.en} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  <Check className="size-4" strokeWidth={3} />
                </span>
                <span className="text-base leading-relaxed text-pretty">
                  {point[locale]}
                </span>
              </li>
            ))}
          </ul>
        </FadeInUp>
      </FadeInUpGroup>
    </section>
  );
}
