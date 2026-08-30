import { ImageIcon } from "lucide-react";
import Image from "next/image";

import type { AppLocale } from "@/i18n/routing";
import type { Service } from "@/lib/services";

type ServiceImageProps = {
  service: Service;
  locale: AppLocale;
};

/**
 * The photo beside a service section, or a placeholder while that photo is
 * still missing.
 *
 * Both states share one 4:3 box so the row's height does not shift when a
 * real file replaces a placeholder - shipping a photo is setting `image` on
 * the entry in `src/lib/services.ts` and nothing else. The placeholder mark is
 * decorative and the box is empty of meaning without the photo, so it is
 * hidden from assistive tech rather than announced as an unlabelled image.
 */
export function ServiceImage({ service, locale }: ServiceImageProps) {
  return (
    <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10">
      {service.image ? (
        <Image
          src={service.image}
          alt={service.imageAlt[locale]}
          fill
          className="object-cover object-center"
          sizes="(min-width: 1024px) 36rem, 100vw"
        />
      ) : (
        <div
          aria-hidden
          className="flex size-full items-center justify-center"
        >
          <ImageIcon className="size-10 text-muted-foreground/40" strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
}
