import type { AppLocale } from "@/i18n/routing";

/**
 * Product catalog data.
 *
 * Dynamic content (titles, descriptions) carries both locales inline — read it
 * as `product.title[locale]`, not through next-intl. The message files stay
 * reserved for static UI chrome.
 *
 * The FRP horizontal and vertical tanks carry the real catalogue copy;
 * products 3..8 are still placeholder text derived from the source image filenames.
 */

/** A value that exists once per supported locale. */
export type Localized<T = string> = Record<AppLocale, T>;

export interface Product {
  /** Stable identifier, safe to use as a React key or in future data sources. */
  id: string;
  /** URL-friendly segment, e.g. `/products/frp-horizontal-water-tank`. */
  slug: string;
  title: Localized;
  description: Localized;
  /** Public paths, first image is treated as the cover. */
  images: string[];
  /** Highlighted on the homepage — the first three carry this flag. */
  featured: boolean;
  /** Manual sort order for the listing page. */
  order: number;
}

export const products: Product[] = [
  {
    id: "frp-horizontal-water-tank",
    slug: "frp-horizontal-water-tank",
    title: {
      th: "ถังเก็บน้ำไฟเบอร์กลาสทรงนอน",
      en: "FRP Horizontal Water Tank",
    },
    description: {
      th: "ผลิตด้วยเรซินไอโซทาลิกหรือเรซินเกรดอาหาร เหมาะสำหรับน้ำดิบ น้ำดับเพลิง ระบบ RO และน้ำในกระบวนการผลิต ไม่เป็นสนิม ไม่รั่วซึม อายุการใช้งานมากกว่า 25 ปี",
      en: "Made with Isophthalic or Food Grade Resin. Suitable for raw water, fire water, RO, and process water. Corrosion-free, leak-proof, 25+ year service life.",
    },
    images: [
      "/images/products/frp-horizontal-water-tank/1.webp",
      "/images/products/frp-horizontal-water-tank/2.webp",
      "/images/products/frp-horizontal-water-tank/3.webp",
      "/images/products/frp-horizontal-water-tank/4.webp",
      "/images/products/frp-horizontal-water-tank/5.webp",
      "/images/products/frp-horizontal-water-tank/6.webp",
    ],
    featured: true,
    order: 1,
  },
  {
    id: "frp-vertical-water-tank",
    slug: "frp-vertical-water-tank",
    title: {
      th: "ถังเก็บน้ำไฟเบอร์กลาสทรงตั้ง",
      en: "FRP Vertical Water Tank",
    },
    description: {
      th: "ผลิตด้วยเรซินไอโซทาลิกหรือเรซินเกรดอาหาร เหมาะสำหรับน้ำดิบ น้ำดับเพลิง ระบบ RO และน้ำในกระบวนการผลิต ไม่เป็นสนิม ไม่รั่วซึม อายุการใช้งานมากกว่า 25 ปี",
      en: "Made with Isophthalic or Food Grade Resin. Suitable for raw water, fire water, RO, and process water. Corrosion-free, leak-proof, 25+ year service life.",
    },
    images: [
      "/images/products/frp-vertical-water-tank/1.webp",
      "/images/products/frp-vertical-water-tank/2.webp",
      "/images/products/frp-vertical-water-tank/3.webp",
      "/images/products/frp-vertical-water-tank/4.webp",
      "/images/products/frp-vertical-water-tank/5.webp",
      "/images/products/frp-vertical-water-tank/6.webp",
      "/images/products/frp-vertical-water-tank/7.webp",
      "/images/products/frp-vertical-water-tank/8.webp",
      "/images/products/frp-vertical-water-tank/9.webp",
      "/images/products/frp-vertical-water-tank/10.webp",
      "/images/products/frp-vertical-water-tank/11.webp",
      "/images/products/frp-vertical-water-tank/12.webp",
      "/images/products/frp-vertical-water-tank/13.webp",
      "/images/products/frp-vertical-water-tank/14.webp",
    ],
    featured: true,
    order: 2,
  },
  {
    id: "product-3",
    slug: "product-3",
    title: {
      th: "สินค้า 3",
      en: "Product 3",
    },
    description: {
      th: "คำอธิบายตัวอย่างสำหรับสินค้า 3 เหมาะกับพื้นที่ติดตั้งที่มีข้อจำกัดเรื่องขนาด เนื้อหาจริง ขนาดถัง และมาตรฐานรับรองจะมาแทนข้อความนี้",
      en: "Placeholder description for Product 3. A practical storage solution suited to sites where space is limited. Real product copy, dimensions, and certifications will replace this text.",
    },
    images: ["/images/products/product-3/1.webp"],
    featured: true,
    order: 3,
  },
  {
    id: "product-4",
    slug: "product-4",
    title: {
      th: "สินค้า 4",
      en: "Product 4",
    },
    description: {
      th: "คำอธิบายตัวอย่างสำหรับสินค้า 4 ผลิตเพื่อการใช้งานที่ยาวนาน ติดตั้งง่าย และดูแลรักษาน้อย รายละเอียดทางเทคนิคอยู่ระหว่างจัดเตรียม",
      en: "Placeholder description for Product 4. Manufactured for long service life with straightforward installation and low maintenance. Detailed specifications are pending.",
    },
    images: ["/images/products/product-4/1.webp"],
    featured: false,
    order: 4,
  },
  {
    id: "product-5",
    slug: "product-5",
    title: {
      th: "สินค้า 5",
      en: "Product 5",
    },
    description: {
      th: "คำอธิบายตัวอย่างสำหรับสินค้า 5 รองรับการติดตั้งทั้งแบบตั้งพื้นและในพื้นที่มีหลังคาคลุม ขึ้นอยู่กับรูปแบบที่เลือก รายละเอียดฉบับสมบูรณ์จะตามมาภายหลัง",
      en: "Placeholder description for Product 5. Suitable for both above-ground and sheltered installations depending on the configuration chosen. Final details are still being prepared.",
    },
    images: [
      "/images/products/product-5/1.webp",
      "/images/products/product-5/2.webp",
    ],
    featured: false,
    order: 5,
  },
  {
    id: "product-6",
    slug: "product-6",
    title: {
      th: "สินค้า 6",
      en: "Product 6",
    },
    description: {
      th: "คำอธิบายตัวอย่างสำหรับสินค้า 6 ตัวเลือกขนาดกะทัดรัดสำหรับหน้างานที่พื้นที่จำกัดแต่ยังต้องการความจุที่ไว้ใจได้ วัสดุ ขนาด และราคาจะระบุในภายหลัง",
      en: "Placeholder description for Product 6. A compact option for smaller sites that still need dependable capacity. Materials, sizes, and pricing will be documented later.",
    },
    images: ["/images/products/product-6/1.webp"],
    featured: false,
    order: 6,
  },
  {
    id: "product-7",
    slug: "product-7",
    title: {
      th: "สินค้า 7",
      en: "Product 7",
    },
    description: {
      th: "คำอธิบายตัวอย่างสำหรับสินค้า 7 โครงสร้างเสริมความแข็งแรงสำหรับงานอุตสาหกรรมที่ใช้งานหนัก สเปกทางเทคนิคอยู่ระหว่างการยืนยัน",
      en: "Placeholder description for Product 7. Built around a reinforced structure intended for demanding industrial environments. Technical specifications are to be confirmed.",
    },
    images: ["/images/products/product-7/1.webp"],
    featured: false,
    order: 7,
  },
  {
    id: "product-8",
    slug: "product-8",
    title: {
      th: "สินค้า 8",
      en: "Product 8",
    },
    description: {
      th: "คำอธิบายตัวอย่างสำหรับสินค้า 8 ปิดท้ายกลุ่มสินค้าด้วยรูปแบบที่เน้นความจุสูงสำหรับการจัดเก็บปริมาณมาก ข้อความนี้จะถูกแทนที่ด้วยเนื้อหาจริง",
      en: "Placeholder description for Product 8. Rounds out the range with a configuration aimed at higher-volume storage needs. Real copy will replace this placeholder text.",
    },
    images: ["/images/products/product-8/1.webp"],
    featured: false,
    order: 8,
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
 * Everything except `slug`, capped at `limit` — the "you may also need"
 * strip at the foot of a detail page.
 */
export function getRelatedProducts(slug: string, limit = 3): Product[] {
  return getAllProducts()
    .filter((product) => product.slug !== slug)
    .slice(0, limit);
}
