import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import { FadeInUp, FadeInUpGroup } from "@/components/fade-in-up";
import { toAppLocale } from "@/i18n/locale";
import { getProjectApplicationById, getProjectTankTypeById } from "@/lib/project-tags";
import { getProjectBySlug } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * The projects the site currently has a real photo for, paired with a still
 * to stand in for it. `images` is empty on every `src/lib/projects.ts` entry
 * (see docs/TODO.md "Project photography"), so these borrow stills from the
 * "why TankQ" set rather than waiting on job-site photography - swap each
 * `image` to `project.images[0]` once that entry gets its own cover.
 * `imagePosition` alternates left/right so consecutive case studies don't
 * read as a repeating template.
 */
const CASE_STUDIES = [
  {
    slug: "frp-horizontal-buffer-tank-15000l",
    image: "/why/delivery.jpg",
    imagePosition: "left",
  },
  {
    slug: "fire-water-frp-tank-500000l-nfpa",
    image: "/why/engineered.jpg",
    imagePosition: "right",
  },
] as const satisfies readonly {
  slug: string;
  image: string;
  imagePosition: "left" | "right";
}[];

/**
 * The projects page's photo/copy case studies, under its "Featured Project
 * Case Studies" heading. The page's last section, so `flex-1` lets it soak up
 * any leftover viewport height, matching the single-section pattern on
 * `quality`/`service`. The first case study gets a modest top padding to
 * separate it from the heading above; every one after that gets a more
 * generous top padding so consecutive showcases read as distinct blocks
 * rather than one continuous one.
 */
export function ProjectCaseStudies() {
  return (
    <section className="mx-auto flex w-full max-w-[88rem] flex-1 flex-col px-4 pb-16 sm:px-6 sm:pb-20">
      {CASE_STUDIES.map((entry, index) => (
        <CaseStudy key={entry.slug} {...entry} isFirst={index === 0} />
      ))}
    </section>
  );
}

type CaseStudyProps = (typeof CASE_STUDIES)[number] & { isFirst: boolean };

/**
 * One project told as a photo beside its problem / solution / result triad.
 * Reads `src/lib/projects.ts` and `src/lib/project-tags.ts` directly rather
 * than duplicating the copy, so it stays in sync with the data. Renders
 * nothing if its slug is ever removed from the data.
 */
function CaseStudy({ slug, image, imagePosition, isFirst }: CaseStudyProps) {
  const t = useTranslations("projects");
  const locale = toAppLocale(useLocale());

  const project = getProjectBySlug(slug);
  if (!project) return null;

  const tankType = getProjectTankTypeById(project.tankTypeId);
  const application = getProjectApplicationById(project.applicationId);

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
        <Image
          src={image}
          alt={project.title[locale]}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 32rem, 100vw"
        />
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
        <div className="flex flex-wrap gap-2">
          {tankType && (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {tankType.title[locale]}
            </span>
          )}
          {application && (
            <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              {application.title[locale]}
            </span>
          )}
        </div>

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
