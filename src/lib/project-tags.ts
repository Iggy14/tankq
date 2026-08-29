import type { Localized } from "./localized";

/**
 * Project label data.
 *
 * Every project card carries two labels: the kind of tank or job it was, and
 * what the tank is used for. Both are dynamic content - the names live inline
 * in both locales and are read as `tag.title[locale]`, not through next-intl.
 *
 * The two arrays below are the registries. A project in `src/lib/projects.ts`
 * points at one id from each, and the ids are frozen into their own unions, so
 * a project naming a label that does not exist is a compile error.
 */

export interface ProjectTag {
  /** Stable identifier, referenced from `src/lib/projects.ts`. */
  id: string;
  title: Localized;
  /** Manual sort order for tag listings and future filters. */
  order: number;
}

/** The kind of tank or job - the first label on a project card. */
export const projectTankTypes = [
  {
    id: "frp-horizontal-tank",
    title: {
      th: "ถังไฟเบอร์กลาสทรงนอน",
      en: "Horizontal FRP Tank",
    },
    order: 1,
  },
  {
    id: "frp-factory",
    title: {
      th: "งานโรงงานไฟเบอร์กลาส",
      en: "FRP Factory",
    },
    order: 2,
  },
] as const satisfies readonly ProjectTag[];

/** What the tank is used for - the second label on a project card. */
export const projectApplications = [
  {
    id: "custom",
    title: {
      th: "งานสั่งผลิตพิเศษ",
      en: "Custom",
    },
    order: 1,
  },
  {
    id: "fire-water",
    title: {
      th: "น้ำดับเพลิง",
      en: "Fire Water",
    },
    order: 2,
  },
] as const satisfies readonly ProjectTag[];

/** One row of `projectTankTypes`, with its `id` narrowed to its own literal. */
export type ProjectTankTypeEntry = (typeof projectTankTypes)[number];

/** Every tank type id declared above - the type of `Project.tankTypeId`. */
export type ProjectTankTypeId = ProjectTankTypeEntry["id"];

/** One row of `projectApplications`, with its `id` narrowed to its own literal. */
export type ProjectApplicationEntry = (typeof projectApplications)[number];

/** Every application id declared above - the type of `Project.applicationId`. */
export type ProjectApplicationId = ProjectApplicationEntry["id"];

/**
 * The tank types in listing order.
 *
 * Returns the entries rather than the wider `ProjectTag`, so a caller keying
 * something off `tag.id` - a filter's icon map, say - gets the
 * `ProjectTankTypeId` union and not a bare `string`.
 */
export function getAllProjectTankTypes(): readonly ProjectTankTypeEntry[] {
  return [...projectTankTypes].sort((a, b) => a.order - b.order);
}

export function getProjectTankTypeById(
  id: ProjectTankTypeId,
): ProjectTankTypeEntry | undefined {
  return projectTankTypes.find((tankType) => tankType.id === id);
}

/** The applications in listing order. See `getAllProjectTankTypes` on why the entry type. */
export function getAllProjectApplications(): readonly ProjectApplicationEntry[] {
  return [...projectApplications].sort((a, b) => a.order - b.order);
}

export function getProjectApplicationById(
  id: ProjectApplicationId,
): ProjectApplicationEntry | undefined {
  return projectApplications.find((application) => application.id === id);
}
