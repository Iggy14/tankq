import { useLocale } from "next-intl";

import { toAppLocale } from "@/i18n/locale";
import {
  getProjectApplicationById,
  getProjectTankTypeById,
  type ProjectApplicationId,
  type ProjectTankTypeId,
} from "@/lib/project-tags";
import { cn } from "@/lib/utils";

type ProjectTagPillsProps = {
  tankTypeId: ProjectTankTypeId;
  applicationId: ProjectApplicationId;
  /** Extra wrapper classes - e.g. `justify-center` on a centred card. */
  className?: string;
};

/**
 * The two labels every project carries: the kind of tank or job, then what the
 * tank is used for. Both are ids resolved through `src/lib/project-tags.ts`,
 * so the copy is read as `tag.title[locale]` rather than from the message
 * files. A pill is skipped if its id ever stops resolving.
 *
 * Shared by the homepage's project cards and the case studies on `/projects`,
 * so the two stay identical by construction.
 */
export function ProjectTagPills({
  tankTypeId,
  applicationId,
  className,
}: ProjectTagPillsProps) {
  const locale = toAppLocale(useLocale());

  const tankType = getProjectTankTypeById(tankTypeId);
  const application = getProjectApplicationById(applicationId);

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
