import { useTranslations } from "next-intl";

import { FadeInUp } from "@/components/fade-in-up";
import { WhyTankQShowcase } from "@/components/why-tankq-showcase";

export function WhyTankQ() {
  const t = useTranslations("home.whyUs");

  return (
    // Matches the hero: one full screen minus the 4rem sticky header, with the
    // content centred in whatever height is left over. The section grows past
    // that once the two-column showcase needs more room.
    <section className="flex min-h-[calc(100svh-4rem)] w-full flex-col items-center justify-center px-4 py-20 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <FadeInUp className="flex flex-col items-center gap-3">
          <h2 className="text-center text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {t("title")}
          </h2>
          <p className="max-w-2xl text-center text-base text-pretty text-muted-foreground sm:text-lg">
            {t("subtitle")}
          </p>
        </FadeInUp>

        <WhyTankQShowcase />
      </div>
    </section>
  );
}
