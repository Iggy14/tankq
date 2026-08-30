import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FadeInUp } from "@/components/fade-in-up";
import { ProjectCaseStudies } from "@/components/project-case-studies";
import { ProjectStats } from "@/components/project-stats";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ProjectsPage({ params }: PageProps<"/[locale]/projects">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("projects");
  const tNav = await getTranslations("nav");

  return (
    <>
      <Breadcrumbs wide items={[{ label: tNav("projects") }]} />

      <section className="mx-auto w-full max-w-[88rem] px-4 pt-16 pb-14 sm:px-6">
        <FadeInUp className="flex flex-col items-center text-center">
          <h1 className="text-3xl leading-[1] font-black tracking-tight text-primary uppercase sm:text-4xl md:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-sm text-muted-foreground sm:text-base">
            {t("subtitle")}
          </p>
          <div className="mt-8 h-px w-40 bg-neutral-500 sm:mt-10" />
        </FadeInUp>
      </section>

      <ProjectStats />

      <section className="mx-auto w-full max-w-[88rem] px-4 pt-12 pb-8 sm:px-6">
        <FadeInUp>
          <h2 className="text-center text-2xl font-bold tracking-tight text-primary sm:text-3xl md:text-4xl">
            {t("caseStudiesTitle")}
          </h2>
        </FadeInUp>
      </section>

      <ProjectCaseStudies />
    </>
  );
}
