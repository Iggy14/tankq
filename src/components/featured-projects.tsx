import { useTranslations } from "next-intl";

import { FadeInUp, FadeInUpGroup } from "@/components/fade-in-up";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getFeaturedProjects } from "@/lib/projects";

/**
 * The featured slice of the project showcase, sitting under the featured
 * products row and sharing its section rhythm.
 *
 * Only the cover, the title and the two labels show here; the
 * problem/solution/result copy belongs to `/projects`. The card itself lives
 * in <ProjectCard>.
 */
export function FeaturedProjects() {
  const t = useTranslations("home.projects");

  const featured = getFeaturedProjects();

  return (
    // Matches the hero, "Why TankQ" and the products row: one full screen
    // minus the 4rem sticky header.
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

        {/* Two-up from tablet, stacked on phones. Only two projects carry
            `featured` today, and a third column would sit empty - once a third
            is flagged, add `lg:grid-cols-3` and drop the `max-w-4xl`. */}
        <FadeInUpGroup className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {featured.map((project) => (
            <FadeInUp key={project.id} className="h-full">
              <ProjectCard project={project} />
            </FadeInUp>
          ))}
        </FadeInUpGroup>

        <FadeInUp className="flex justify-center">
          <Button
            size="lg"
            nativeButton={false}
            role="link"
            render={<Link href="/projects" />}
          >
            {t("viewAll")}
          </Button>
        </FadeInUp>
      </div>
    </section>
  );
}
