import type { Localized } from "./localized";

/**
 * The after-sales services listed on `/service`.
 *
 * Service copy is dynamic content, not page chrome: both locales live inline
 * and are read as `service.title[locale]`, the same way the product catalogue
 * works. Adding a seventh service is one entry here - the page renders whatever
 * the array holds and alternates the sides automatically.
 */

export interface Service {
  /** Stable identifier. Doubles as the React key and the heading's id. */
  id: string;
  title: Localized;
  /** One-line summary shown under the heading. */
  description: Localized;
  /** Three or so highlights, rendered as a ticked list. */
  points: readonly Localized[];
  /**
   * Path under `public/`, or `null` while this service has no photo yet - the
   * section renders a placeholder box in its place. The files already sitting
   * in `public/service/` are generic finished-tank shots and do not depict
   * this work, so they are deliberately not wired up. See `docs/TODO.md`.
   */
  image: string | null;
  imageAlt: Localized;
}

export const services = [
  {
    id: "inspection",
    title: {
      th: "ตรวจสอบถัง FRP",
      en: "FRP Tank Inspection",
    },
    description: {
      th: "ตรวจสภาพด้วยสายตา วัดความหนาผนัง ทดสอบความแข็ง Barcol และตรวจโครงสร้าง พร้อมรายงานผลการตรวจสอบ",
      en: "Visual QC, wall thickness, Barcol hardness, structural check with Inspection Report.",
    },
    points: [
      { th: "วัดความหนาผนังถัง", en: "Wall Thickness Measurement" },
      { th: "ทดสอบความแข็ง Barcol", en: "Barcol Hardness Test" },
      { th: "ตรวจรอยร้าวและตุ่มพองด้วยสายตา", en: "Visual Crack / Blister Check" },
    ],
    image: null,
    imageAlt: {
      th: "วิศวกรตรวจสอบถังไฟเบอร์กลาสหน้างาน",
      en: "Engineer inspecting an FRP tank on site",
    },
  },
  {
    id: "repair",
    title: {
      th: "ซ่อมแซมถัง FRP",
      en: "FRP Tank Repair",
    },
    description: {
      th: "ซ่อมรอยร้าวและตุ่มพอง เสริมความหนาจุดที่บาง ลามิเนตซ้ำด้วยเรซินเดิมหรืออัปเกรดเป็นเกรดที่สูงขึ้น",
      en: "Repair cracks, blisters, reinforce thin spots, relamination with same or upgraded resin.",
    },
    points: [
      { th: "ซ่อมรอยร้าว", en: "Crack Repair" },
      { th: "ซ่อมตุ่มพอง", en: "Blister Repair" },
      { th: "เสริมความแข็งแรงโครงสร้าง", en: "Structural Reinforcement" },
    ],
    image: null,
    imageAlt: {
      th: "ช่างซ่อมผนังถังไฟเบอร์กลาส",
      en: "Technician repairing an FRP tank wall",
    },
  },
  {
    id: "lining",
    title: {
      th: "งานเคลือบ FRP Lining",
      en: "FRP Lining Application",
    },
    description: {
      th: "เคลือบผิวภายในถังด้วย FRP Vinyl Ester เพื่อป้องกันสารเคมี อัปเกรดถังเหล็กและถังคอนกรีตให้ใช้งานได้ยาวนานขึ้น",
      en: "Apply FRP Vinyl Ester lining inside tanks to protect from chemicals. Upgrade steel or concrete tanks.",
    },
    points: [
      { th: "ถังเหล็ก", en: "Steel Tank" },
      { th: "ถังคอนกรีต", en: "Concrete Tank" },
      { th: "เคลือบ Vinyl Ester / Isophthalic", en: "Vinyl Ester / Isophthalic Lining" },
    ],
    image: null,
    imageAlt: {
      th: "งานเคลือบไฟเบอร์กลาสภายในถัง",
      en: "FRP lining being applied inside a tank",
    },
  },
  {
    id: "accessories",
    title: {
      th: "เปลี่ยนอุปกรณ์ประกอบถัง",
      en: "Accessory Replacement",
    },
    description: {
      th: "เปลี่ยนหัวต่อ ฝาแมนโฮล ปะเก็น วาล์ว บันได และเกจวัดระดับที่เสื่อมสภาพ",
      en: "Replace worn nozzles, manholes, gaskets, valves, ladders, level gauges.",
    },
    points: [
      { th: "หัวต่อ FRP / PP / SS", en: "FRP / PP / SS Nozzle" },
      { th: "แมนโฮลและฝาปิด", en: "Manhole & Cover" },
      { th: "เกจวัดระดับและวาล์ว", en: "Level Gauge & Valve" },
    ],
    image: null,
    imageAlt: {
      th: "อุปกรณ์ประกอบถังไฟเบอร์กลาสที่เปลี่ยนใหม่",
      en: "Replacement fittings on an FRP tank",
    },
  },
  {
    id: "survey",
    title: {
      th: "สำรวจหน้างาน",
      en: "On-site Survey",
    },
    description: {
      th: "วิศวกรเข้าสำรวจหน้างาน ประเมินพื้นที่ ออกแบบระบบ และเสนอแผนผังการติดตั้ง",
      en: "Engineer surveys site, assesses space, designs system, proposes layout plan.",
    },
    points: [
      { th: "ปรึกษาฟรี", en: "Free Consultation" },
      { th: "วัดพื้นที่หน้างาน", en: "Site Measurement" },
      { th: "แผนผังและงานเดินท่อ", en: "Layout & Piping Plan" },
    ],
    image: null,
    imageAlt: {
      th: "วิศวกรสำรวจพื้นที่ติดตั้งถัง",
      en: "Engineer surveying a tank installation site",
    },
  },
  {
    id: "pm-contract",
    title: {
      th: "สัญญาบำรุงรักษาประจำปี",
      en: "Annual PM Contract",
    },
    description: {
      th: "สัญญาบำรุงรักษาถัง FRP รายปี ตรวจสอบปีละ 2 ครั้ง พร้อมรายงานผลและแผนซ่อมล่วงหน้า",
      en: "Annual FRP tank maintenance contract. 2 inspections/year with report and advance repair plan.",
    },
    points: [
      { th: "ตรวจสอบปีละ 2 ครั้ง", en: "2 inspections/year" },
      { th: "รายงานผลการตรวจสอบ", en: "Inspection Report" },
      { th: "ส่วนลดค่าซ่อม 15%", en: "15% repair discount" },
    ],
    image: null,
    imageAlt: {
      th: "ทีมบำรุงรักษาเข้าตรวจถังตามสัญญารายปี",
      en: "Maintenance team on a scheduled annual tank visit",
    },
  },
] as const satisfies readonly Service[];

/**
 * The full list, in the order it should appear on the page.
 *
 * Returns the wide `Service` rather than the literal row type: every entry
 * currently has `image: null`, and narrowing that to `null` would make the
 * photo branch in `<ServiceImage>` unreachable until the first file lands.
 */
export function getAllServices(): readonly Service[] {
  return services;
}
