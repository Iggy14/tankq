import type { Localized } from "./localized";
import type { ProductCategoryId } from "./product-categories";
import type { ProductSectionLink } from "./product-sections";
import type { ProductSpec } from "./product-specs";

// Re-exported so callers can keep reaching for it alongside `Product`.
export type { Localized };

/**
 * Product catalog data.
 *
 * Dynamic content (titles, descriptions) carries both locales inline — read it
 * as `product.title[locale]`, not through next-intl. The message files stay
 * reserved for static UI chrome.
 *
 * Every entry carries the real catalogue copy.
 *
 * Detail-page sections are not stored here - they live in
 * `src/lib/product-section-data.ts`, keyed by `Product.id`.
 */

export interface Product {
  /** Stable identifier, safe to use as a React key or in future data sources. */
  id: string;
  /** URL-friendly segment, e.g. `/products/frp-horizontal-water-tank`. */
  slug: string;
  /** The category this product belongs to - see `src/lib/product-categories.ts`. */
  categoryId: ProductCategoryId;
  title: Localized;
  description: Localized;
  /**
   * A short row of at-a-glance facts - material, use, brand - shown under the
   * description on the detail page. Keep each label to a couple of words.
   */
  specs?: ProductSpec[];
  /**
   * A row of jump links to this product's own detail-page sections, shown in
   * the same spot `specs` would sit - see `ProductSectionLink` in
   * `src/lib/product-sections.ts`. A product carries this instead of `specs`
   * when its at-a-glance row is better spent pointing at the sections below
   * than stating facts.
   */
  sectionLinks?: ProductSectionLink[];
  /** Public paths, first image is treated as the cover. */
  images: string[];
  /**
   * True when the detail page opens each variant with its own `gallery`
   * section (a merged page - see `product-section-data.ts`), so the shared
   * gallery above the sections is dropped and `images` is only the cover.
   */
  galleryInSections?: boolean;
  /** Highlighted on the homepage — the first three carry this flag. */
  featured: boolean;
  /** Manual sort order for the listing page. */
  order: number;
}

export const products: Product[] = [
  {
    id: "frp-water-tank",
    slug: "frp-water-tank",
    categoryId: "frp-water-tank",
    title: {
      th: "ถังเก็บน้ำไฟเบอร์กลาส",
      en: "FRP Water Tank",
    },
    description: {
      th: "ถังเก็บน้ำไฟเบอร์กลาส (FRP) ผ่านกระบวนการผลิตขึ้นรูปด้วยใยแก้วเสริมแรงที่มีความใส่ใจเป็นพิเศษ และทุก ๆ ขั้นตอนได้มาตรฐาน เพื่อความสะอาดปลอดภัย ไร้สารตกค้าง แข็งแรง ทนทาน ใช้เพื่อสำรองน้ำปริมาณมากในอุตสาหกรรมขนาดกลาง-ขนาดใหญ่ ทำระบบถังสำรองน้ำดับเพลิง เหมาะสำหรับ สำนักงาน หน่วยงาน คอนโดมิเนียม ห้างสรรพสินค้า ปั๊มน้ำมัน โรงงาน หอพัก โครงการภาครัฐ",
      en: "The FRP fiberglass water tank is formed from glass fibre reinforced plastic with exceptional care, every step of the process held to standard, so the tank stays clean and safe with no residue left behind, strong and long-lasting. It is used to hold large water reserves for medium and large-scale industry and to build fire-water reserve systems, making it suitable for offices, government agencies, condominiums, shopping malls, petrol stations, factories, dormitories and public-sector projects.",
    },
    // Jump links to where each tank type starts, in place of the usual `specs`
    // row. The sections live under this product's id in product-section-data.ts.
    sectionLinks: [
      {
        label: { th: "ถังเก็บน้ำไฟเบอร์กลาสทรงตั้ง", en: "FRP Vertical Water Tank" },
        sectionId: "frp-vertical-water-tank",
      },
      {
        label: { th: "ถังเก็บน้ำไฟเบอร์กลาสทรงนอน", en: "FRP Horizontal Water Tank" },
        sectionId: "frp-horizontal-water-tank",
      },
    ],
    // Each variant's own pictures sit in its gallery section - see
    // `galleryInSections`. This is just the cover for cards and link previews.
    images: ["/images/products/frp-vertical-water-tank/2.webp"],
    galleryInSections: true,
    featured: true,
    order: 1,
  },
  {
    id: "pe-water-tank",
    slug: "pe-water-tank",
    categoryId: "pe-water-tank",
    title: {
      th: "ถังเก็บน้ำ PE",
      en: "PE Water Tank",
    },
    description: {
      th: "ถังเก็บน้ำ PE แบรนด์ TANK-Q ผลิตจากวัสดุที่มีคุณภาพ แข็งแรง ทนทาน สะอาด ปลอดภัย มีให้เลือก 3 รุ่น ได้แก่ รุ่น TQ ถังเก็บน้ำบนดิน รุ่น TG ถังเก็บน้ำบนดินลายหินแกรนิต และรุ่น TU ถังเก็บน้ำใต้ดิน",
      en: "TANK-Q PE water tanks are made from quality material that is strong, durable, clean and safe. Choose from three models: the TQ above-ground tank, the TG above-ground tank in a granite finish, and the TU underground tank.",
    },
    sectionLinks: [
      {
        label: { th: "ถังเก็บน้ำบนดิน PE รุ่น TQ", en: "TQ Series Above-Ground" },
        sectionId: "pe-above-ground-water-tank",
      },
      {
        label: { th: "ถังเก็บน้ำบนดิน PE รุ่น TG (ลายหินแกรนิต)", en: "TG Series Granite Finish" },
        sectionId: "pe-above-ground-water-tank-granite",
      },
      {
        label: { th: "ถังเก็บน้ำใต้ดิน PE รุ่น TU", en: "TU Series Underground" },
        sectionId: "pe-underground-water-tank",
      },
    ],
    // Each variant's own pictures sit in its gallery section - see
    // `galleryInSections`. This is just the cover for cards and link previews.
    images: ["/images/products/pe-above-ground-water-tank/6.webp"],
    galleryInSections: true,
    featured: false,
    order: 2,
  },
  {
    id: "fiberglass-septic-tank",
    slug: "fiberglass-septic-tank",
    categoryId: "frp-wastewater-treatment-tank",
    title: {
      th: "ถังบำบัดน้ำเสียไฟเบอร์กลาส",
      en: "Fiberglass Septic Tank",
    },
    description: {
      th: "ถังบำบัดน้ำเสียไฟเบอร์กลาสแบรนด์ TANK-Q ใช้สำหรับบำบัดน้ำเสีย ผลิตจากไฟเบอร์กลาสที่ขึ้นชื่อในเรื่องความแข็งแรง ทนต่อการกัดกร่อน และมีน้ำหนักเบา ทำให้ติดตั้งและขนย้ายได้ง่าย ระบบบำบัดน้ำเสียภายในถังใช้กระบวนการทางชีวภาพในการย่อยสลายสารอินทรีย์และกำจัดสารปนเปื้อนต่าง ๆ ในน้ำเสีย ส่งผลให้ได้น้ำที่ผ่านการบำบัดคุณภาพสูงขึ้นก่อนปล่อยคืนสู่สิ่งแวดล้อมหรือระบบระบายน้ำสาธารณะ เรามีถังบำบัดน้ำเสียขนาดใหญ่ให้เลือก 3 รูปแบบ",
      en: "TANK-Q brand fiberglass septic tanks are used for wastewater treatment. Made from fiberglass, they are known for their strength, corrosion resistance, and lightweight design, making them easy to install and transport. The wastewater treatment system within the tank uses a biological process to decompose organic matter and remove various pollutants in wastewater. This results in treated water of higher quality before being released back into the environment or public drainage systems. We offer three types of large-scale septic tanks.",
    },
    specs: [
      {
        icon: "material",
        label: { th: "วัสดุไฟเบอร์กลาส (FRP)", en: "FRP Material" },
      },
      {
        icon: "wasteWaterTreatment",
        label: { th: "สำหรับบำบัดน้ำเสีย", en: "For Waste Water Treatment" },
      },
      {
        icon: "brand",
        label: { th: "แบรนด์ TANK-Q", en: "TANK-Q Brand" },
      },
    ],
    images: [
      "/images/products/fiberglass-septic-tank/fiberglassentry.webp",
      "/images/products/fiberglass-septic-tank/2.webp",
      "/images/products/fiberglass-septic-tank/3.webp",
    ],
    featured: false,
    order: 3,
  },
  {
    id: "pe-septic-tank-grease-trap",
    slug: "pe-septic-tank-grease-trap",
    categoryId: "pe-septic-tank-grease-trap",
    title: {
      th: "ถังบำบัดน้ำเสีย PE และถังดักไขมัน",
      en: "PE Septic Tank & Grease Trap",
    },
    description: {
      th: "ถังบำบัดน้ำเสีย PE และถังดักไขมัน แบรนด์ TANK-Q ผลิตจากวัสดุที่มีคุณภาพ แข็งแรง ทนทาน มีให้เลือกทั้งถังบำบัดน้ำเสียแบบไร้รอยต่อ และถังดักไขมันตั้งแต่ขนาดเล็กถึงใหญ่ สำหรับใช้ในครัวเรือนและภาคอุตสาหกรรม",
      en: "TANK-Q PE septic tanks and grease traps are made from quality material that is strong and durable. Choose from a seamless wastewater treatment tank and grease traps from small to large sizes, for household and industrial use.",
    },
    sectionLinks: [
      {
        label: { th: "ถังบำบัดน้ำเสีย PE", en: "PE Waste Water Treatment Tank" },
        sectionId: "pe-waste-water-treatment-tank",
      },
      {
        label: { th: "ถังดักไขมัน", en: "Grease Trap" },
        sectionId: "septic-tank-and-grease-trap",
      },
    ],
    // Each variant's own pictures sit in its gallery section - see
    // `galleryInSections`. This is just the cover for cards and link previews.
    images: ["/images/products/pe-waste-water-treatment-tank/3.webp"],
    galleryInSections: true,
    featured: false,
    order: 4,
  },
  {
    id: "epoxy-flooring",
    slug: "epoxy-flooring",
    categoryId: "epoxy-flooring",
    title: {
      th: "พื้นอีพ็อกซี่",
      en: "Epoxy Flooring",
    },
    description: {
      th: "เป็นสีประสิทธิภาพสูงระบบ 2 ส่วนผสม สำหรับเคลือบพื้นหรือผนังคอนกรีต ให้ความเงางาม ทำความสะอาดง่าย ไม่ก่อให้เกิดฝุ่น ทนทานต่อการกัดกร่อน รอยขีดข่วน ไอระเหย กรด ด่าง น้ำ และสารเคมี ใช้งานง่าย มีความหนาเริ่มต้นที่ 150 ไมครอน เหมาะสำหรับอุตสาหกรรมขนาดเบาถึงขนาดกลาง",
      en: "A high-performance two-component paint for coating concrete floors or walls, giving a glossy finish that is easy to clean and dust-free. Resistant to corrosion, scratches, vapor, acids, alkalis, water and chemicals, and easy to apply, with a starting thickness of 150 microns. Suitable for light to medium-duty industrial use.",
    },
    specs: [
      {
        icon: "material",
        label: { th: "วัสดุอีพ็อกซี่ 2 ส่วนผสม", en: "2-Component Epoxy" },
      },
      {
        label: { th: "สำหรับเคลือบพื้นและผนัง", en: "For Floor & Wall Coating" },
      },
      {
        icon: "brand",
        label: { th: "แบรนด์ TANK-Q", en: "TANK-Q Brand" },
      },
    ],
    images: [
      "/images/products/epoxy-flooring/1.jpg",
      "/images/products/epoxy-flooring/2.jpg",
      "/images/products/epoxy-flooring/3.jpg",
      "/images/products/epoxy-flooring/4.jpg",
      "/images/products/epoxy-flooring/5.webp",
      "/images/products/epoxy-flooring/6.webp",
      "/images/products/epoxy-flooring/7.webp",
      "/images/products/epoxy-flooring/8.webp",
      "/images/products/epoxy-flooring/9.webp",
      "/images/products/epoxy-flooring/10.webp",
      "/images/products/epoxy-flooring/11.webp",
      "/images/products/epoxy-flooring/12.webp",
    ],
    featured: true,
    order: 5,
  },
  {
    id: "polyurethane-concrete-flooring",
    slug: "polyurethane-concrete-flooring",
    categoryId: "polyurethane-concrete-flooring",
    title: {
      th: "พื้นโพลียูรีเทนคอนกรีต",
      en: "Polyurethane Concrete Flooring",
    },
    description: {
      th: "เรานำเสนอระบบพื้นโพลียูรีเทนสำหรับงานคอนกรีตที่หลากหลาย ซึ่งออกแบบมาเพื่อรองรับการใช้งานหนักและสภาพแวดล้อมที่ต้องเผชิญกับสภาวะการใช้งานที่รุนแรง พื้นระบบนี้มีความทนทานต่อสารเคมีและการแทรกซึมของความชื้น อีกทั้งยังทนทานต่อกรดที่ใช้ในการปรุงอาหาร ด่าง น้ำมัน ไขมัน และกระบวนการทำความสะอาดที่เข้มข้น จึงเป็นทางเลือกที่เหมาะสมอย่างยิ่งสำหรับโรงงานแปรรูปอาหารและเครื่องดื่ม โดยให้ผลลัพธ์ที่ทนทานและต้องการการบำรุงรักษาน้อย ความหนาโดยทั่วไป: 2.0 - 20.0 มม. ระยะเวลาแห้งตัว: แตกต่างกันไปตามแต่ละระบบ แต่โดยทั่วไปจะใช้เวลาประมาณ 12 ถึง 24 ชั่วโมงก่อนเปิดใช้งานเต็มรูปแบบ",
      en: "We offer a range of polyurethane concrete flooring systems designed to withstand heavy use and harsh operating environments. This flooring system resists chemicals and moisture penetration, and is also resistant to food-preparation acids, alkalis, oils, fats and intensive cleaning processes, making it an excellent choice for food and beverage processing plants, with durable results that require little maintenance. Typical thickness: 2.0 - 20.0 mm. Curing time: varies by system, but generally takes around 12 to 24 hours before full use.",
    },
    specs: [
      {
        icon: "material",
        label: { th: "วัสดุโพลียูรีเทน", en: "Polyurethane Material" },
      },
      {
        label: { th: "สำหรับโรงงานอาหารและเครื่องดื่ม", en: "For Food & Beverage Plants" },
      },
      {
        icon: "brand",
        label: { th: "แบรนด์ TANK-Q", en: "TANK-Q Brand" },
      },
    ],
    images: [
      "/images/products/polyurethane-concrete-flooring/1.webp",
      "/images/products/polyurethane-concrete-flooring/2.webp",
      "/images/products/polyurethane-concrete-flooring/3.webp",
      "/images/products/polyurethane-concrete-flooring/4.webp",
      "/images/products/polyurethane-concrete-flooring/5.webp",
      "/images/products/polyurethane-concrete-flooring/6.webp",
    ],
    featured: false,
    order: 6,
  },
  {
    id: "water-wastewater-treatment-system",
    slug: "water-wastewater-treatment-system",
    categoryId: "water-wastewater-treatment-system",
    title: {
      th: "ระบบน้ำดีและน้ำเสีย",
      en: "Water & Wastewater Treatment System",
    },
    description: {
      th: "ระบบน้ำดีและน้ำเสียจาก TANK-Q ครอบคลุมทั้งระบบบำบัดน้ำเพื่อปรับปรุงคุณภาพน้ำให้เหมาะสมกับการบริโภค การอุปโภค และงานอุตสาหกรรม และระบบบำบัดน้ำเสียเพื่อให้น้ำกลับมามีคุณภาพเหมาะสมที่จะปล่อยสู่สิ่งแวดล้อมหรือนำกลับมาใช้ซ้ำ",
      en: "TANK-Q water and wastewater systems cover both water treatment, which brings water up to a quality suited to drinking, everyday use and industry, and wastewater treatment, which returns used water to a quality fit for release into the environment or for reuse.",
    },
    sectionLinks: [
      {
        label: { th: "ระบบบำบัดน้ำ", en: "Water Treatment System" },
        sectionId: "water-treatment-system",
      },
      {
        label: { th: "ระบบบำบัดน้ำเสีย", en: "Wastewater Treatment System" },
        sectionId: "wastewater-treatment-system",
      },
    ],
    // Each variant's own pictures sit in its gallery section - see
    // `galleryInSections`. This is just the cover for cards and link previews.
    images: ["/images/products/water-treatment-system/1.webp"],
    galleryInSections: true,
    featured: true,
    order: 7,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

/** The full catalogue in listing order. */
export function getAllProducts(): Product[] {
  return [...products].sort((a, b) => a.order - b.order);
}

/**
 * The featured trio (matching the home/about page's "Featured products"
 * section), minus `slug`, capped at `limit` — the "view other products"
 * strip at the foot of a detail page. Falls back to filling from the rest
 * of the catalogue if `slug` is itself one of the featured products.
 */
export function getRelatedProducts(slug: string, limit = 3): Product[] {
  const featured = getFeaturedProducts().filter(
    (product) => product.slug !== slug,
  );

  if (featured.length >= limit) {
    return featured.slice(0, limit);
  }

  const fallback = getAllProducts().filter(
    (product) =>
      product.slug !== slug &&
      !featured.some((featuredProduct) => featuredProduct.id === product.id),
  );

  return [...featured, ...fallback].slice(0, limit);
}

/** Every product in the given category, in listing order. */
export function getProductsByCategory(
  categoryId: ProductCategoryId,
): Product[] {
  return getAllProducts().filter((product) => product.categoryId === categoryId);
}
