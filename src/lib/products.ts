import type { Localized } from "./localized";
import type { ProductCategoryId } from "./product-categories";
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
 * Every entry carries the real catalogue copy.
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
    categoryId: "frp-horizontal-water-tank",
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
    categoryId: "frp-vertical-water-tank",
    title: {
      th: "ถังเก็บน้ำไฟเบอร์กลาสทรงตั้ง",
      en: "FRP Vertical Water Tank",
    },
    description: {
      th: "ถังเก็บน้ำไฟเบอร์กลาส (FRP) ผ่านกระบวนการผลิตขึ้นรูปด้วยใยแก้วเสริมแรงที่มีความใส่ใจเป็นพิเศษ และทุก ๆ ขั้นตอนได้มาตรฐาน เพื่อความสะอาดปลอดภัย ไร้สารตกค้าง แข็งแรง ทนทาน ใช้เพื่อสำรองน้ำปริมาณมากในอุตสาหกรรมขนาดกลาง-ขนาดใหญ่ ทำระบบถังสำรองน้ำดับเพลิง เหมาะสำหรับ สำนักงาน หน่วยงาน คอนโดมิเนียม ห้างสรรพสินค้า ปั๊มน้ำมัน โรงงาน หอพัก โครงการภาครัฐ",
      en: "The FRP fiberglass water tank is formed from glass fibre reinforced plastic with exceptional care, every step of the process held to standard, so the tank stays clean and safe with no residue left behind, strong and long-lasting. It is used to hold large water reserves for medium and large-scale industry and to build fire-water reserve systems, making it suitable for offices, government agencies, condominiums, shopping malls, petrol stations, factories, dormitories and public-sector projects.",
    },
    images: [
      "/images/products/frp-vertical-water-tank/4.webp",
      "/images/products/frp-vertical-water-tank/1.webp",
      "/images/products/frp-vertical-water-tank/2.webp",
      "/images/products/frp-vertical-water-tank/3.webp",
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
          th: "คุณสมบัติและมาตรฐานคุณภาพ",
          en: "Features and Quality Standards",
        },
        items: [
          {
            th: "ผลิตจากเรซิ่นชนิดพิเศษ ผสมใยแก้ว มีความแข็งแรง",
            en: "Made from a special grade of resin blended with glass fibre for high strength",
          },
          {
            th: "โครงสร้างแข็งแรง ป้องกันรอยรั่วซึมหรือรอยร้าว",
            en: "Strong structure that guards against leaks and cracking",
          },
          {
            th: "ไม่ย่อยสลาย ไม่ผุกร่อน ทนทุกสภาวะสิ่งแวดล้อม",
            en: "Does not degrade or corrode, and stands up to every environment",
          },
          {
            th: "ประกอบและติดตั้งง่าย รวดเร็ว ประหยัดค่าใช้จ่าย",
            en: "Quick and easy to assemble and install, which keeps costs down",
          },
          {
            th: "ทนต่อแสงแดดกลางแจ้งและป้องกันรังสียูวี (UV)",
            en: "Withstands outdoor sunlight and protects against UV radiation",
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
    ],
  },
  {
    id: "pe-above-ground-water-tank",
    slug: "pe-above-ground-water-tank",
    categoryId: "pe-water-tank",
    title: {
      th: "ถังเก็บน้ำบนดิน PE รุ่น TQ",
      en: "TANK-Q PE Above-Ground Water Storage Tank",
    },
    description: {
      th: "ถังเก็บน้ำแบรนด์ TANK-Q เป็นผลิตภัณฑ์ถังเก็บน้ำที่ได้มาตรฐาน มีตั้งแต่ขนาด ถังน้ำ 330 ลิตร, ถังน้ำ 500 ลิตร, ถังน้ำ 600 ลิตร, ถังน้ำ 750 ลิตร, ถังน้ำ 1000 ลิตร, ถังน้ำ 1500 ลิตร, ถังน้ำ 2000 ลิตร, ถังน้ำ 2500 ลิตร, ถังน้ำ 3000 ลิตร, ถังน้ำ 4000 ลิตร, ถังน้ำ 5000 ลิตร, ถังน้ำ 6000 ลิตร, ถังน้ำ 8000 ลิตร, ถังน้ำ 10000 ลิตร ตัวถังเก็บน้ำผลิตจากวัสดุที่มีคุณภาพ มีความแข็งแรง ทนทาน และไม่มีสารพิษในกระบวนการผลิต สะอาด ปลอดภัย ไร้กลิ่นไม่พึงประสงค์ ให้คุณใช้งานได้อย่างมั่นใจด้วยมาตรฐาน มอก. ถังเก็บน้ำ 1379-2551 เหมาะสำหรับใช้งานภายในบ้าน, อาคารสำนักงาน, ร้านอาหาร, ร้านคาเฟ่ หรือพื้นที่ใช้งานตามต้องการ",
      en: "TANK-Q water storage tanks are built to standard and come in sizes from 330 litres, 500 litres, 600 litres, 750 litres, 1000 litres, 1500 litres, 2000 litres, 2500 litres, 3000 litres, 4000 litres, 5000 litres, 6000 litres and 8000 litres up to 10000 litres. The tank body is produced from quality material that is strong and durable, with no toxic substances used anywhere in the manufacturing process, so the water stays clean, safe and free of any unpleasant odour. You can use it with full confidence under the TIS 1379-2551 water tank standard, making it suitable for homes, office buildings, restaurants, cafes or any area where you need it.",
    },
    images: [
      "/images/products/pe-above-ground-water-tank/1.webp",
      "/images/products/pe-above-ground-water-tank/2.webp",
      "/images/products/pe-above-ground-water-tank/3.webp",
      "/images/products/pe-above-ground-water-tank/4.webp",
      "/images/products/pe-above-ground-water-tank/5.webp",
    ],
    featured: true,
    order: 3,
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

/** Every product in the given category, in listing order. */
export function getProductsByCategory(
  categoryId: ProductCategoryId,
): Product[] {
  return getAllProducts().filter((product) => product.categoryId === categoryId);
}
