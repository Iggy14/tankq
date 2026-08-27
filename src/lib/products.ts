import type { Localized } from "./localized";
import type { ProductSection } from "./product-sections";

// Re-exported so callers can keep reaching for it alongside `Product`.
export type { Localized };

/**
 * Product catalog data.
 *
 * Dynamic content (titles, descriptions) carries both locales inline — read it
 * as `product.title[locale]`, not through next-intl. The message files stay
 * reserved for static UI chrome.
 *
 * The FRP tanks and the PE tank carry the real catalogue copy; products 4..8
 * are still placeholder text derived from the source image filenames.
 */

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
  /**
   * Optional content blocks rendered below the gallery on the detail page —
   * a size table, a datasheet download, a chart. Order is the array order.
   */
  sections?: ProductSection[];
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
    sections: [
      {
        type: "checkList",
        title: {
          th: "คุณสมบัติเด่นและมาตรฐานคุณภาพ",
          en: "Key Features & Quality Assurance",
        },
        items: [
          {
            th: "ได้มาตรฐาน NSF-61 / FDA สำหรับน้ำบริโภคที่สัมผัสอาหาร",
            en: "NSF-61 / FDA compliant for food contact water",
          },
          {
            th: "กำหนดตำแหน่งท่อออกด้านบนหรือด้านล่างได้ตามสเปกของลูกค้า",
            en: "Top/Bottom outlet per customer spec",
          },
          {
            th: "อุปกรณ์ครบชุด: ฝาแมนโฮล บันได ช่องระบายอากาศ และเกจวัดระดับน้ำ",
            en: "Full accessories: manhole, ladder, vent, level gauge",
          },
          {
            th: "ทดสอบแรงดันน้ำ (Hydrostatic Test) ทุกใบก่อนส่งมอบ",
            en: "Hydrostatic tested before delivery",
          },
          {
            th: "มีทีมงานติดตั้งและทดสอบระบบพร้อมให้บริการ",
            en: "Installation and commissioning team available",
          },
        ],
      },
      {
        type: "specTable",
        title: {
          th: "ขนาดมาตรฐานถังเก็บน้ำไฟเบอร์กลาส",
          en: "Standard FRP Water Tank Sizes",
        },
        columns: [
          { th: "ความจุ (ลิตร)", en: "Capacity (L)" },
          { th: "เส้นผ่านศูนย์กลาง (มม.)", en: "Diameter (mm)" },
          { th: "ความสูง (มม.)", en: "Height (mm)" },
          { th: "ความหนาผนัง", en: "Wall Thickness" },
          { th: "น้ำหนัก (กก.)", en: "Weight (kg)" },
        ],
        rows: [
          [{ th: "500", en: "500" }, { th: "800", en: "800" }, { th: "1,050", en: "1,050" }, { th: "5", en: "5" }, { th: "42", en: "42" }],
          [{ th: "1,000", en: "1,000" }, { th: "1,000", en: "1,000" }, { th: "1,350", en: "1,350" }, { th: "6", en: "6" }, { th: "68", en: "68" }],
          [{ th: "2,000", en: "2,000" }, { th: "1,200", en: "1,200" }, { th: "1,850", en: "1,850" }, { th: "6", en: "6" }, { th: "105", en: "105" }],
          [{ th: "3,000", en: "3,000" }, { th: "1,400", en: "1,400" }, { th: "2,000", en: "2,000" }, { th: "7", en: "7" }, { th: "145", en: "145" }],
          [{ th: "5,000", en: "5,000" }, { th: "1,600", en: "1,600" }, { th: "2,600", en: "2,600" }, { th: "8", en: "8" }, { th: "210", en: "210" }],
          [{ th: "10,000", en: "10,000" }, { th: "2,000", en: "2,000" }, { th: "3,300", en: "3,300" }, { th: "10", en: "10" }, { th: "390", en: "390" }],
          [{ th: "20,000", en: "20,000" }, { th: "2,500", en: "2,500" }, { th: "4,200", en: "4,200" }, { th: "12", en: "12" }, { th: "680", en: "680" }],
          [{ th: "50,000", en: "50,000" }, { th: "3,500", en: "3,500" }, { th: "5,500", en: "5,500" }, { th: "16", en: "16" }, { th: "1,600", en: "1,600" }],
          [{ th: "100,000", en: "100,000" }, { th: "4,500", en: "4,500" }, { th: "6,500", en: "6,500" }, { th: "20", en: "20" }, { th: "3,200", en: "3,200" }],
        ],
      },
      {
        type: "imageGrid",
        title: {
          th: "แบบมาตรฐานถังเก็บน้ำไฟเบอร์กลาส",
          en: "Standard Tank Designs",
        },
        images: [
          {
            src: "/images/products/frp-vertical-water-tank/standard-designs/1.webp",
            alt: {
              th: "แบบมิติถังเก็บน้ำไฟเบอร์กลาสทรงตั้ง ขนาด 8 ลูกบาศก์เมตร",
              en: "Dimension drawing of the 8 m³ FRP vertical water tank",
            },
          },
          {
            src: "/images/products/frp-vertical-water-tank/standard-designs/2.webp",
            alt: {
              th: "แบบมิติถังเก็บน้ำไฟเบอร์กลาสทรงตั้ง ขนาด 10 ลูกบาศก์เมตร",
              en: "Dimension drawing of the 10 m³ FRP vertical water tank",
            },
          },
          {
            src: "/images/products/frp-vertical-water-tank/standard-designs/3.webp",
            alt: {
              th: "แบบมิติถังเก็บน้ำไฟเบอร์กลาสทรงตั้ง ขนาด 15 ลูกบาศก์เมตร",
              en: "Dimension drawing of the 15 m³ FRP vertical water tank",
            },
          },
          {
            src: "/images/products/frp-vertical-water-tank/standard-designs/4.webp",
            alt: {
              th: "แบบมิติถังเก็บน้ำไฟเบอร์กลาสทรงตั้ง ขนาด 20 ลูกบาศก์เมตร",
              en: "Dimension drawing of the 20 m³ FRP vertical water tank",
            },
          },
          {
            src: "/images/products/frp-vertical-water-tank/standard-designs/5.webp",
            alt: {
              th: "แบบมิติถังเก็บน้ำไฟเบอร์กลาสทรงตั้ง ขนาด 25 ลูกบาศก์เมตร",
              en: "Dimension drawing of the 25 m³ FRP vertical water tank",
            },
          },
          {
            src: "/images/products/frp-vertical-water-tank/standard-designs/6.webp",
            alt: {
              th: "แบบมิติถังเก็บน้ำไฟเบอร์กลาสทรงตั้ง ขนาด 30 ลูกบาศก์เมตร",
              en: "Dimension drawing of the 30 m³ FRP vertical water tank",
            },
          },
          {
            src: "/images/products/frp-vertical-water-tank/standard-designs/7.webp",
            alt: {
              th: "แบบมิติถังเก็บน้ำไฟเบอร์กลาสทรงตั้ง ขนาด 35 ลูกบาศก์เมตร",
              en: "Dimension drawing of the 35 m³ FRP vertical water tank",
            },
          },
          {
            src: "/images/products/frp-vertical-water-tank/standard-designs/8.webp",
            alt: {
              th: "แบบมิติถังเก็บน้ำไฟเบอร์กลาสทรงตั้ง ขนาด 40 ลูกบาศก์เมตร",
              en: "Dimension drawing of the 40 m³ FRP vertical water tank",
            },
          },
          {
            src: "/images/products/frp-vertical-water-tank/standard-designs/9.webp",
            alt: {
              th: "แบบมิติถังเก็บน้ำไฟเบอร์กลาสทรงตั้ง ขนาด 45 ลูกบาศก์เมตร",
              en: "Dimension drawing of the 45 m³ FRP vertical water tank",
            },
          },
          {
            src: "/images/products/frp-vertical-water-tank/standard-designs/10.webp",
            alt: {
              th: "แบบมิติถังเก็บน้ำไฟเบอร์กลาสทรงตั้ง ขนาด 50 ลูกบาศก์เมตร",
              en: "Dimension drawing of the 50 m³ FRP vertical water tank",
            },
          },
        ],
      },
      {
        type: "paragraph",
        title: {
          th: "สั่งผลิตตามแบบที่ต้องการ",
          en: "Built to Your Own Design",
        },
        body: {
          th: "สามารถผลิตและออกแบบรูปทรงของถังเก็บน้ำและถังบำบัดน้ำเสียไฟเบอร์กลาสได้ตามต้องการ เช่น ทรงกระบอกตั้ง",
          en: "We can design and manufacture FRP water storage tanks and wastewater treatment tanks in the shape you need — the vertical cylindrical form among them.",
        },
      },
    ],
  },
  {
    id: "pe-water-tank",
    slug: "pe-water-tank",
    title: {
      th: "ถังเก็บน้ำ PE บนดิน/ใต้ดิน",
      en: "PE On Ground & Underground Water Tank",
    },
    description: {
      th: "ถังเก็บน้ำ PE คือตัวเลือกที่ตอบโจทย์ทุกความต้องการ ด้วยนวัตกรรมการผลิตที่ทันสมัย ทำให้ถังน้ำของเรามีความแข็งแรงทนทานและปลอดภัยสำหรับทุกการใช้งาน ตัวถังผลิตจากวัสดุ Polyethylene (PE) คุณภาพสูง ซึ่งเป็นพลาสติกเกรดดีเยี่ยม ไร้สารอันตราย Food Grade 100% จึงมั่นใจได้ว่าน้ำที่เก็บไว้จะสะอาด ปลอดภัย ไร้กลิ่น และไม่ส่งผลกระทบต่อสุขภาพ",
      en: "The PE water tank answers every requirement. Modern manufacturing technology makes our tanks strong, durable, and safe for every application. The body is produced from high-quality Polyethylene (PE), an excellent-grade plastic that is free of hazardous substances and 100% Food Grade — so you can be confident the water stored inside stays clean, safe, and odour-free, with no impact on your health.",
    },
    images: [
      "/images/products/pe-water-tank/1.webp",
      "/images/products/pe-water-tank/2.webp",
      "/images/products/pe-water-tank/3.webp",
    ],
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
