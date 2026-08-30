import Image from "next/image";
import { useLocale } from "next-intl";

import { ProjectTagPills } from "@/components/project-tag-pills";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toAppLocale } from "@/i18n/locale";
import type { Project } from "@/lib/projects";

/** Two-up on desktop and tablet, full width on phones. */
export const PROJECT_CARD_SIZES =
  "(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 90vw";

type ProjectCardProps = {
  project: Project;
  /** `next/image` sizes hint. Defaults to the homepage's two-column row. */
  sizes?: string;
  /** Set on above-the-fold cards so their cover is not lazy-loaded. */
  priority?: boolean;
};

/**
 * One delivered job as a tile: cover image with its title and the two project
 * labels centred underneath.
 *
 * Deliberately not a link - there is no `/projects/<slug>` route yet, so the
 * card carries none of <ProductCard>'s hover lift, which would promise a
 * destination that does not exist. Everything else matches a product card at
 * rest, so the two homepage rows read as one system.
 *
 * The cover may be missing (`images` is empty until a job gets photography -
 * see docs/TODO.md), in which case the frame renders on its own.
 */
export function ProjectCard({
  project,
  sizes = PROJECT_CARD_SIZES,
  priority = false,
}: ProjectCardProps) {
  const locale = toAppLocale(useLocale());

  const cover = project.images[0];

  return (
    <Card
      size="sm"
      className="h-full bg-transparent shadow-none ring-transparent"
    >
      <CardContent>
        {/* Its own frame rather than a direct child of Card: the recipe
            rounds only the top of a leading <img> for edge-to-edge covers,
            and this card wants the picture rounded all round. */}
        <div className="overflow-hidden rounded-lg bg-muted">
          {cover ? (
            <Image
              src={cover}
              alt={project.title[locale]}
              width={640}
              height={480}
              sizes={sizes}
              priority={priority}
              className="aspect-4/3 w-full object-cover"
            />
          ) : (
            <div className="aspect-4/3 w-full" />
          )}
        </div>
      </CardContent>

      <CardHeader>
        <CardTitle className="text-center text-base text-primary sm:text-lg">
          {project.title[locale]}
        </CardTitle>
        <ProjectTagPills
          tankTypeId={project.tankTypeId}
          applicationId={project.applicationId}
          className="justify-center pt-1"
        />
      </CardHeader>
    </Card>
  );
}
