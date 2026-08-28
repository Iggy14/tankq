import { useTranslations } from "next-intl";

import { FadeInUp } from "@/components/fade-in-up";
import { WhyTankQBackdrop } from "@/components/why-tankq-backdrop";
import { WhyTankQShowcase } from "@/components/why-tankq-showcase";
import { WhyTankQSlideshowProvider } from "@/components/why-tankq-slideshow";

export function WhyTankQ() {
  const t = useTranslations("home.whyUs");

  return (
    // The provider holds the one photo index the section runs on, so the
    // backdrop and the showcase panel are always on the same image.
    <WhyTankQSlideshowProvider>
      {/* Matches the hero: one full screen minus the 4rem sticky header, with
          the content centred in whatever height is left over. The section grows
          past that once the two-column showcase needs more room. `isolate` keeps
          the backdrop's negative z-index inside this section. */}
      <section className="relative isolate flex min-h-[calc(100svh-4rem)] w-full flex-col items-center justify-center px-4 py-20 sm:px-6">
        <WhyTankQBackdrop />

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
          <FadeInUp className="flex flex-col items-center gap-3">

            <h1 className="max-w-lg text-4xl leading-[1.1] font-semibold tracking-tight text-balance text-primary sm:text-5xl xl:text-6xl">
              {t("title")}
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-pretty">
              {t("subtitle")}
            </p>
          </FadeInUp>

          <WhyTankQShowcase />
        </div>
      </section>
    </WhyTankQSlideshowProvider>
  );
}
