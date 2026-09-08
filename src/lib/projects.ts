import type { Localized } from "./localized";
import type {
  ProjectApplicationId,
  ProjectTankTypeId,
} from "./project-tags";

/**
 * Project showcase data - completed jobs, told as short case studies.
 *
 * Dynamic content (titles, the problem/solution/result lines) carries both
 * locales inline - read it as `project.title[locale]`, not through next-intl.
 * The message files stay reserved for static UI chrome.
 *
 * Every entry is a real delivered job. Do not add speculative ones.
 */

export interface Project {
  /** Stable identifier, safe to use as a React key or in future data sources. */
  id: string;
  /** URL-friendly segment, reserved for a future `/projects/<slug>` detail page. */
  slug: string;
  /** The kind of tank or job - see `src/lib/project-tags.ts`. */
  tankTypeId: ProjectTankTypeId;
  /** What the tank is used for - see `src/lib/project-tags.ts`. */
  applicationId: ProjectApplicationId;
  /** The customer's sector. Free text, since it varies job to job. */
  industry: Localized;
  /** The province the job was delivered in. */
  province: Localized;
  /** Year of completion. Also the sort key behind `order`. */
  year: number;
  title: Localized;
  /** The constraint the customer arrived with. */
  problem: Localized;
  /** What was designed and built to meet it. */
  solution: Localized;
  /** The measurable outcome. */
  result: Localized;
  /**
   * Public paths, first image is treated as the cover. Currently stand-in
   * stills borrowed from the "why TankQ" set, not job-site photography -
   * swap them for real covers per `docs/TODO.md`. May still be empty, so a
   * renderer must not assume `images[0]` exists.
   */
  images: string[];
  /** Highlighted on the homepage. */
  featured: boolean;
  /** Manual sort order for the listing page, newest job first. */
  order: number;
}

export const projects: Project[] = [
  {
    id: "frp-horizontal-buffer-tank-15000l",
    slug: "frp-horizontal-buffer-tank-15000l",
    tankTypeId: "frp-horizontal-tank",
    applicationId: "custom",
    industry: {
      th: "อุตสาหกรรมยา",
      en: "Pharmaceutical",
    },
    province: {
      th: "ปทุมธานี",
      en: "Pathum Thani",
    },
    year: 2024,
    title: {
      th: "ถังพักน้ำไฟเบอร์กลาสทรงนอน 15,000 ลิตร สั่งผลิตพิเศษ",
      en: "Custom Horizontal FRP Tank 15,000L Buffer Tank",
    },
    problem: {
      th: "พื้นที่มีความสูงจำกัด ต้องใช้ถังทรงนอนที่ออกแบบพิเศษ",
      en: "Limited ceiling height required special horizontal tank",
    },
    solution: {
      th: "ออกแบบถังทรงนอน 15,000 ลิตร เฉพาะงาน และส่ง Shop Drawing ให้อนุมัติก่อนผลิต",
      en: "Designed custom horizontal 15,000L, submitted Shop Drawing before production",
    },
    result: {
      th: "ส่งมอบตรงเวลา ผ่านการทดสอบแรงดันน้ำ และลูกค้าสั่งซื้อเพิ่มอีก 3 ใบ",
      en: "On-time delivery, passed hydro test, customer reordered 3 more",
    },
    images: ["/why/delivery.webp"],
    featured: true,
    order: 1,
  },
  {
    id: "fire-water-frp-tank-500000l-nfpa",
    slug: "fire-water-frp-tank-500000l-nfpa",
    tankTypeId: "frp-factory",
    applicationId: "fire-water",
    industry: {
      th: "นิคมอุตสาหกรรม",
      en: "Industrial Estate",
    },
    province: {
      th: "สระบุรี",
      en: "Saraburi",
    },
    year: 2023,
    title: {
      th: "ถังน้ำดับเพลิงไฟเบอร์กลาส 500,000 ลิตร ตามมาตรฐาน NFPA",
      en: "Fire Water FRP Tank 500,000L per NFPA Standard",
    },
    problem: {
      th: "ต้องการถังเก็บน้ำดับเพลิงขนาด 500 ลูกบาศก์เมตร ตามมาตรฐาน NFPA 22",
      en: "Required 500KL fire water storage per NFPA 22",
    },
    solution: {
      th: "ถังไฟเบอร์กลาสเรซินออร์โธทาลิก 500,000 ลิตร พร้อม Engineering Calculation",
      en: "FRP Orthophthalic 500,000L with Engineering Calculation",
    },
    result: {
      th: "ผ่านการตรวจสอบของบริษัทประกันภัย รองรับระบบสปริงเกลอร์ได้เต็มระบบ",
      en: "Passed insurance inspection, supports full sprinkler system",
    },
    images: ["/why/engineered.webp"],
    featured: true,
    order: 2,
  },
];

/** The full showcase in listing order, newest job first. */
export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.featured);
}
