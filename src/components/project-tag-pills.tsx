import { useLocale } from "next-intl";

import { toAppLocale } from "@/i18n/locale";
import type { ProjectTag } from "@/lib/project-tags";
import { cn } from "@/lib/utils";

type ProjectTagPillsProps = {
  /** `project.tankType` - already resolved by the project accessors. */
  tankType: ProjectTag | undefined;
  /** `project.application` - already resolved by the project accessors. */
  application: ProjectTag | undefined;
  /** Extra wrapper classes - e.g. `justify-center` on a centred card. */
  className?: string;
};

/**
 * The two labels every project carries: the kind of tank or job, then what the
 * tank is used for. Both come in as resolved tags (see `src/lib/projects.ts`),
 * so the copy is read as `tag.title[locale]` rather than from the message
 * files. A pill is skipped if its tag did not resolve.
 *
 * Shared by the homepage's project cards and the case studies on `/projects`,
 * so the two stay identical by construction.
 */
export function ProjectTagPills({
  tankType,
  application,
  className,
}: ProjectTagPillsProps) {
  const locale = toAppLocale(useLocale());

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
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
  );
}
