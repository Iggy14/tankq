import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import { FadeInUp, FadeInUpGroup } from "@/components/fade-in-up";
import { ProjectTagPills } from "@/components/project-tag-pills";
import { toAppLocale } from "@/i18n/locale";
import { getAllProjects, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * The projects page's photo/copy case studies, under its "Featured Project
 * Case Studies" heading. Driven straight off `getAllProjects()`, so a project
 * added to `src/lib/projects.ts` appears here with no second edit - covers
 * come from the entry's own `images[0]`. The page's last section, so `flex-1`
 * lets it soak up any leftover viewport height, matching the single-section
 * pattern on `quality`/`service`. The first case study gets a modest top
 * padding to separate it from the heading above; every one after that gets a
 * more generous top padding so consecutive showcases read as distinct blocks
 * rather than one continuous one. The image alternates left/right so they
 * don't read as a repeating template.
 */
export function ProjectCaseStudies() {
  const projects = getAllProjects();

  return (
    <section className="mx-auto flex w-full max-w-[88rem] flex-1 flex-col px-4 pb-16 sm:px-6 sm:pb-20">
      {projects.map((project, index) => (
        <CaseStudy
          key={project.id}
          project={project}
          imagePosition={index % 2 === 1 ? "right" : "left"}
          isFirst={index === 0}
        />
      ))}
    </section>
  );
}

type CaseStudyProps = {
  project: Project;
  imagePosition: "left" | "right";
  isFirst: boolean;
};

/**
 * One project told as a photo beside its problem / solution / result triad.
 * The cover may be missing (`images` is empty until a job gets photography -
 * see docs/TODO.md), in which case the frame renders on its own.
 */
function CaseStudy({ project, imagePosition, isFirst }: CaseStudyProps) {
  const t = useTranslations("projects");
  const locale = toAppLocale(useLocale());

  const cover = project.images[0];

  return (
    <FadeInUpGroup
      className={cn(
        "grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12",
        isFirst ? "pt-6 sm:pt-8" : "pt-16 sm:pt-20",
      )}
    >
      <FadeInUp
        className={cn(
          "relative aspect-4/3 w-full max-w-lg mx-auto overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10",
          imagePosition === "right" && "lg:order-2",
        )}
      >
        {cover && (
          <Image
            src={cover}
            alt={project.title[locale]}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 32rem, 100vw"
          />
        )}
      </FadeInUp>

      <FadeInUp
        className={cn(
          "flex flex-col gap-4",
          // Mirrors the picture's own `mx-auto max-w-lg` inset, so text that
          // lands in the "picture" column when the image sits on the right
          // still lines up with a picture above it in that same column.
          imagePosition === "right" && "lg:order-1 lg:pl-[calc(50%-16rem)]",
        )}
      >
        <ProjectTagPills
          tankTypeId={project.tankTypeId}
          applicationId={project.applicationId}
        />

        <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {project.title[locale]}
        </h3>

        <p className="text-sm text-muted-foreground">
          {project.industry[locale]} · {project.province[locale]} · {project.year}
        </p>

        <dl className="mt-2 flex flex-col gap-4 text-sm">
          <div>
            <dt className="font-semibold text-foreground">{t("problemLabel")}</dt>
            <dd className="mt-1 leading-relaxed text-muted-foreground">
              {project.problem[locale]}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">{t("solutionLabel")}</dt>
            <dd className="mt-1 leading-relaxed text-muted-foreground">
              {project.solution[locale]}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">{t("resultLabel")}</dt>
            <dd className="mt-1 leading-relaxed text-muted-foreground">
              {project.result[locale]}
            </dd>
          </div>
        </dl>
      </FadeInUp>
    </FadeInUpGroup>
  );
}
