import { cache } from "react";

import type { Localized } from "./localized";
import { fetchWpApplications, fetchWpTankTypes } from "./wp/catalogue";
import { isWpEnabled } from "./wp/client";

/**
 * Project label data.
 *
 * Every project card carries two labels: the kind of tank or job it was, and
 * what the tank is used for. Both are dynamic content - the names live inline
 * in both locales and are read as `tag.title[locale]`, not through next-intl.
 *
 * The two arrays below are the built-in registries, used when `WP_API_URL` is
 * not set; WordPress supplies the same two lists otherwise. A project in
 * `src/lib/projects.ts` points at one id from each. The ids are plain strings,
 * so a project naming a label that does not exist shows no pill for it.
 */

export interface ProjectTag {
  /** Stable identifier, referenced from `src/lib/projects.ts`. */
  id: string;
  title: Localized;
  /** Manual sort order for tag listings and future filters. */
  order: number;
}

/** The kind of tank or job - the first label on a project card. */
export const projectTankTypes: ProjectTag[] = [
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
];

/** What the tank is used for - the second label on a project card. */
export const projectApplications: ProjectTag[] = [
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
];

/** A tank type id: a WordPress post slug, or the `id` of a built-in row. */
export type ProjectTankTypeId = string;

/** An application id: a WordPress post slug, or the `id` of a built-in row. */
export type ProjectApplicationId = string;

const loadTankTypes = cache(
  async (): Promise<ProjectTag[]> =>
    isWpEnabled() ? fetchWpTankTypes() : projectTankTypes,
);

const loadApplications = cache(
  async (): Promise<ProjectTag[]> =>
    isWpEnabled() ? fetchWpApplications() : projectApplications,
);

/** The tank types in listing order. */
export async function getAllProjectTankTypes(): Promise<ProjectTag[]> {
  return [...(await loadTankTypes())].sort((a, b) => a.order - b.order);
}

export async function getProjectTankTypeById(
  id: ProjectTankTypeId,
): Promise<ProjectTag | undefined> {
  return (await loadTankTypes()).find((tankType) => tankType.id === id);
}

/** The applications in listing order. */
export async function getAllProjectApplications(): Promise<ProjectTag[]> {
  return [...(await loadApplications())].sort((a, b) => a.order - b.order);
}

export async function getProjectApplicationById(
  id: ProjectApplicationId,
): Promise<ProjectTag | undefined> {
  return (await loadApplications()).find(
    (application) => application.id === id,
  );
}
