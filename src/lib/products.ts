import type { AppLocale } from "@/i18n/routing";

/**
 * Product catalog data.
 *
 * Dynamic content (titles, descriptions) carries both locales inline — read it
 * as `product.title[locale]`, not through next-intl. The message files stay
 * reserved for static UI chrome.
 *
 * Titles are derived from the source image filenames (product1..product8) and
 * every string here is placeholder copy awaiting the real product details.
 */

/** A value that exists once per supported locale. */
export type Localized<T = string> = Record<AppLocale, T>;

export interface Product {
  /** Stable identifier, safe to use as a React key or in future data sources. */
  id: string;
  /** URL-friendly segment, e.g. `/products/product-1`. */
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
    id: "product-1",
    slug: "product-1",
    title: {
      th: "สินค้า 1",
      en: "Product 1",
    },
    description: {
      th: "คำอธิบายตัวอย่างสำหรับสินค้า 1 ถังรุ่นนี้ออกแบบมาเพื่อการเก็บน้ำใช้ในบ้านพักอาศัยและงานเชิงพาณิชย์ขนาดเล็ก รายละเอียดวัสดุและสเปกจริงจะระบุเพิ่มเติมภายหลัง",
      en: "Placeholder description for Product 1. This tank is built for reliable everyday water storage in residential and light commercial settings. Final specifications and materials will be confirmed before launch.",
    },
    images: [
      "/images/products/product-1/1.webp",
      "/images/products/product-1/2.webp",
      "/images/products/product-1/3.webp",
    ],
    featured: true,
    order: 1,
  },
  {
    id: "product-2",
    slug: "product-2",
    title: {
      th: "สินค้า 2",
      en: "Product 2",
    },
    description: {
      th: "คำอธิบายตัวอย่างสำหรับสินค้า 2 ตัวถังผลิตให้ทนต่อการใช้งานต่อเนื่อง พร้อมผิวชั้นในที่ปลอดภัยสำหรับน้ำอุปโภคบริโภค ขนาดความจุและอุปกรณ์ประกอบยังอยู่ระหว่างการสรุป",
      en: "Placeholder description for Product 2. Designed to hold up under continuous use with a durable outer shell and a food-safe inner lining. Capacity options and fittings are still to be finalised.",
    },
    images: [
      "/images/products/product-2/1.webp",
      "/images/products/product-2/2.webp",
      "/images/products/product-2/3.webp",
      "/images/products/product-2/4.webp",
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
