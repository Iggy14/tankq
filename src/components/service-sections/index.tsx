import { ServiceSection } from "@/components/service-sections/service-section";
import type { AppLocale } from "@/i18n/routing";
import { getAllServices } from "@/lib/services";

type ServiceSectionsProps = {
  locale: AppLocale;
};

/**
 * The body of the service page: every entry in `src/lib/services.ts`, rendered
 * as a photo-and-copy row with the sides alternating down the page. Adding a
 * service is one array entry - the side it lands on follows from its position.
 */
export function ServiceSections({ locale }: ServiceSectionsProps) {
  return (
    <div className="pb-8 sm:pb-12">
      {getAllServices().map((service, index) => (
        <ServiceSection
          key={service.id}
          service={service}
          locale={locale}
          reversed={index % 2 === 1}
        />
      ))}
    </div>
  );
}
