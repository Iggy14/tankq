import type { Localized } from "./localized";
import type { ProductCategoryId } from "./product-categories";
import type { ProductSection } from "./product-sections";
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
      th: "ถังเก็บนํ้าไฟเบอร์กลาส (FRP) ผ่านกระบวนการผลิตขึ้นรูปด้วยใยเเก้วเสริมเเรงที่มีความใส่ใจเป็นพิเศษเเละทุกๆขั้นตอนได้มาตรฐาน เพื่อความสะอาดปลอดภัย ไร้สารตกค้าง เเข็งเเรง ทนทาน ใช้เพื่อสำรองน้ำปริมาณมากในอุตสาหกรรมขนาดกลาง-ขนาดใหญ่ ทำระบบถังสำรองน้ำดับเพลิง เหมาะสำหรับ สำนักงาน หน่วยงาน คอนโดมิเนียม ห้างสรรพสินค้า ปั๊มน้ำมัน โรงงาน หอพัก โครงการภาครัฐ",
      en: "Fiberglass Reinforced Plastic (FRP) water tank, manufactured with reinforced fiberglass under careful, standardized processes at every step for cleanliness, safety, and zero residue. Strong and durable, used to store large volumes of water in medium to large scale industries and for fire water reserve systems. Suitable for offices, government agencies, condominiums, shopping malls, gas stations, factories, dormitories, and government projects.",
    },
    specs: [
      {
        icon: "material",
        label: { th: "วัสดุไฟเบอร์กลาส (FRP)", en: "FRP Material" },
      },
      {
        icon: "waterStorage",
        label: { th: "สำหรับเก็บน้ำ", en: "For Water Storage" },
      },
      {
        icon: "brand",
        label: { th: "แบรนด์ TANK-Q", en: "TANK-Q Brand" },
      },
    ],
    images: [
      "/images/products/frp-horizontal-water-tank/6.webp",
      "/images/products/frp-horizontal-water-tank/1.webp",
      "/images/products/frp-horizontal-water-tank/2.webp",
      "/images/products/frp-horizontal-water-tank/3.webp",
      "/images/products/frp-horizontal-water-tank/4.webp",
      "/images/products/frp-horizontal-water-tank/5.webp",
    ],
    featured: true,
    order: 1,
    sections: [
      {
        type: "paragraph",
        title: {
          th: "คำแนะนำ",
          en: "Recommendation",
        },
        body: {
          th: "ผลิตตามความต้องการของท่าน เราสามารถออกแบบและผลิตถังเก็บน้ำไฟเบอร์กลาสและถังบำบัดน้ำเสียตามสเปคที่ท่านกำหนด รวมถึงรุ่นทรงกระบอกแนวตั้ง",
          en: "Custom manufacturing based on your specifications. We can design and manufacture fiberglass water storage tanks and wastewater treatment tanks, including vertical cylindrical models.",
        },
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
    ],
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
    specs: [
      {
        icon: "material",
        label: { th: "วัสดุไฟเบอร์กลาส (FRP)", en: "FRP Material" },
      },
      {
        icon: "waterStorage",
        label: { th: "สำหรับเก็บน้ำ", en: "For Water Storage" },
      },
      {
        icon: "brand",
        label: { th: "แบรนด์ TANK-Q", en: "TANK-Q Brand" },
      },
    ],
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
        type: "bulletList",
        title: {
          th: "คุณสมบัติและมาตรฐานคุณภาพ",
          en: "Features and Quality Standards",
        },
        marker: "check",
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
        type: "paragraph",
        title: {
          th: "คำแนะนำ",
          en: "Recommendation",
        },
        body: {
          th: "ถังเก็บนํ้าไฟเบอร์กลาส (FRP) ผ่านกระบวนการผลิตขึ้นรูปด้วยใยเเก้วเสริมเเรงที่มีความใส่ใจเป็นพิเศษเเละทุกๆขั้นตอนได้มาตรฐาน เพื่อความสะอาดปลอดภัย ไร้สารตกค้าง เเข็งเเรง ทนทาน ใช้เพื่อสำรองน้ำปริมาณมากในอุตสาหกรรมขนาดกลาง-ขนาดใหญ่ ทำระบบถังสำรองน้ำดับเพลิง เหมาะสำหรับ สำนักงาน หน่วยงาน คอนโดมิเนียม ห้างสรรพสินค้า ปั๊มน้ำมัน โรงงาน หอพัก โครงการภาครัฐ",
          en: "The FRP fiberglass water tank is formed from glass fibre reinforced plastic with exceptional care, every step of the process held to standard, so the tank stays clean and safe with no residue left behind, strong and long-lasting. It is used to hold large water reserves for medium and large-scale industry and to build fire-water reserve systems, making it suitable for offices, government agencies, condominiums, shopping malls, petrol stations, factories, dormitories and public-sector projects.",
        },
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
    specs: [
      {
        icon: "material",
        label: { th: "วัสดุ PE", en: "PE Material" },
      },
      {
        icon: "waterStorage",
        label: { th: "สำหรับเก็บน้ำ", en: "For Water Storage" },
      },
      {
        icon: "brand",
        label: { th: "แบรนด์ TANK-Q", en: "TANK-Q Brand" },
      },
    ],
    images: [
      "/images/products/pe-above-ground-water-tank/1.webp",
      "/images/products/pe-above-ground-water-tank/2.webp",
      "/images/products/pe-above-ground-water-tank/3.webp",
      "/images/products/pe-above-ground-water-tank/4.webp",
      "/images/products/pe-above-ground-water-tank/5.webp",
    ],
    featured: true,
    order: 3,
    sections: [
      {
        type: "bulletList",
        title: {
          th: "การใช้งาน",
          en: "Usage",
        },
        marker: "dot",
        items: [
          {
            th: "เหมาะสำหรับสำรองน้ำใช้ เพื่อการอุปโภคและบริโภค",
            en: "Suitable for storing reserve water for household use and for drinking",
          },
          {
            th: "ควรใช้งานกับน้ำสะอาดเท่านั้น",
            en: "Should be used with clean water only",
          },
        ],
      },
      {
        type: "bulletList",
        title: {
          th: "คำแนะนำ",
          en: "Recommendation",
        },
        marker: "dot",
        items: [
          {
            th: "การทำความสะอาดถังเก็บน้ำควรทำความสะอาด",
            en: "Clean the water tank",
          },
          {
            th: "ทุก ๆ 3 - 6 เดือน หรือไม่ควรเกิน 1 ปี",
            en: "Every 3 to 6 months, and never leave it longer than a year",
          },
          {
            th: "ใช้แปรงขนอ่อนหรือฟองน้ำขัดภายในตัวถังเก็บน้ำ",
            en: "Scrub the inside of the tank with a soft-bristled brush or a sponge",
          },
          {
            th: "หากถังเก็บน้ำที่มีขนาดที่ลึกควรใช้แปรงที่มีด้ามจับยาวช่วยทำความสะอาดเพื่อให้การทำความสะอาดได้ทั่วถึง",
            en: "For a deep tank, use a long-handled brush so every surface is reached",
          },
          {
            th: "ควรหลีกเลี่ยงแปรงที่มีขนเป็นโลหะหรือเหล็ก",
            en: "Avoid brushes with metal or steel bristles",
          },
          {
            th: "ควรหลีกเลี่ยงฟองน้ำที่ทำจากเหล็ก",
            en: "Avoid sponges made of steel wool",
          },
          {
            th: "ห้ามใช้น้ำยาทำความสะอาดที่มีฤทธิ์เป็นกรดรุนแรง",
            en: "Never use a cleaning agent with strong acidic properties",
          },
          {
            th: "กรุณาตรวจสอบพื้นที่ติดตั้งสำหรับการนำสินค้าเข้าไปติดตั้งก่อน ห้ามวางบนพื้นที่ไม่เรียบ ควรวางบนพื้นเรียบไม่มีเศษวัสดุหลงเหลืออยู่",
            en: "Check the installation area before bringing the tank in. Never place it on uneven ground - it should sit on a flat surface with no debris left on it",
          },
          {
            th: "พื้นที่ติดตั้งของถังต้องแข็งแรงเพียงพอต่อการรับน้ำหนักของถังน้ำ",
            en: "The installation area must be strong enough to carry the weight of the filled tank",
          },
        ],
      },
    ],
  },
  {
    id: "pe-underground-water-tank",
    slug: "pe-underground-water-tank",
    categoryId: "pe-water-tank",
    title: {
      th: "ถังเก็บน้ำใต้ดิน PE รุ่น TU",
      en: "PE Underground Watertank",
    },
    description: {
      th: "ถังเก็บน้ำใต้ดิน TANK-Q รุ่น TU มาตรฐานสากล ปลอดภัย แข็งแรง ทนทาน ตอบโจทย์ทุกไลฟ์สไตล์อย่างลงตัว ผลิตขึ้นรูปด้วยแบบไร้รอยต่อด้วยกระบวนการผลิตที่มีคุณภาพ ทนทานกว่าแข็งแรงกว่าถังประกอบทั่วไปเป็นผลิตภัณฑ์ถังเก็บน้ำใต้ดินที่ได้มาตรฐานตัวถังเก็บน้ำผลิตจากวัสดุที่มีคุณภาพจากแบรนด์ชั้นนำ สะอาดปลอดภัย FOOD GRADE 100% Fitting น้ำเข้า-น้ำออก ทองเหลือง รับประกันยาวนาน 15 ปี",
      en: "The TANK-Q TU underground water tank meets international standards - safe, strong and durable, a perfect fit for every lifestyle. Moulded as one seamless piece through a quality manufacturing process, it is tougher and stronger than assembled tanks. This standard-compliant underground water tank is made from quality material sourced from leading brands, clean and safe with 100% food grade construction, brass inlet and outlet fittings, and backed by a long 15 year warranty.",
    },
    specs: [
      {
        icon: "material",
        label: { th: "วัสดุ PE", en: "PE Material" },
      },
      {
        icon: "waterStorage",
        label: { th: "สำหรับเก็บน้ำ", en: "For Water Storage" },
      },
      {
        icon: "brand",
        label: { th: "แบรนด์ TANK-Q", en: "TANK-Q Brand" },
      },
    ],
    images: [
      "/images/products/pe-underground-water-tank/2.webp",
      "/images/products/pe-underground-water-tank/1.webp",
      "/images/products/pe-underground-water-tank/3.webp",
    ],
    featured: false,
    order: 4,
    sections: [
      {
        type: "bulletList",
        title: {
          th: "การใช้งาน",
          en: "Usage",
        },
        marker: "dot",
        items: [
          {
            th: "เหมาะสำหรับการบำบัดน้ำเสีย",
            en: "Suitable for wastewater treatment",
          },
        ],
      },
      {
        type: "bulletList",
        title: {
          th: "คำแนะนำ",
          en: "Recommendation",
        },
        marker: "dot",
        items: [
          {
            th: "กรุณาตรวจสอบพื้นที่ติดตั้งสำหรับการนำสินค้าเข้าไปติดตั้งก่อน ห้ามวางบนพื้นที่ไม่เรียบ ควรวางบนพื้นเรียบไม่มีเศษวัสดุหลงเหลืออยู่",
            en: "Check the installation area before bringing the tank in. Never place it on uneven ground - it should sit on a flat surface with no debris left on it",
          },
          {
            th: "พื้นที่ติดตั้งของถังต้องแข็งแรงเพียงพอต่อการรับน้ำหนักของถังน้ำ",
            en: "The installation area must be strong enough to carry the weight of the filled tank",
          },
        ],
      },
    ],
  },
  {
    id: "pe-above-ground-water-tank-granite",
    slug: "pe-above-ground-water-tank-granite",
    categoryId: "pe-water-tank",
    title: {
      th: "ถังเก็บน้ำบนดิน PE รุ่น TG (ลายหินแกรนิต)",
      en: "TG Series Above-Ground Water Tank (Granite Finish)",
    },
    description: {
      th: "ถังเก็บน้ำ แบรนด์ TANK-Q เป็นผลิตภัณฑ์ถังเก็บน้ำที่ได้มาตรฐาน มีตั้งแต่ขนาด ถังน้ำ 330 ลิตร, ถังน้ำ 500 ลิตร, ถังน้ำ 600 ลิตร, ถังน้ำ 750 ลิตร, ถังน้ำ 1000 ลิตร, ถังน้ำ 1500 ลิตร, ถังน้ำ 2000 ลิตร, ถังน้ำ 2500 ลิตร, ถังน้ำ 3000 ลิตร, ถังน้ำ 4000 ลิตร, ถังน้ำ 5000 ลิตร, ถังน้ำ 6000 ลิตร, ถังน้ำ 8000 ลิตร, ถังน้ำ 10000 ลิตร ตัวถังเก็บน้ำผลิตจากวัสดุที่มีคุณภาพ มีความแข็งแรง ทนทาน และไม่มีสารพิษในกระบวนการผลิต สะอาด ปลอดภัย ไร้กลิ่นไม่พึงประสงค์ ให้คุณใช้งานได้อย่างมั่นใจด้วยมาตรฐาน มอก. ถังเก็บน้ำ 1379-2551 เหมาะสำหรับใช้งานภายในบ้าน, อาคารสำนักงาน, ร้านอาหาร, ร้านคาเฟ่ หรือพื้นที่ใช้งานตามต้องการ",
      en: "TANK-Q water storage tanks are built to standard and come in sizes from 330 litres, 500 litres, 600 litres, 750 litres, 1000 litres, 1500 litres, 2000 litres, 2500 litres, 3000 litres, 4000 litres, 5000 litres, 6000 litres and 8000 litres up to 10000 litres. The tank body is produced from quality material that is strong and durable, with no toxic substances used anywhere in the manufacturing process, so the water stays clean, safe and free of any unpleasant odour. You can use it with full confidence under the TIS 1379-2551 water tank standard, making it suitable for homes, office buildings, restaurants, cafes or any area where you need it.",
    },
    specs: [
      {
        icon: "material",
        label: { th: "วัสดุลายหินแกรนิต", en: "Granite Material" },
      },
      {
        icon: "waterStorage",
        label: { th: "สำหรับเก็บน้ำ", en: "For Water Storage" },
      },
      {
        icon: "brand",
        label: { th: "แบรนด์ TANK-Q", en: "TANK-Q Brand" },
      },
    ],
    images: [
      "/images/products/pe-above-ground-water-tank-granite/1.webp",
      "/images/products/pe-above-ground-water-tank-granite/2.webp",
      "/images/products/pe-above-ground-water-tank-granite/3.webp",
      "/images/products/pe-above-ground-water-tank-granite/4.webp",
      "/images/products/pe-above-ground-water-tank-granite/5.webp",
      "/images/products/pe-above-ground-water-tank-granite/6.webp",
      "/images/products/pe-above-ground-water-tank-granite/7.webp",
      "/images/products/pe-above-ground-water-tank-granite/8.webp",
      "/images/products/pe-above-ground-water-tank-granite/9.webp",
      "/images/products/pe-above-ground-water-tank-granite/10.webp",
      "/images/products/pe-above-ground-water-tank-granite/11.webp",
      "/images/products/pe-above-ground-water-tank-granite/12.webp",
    ],
    featured: false,
    order: 5,
    sections: [
      {
        type: "bulletList",
        title: {
          th: "การใช้งาน",
          en: "Usage",
        },
        marker: "dot",
        items: [
          {
            th: "เหมาะสำหรับสำรองน้ำใช้ เพื่อการอุปโภคและบริโภค",
            en: "Suitable for storing reserve water for household use and for drinking",
          },
          {
            th: "ควรใช้งานกับน้ำสะอาดเท่านั้น",
            en: "Should be used with clean water only",
          },
        ],
      },
      {
        type: "bulletList",
        title: {
          th: "คำแนะนำ",
          en: "Recommendation",
        },
        marker: "dot",
        items: [
          {
            th: "การทำความสะอาดถังเก็บน้ำควรทำความสะอาด",
            en: "Clean the water tank",
          },
          {
            th: "ทุก ๆ 3 - 6 เดือน หรือไม่ควรเกิน 1 ปี",
            en: "Every 3 to 6 months, and never leave it longer than a year",
          },
          {
            th: "ใช้แปรงขนอ่อนหรือฟองน้ำขัดภายในตัวถังเก็บน้ำ",
            en: "Scrub the inside of the tank with a soft-bristled brush or a sponge",
          },
          {
            th: "หากถังเก็บน้ำที่มีขนาดที่ลึกควรใช้แปรงที่มีด้ามจับยาวช่วยทำความสะอาดเพื่อให้การทำความสะอาดได้ทั่วถึง",
            en: "For a deep tank, use a long-handled brush so every surface is reached",
          },
          {
            th: "ควรหลีกเลี่ยงแปรงที่มีขนเป็นโลหะหรือเหล็ก",
            en: "Avoid brushes with metal or steel bristles",
          },
          {
            th: "ควรหลีกเลี่ยงฟองน้ำที่ทำจากเหล็ก",
            en: "Avoid sponges made of steel wool",
          },
          {
            th: "ห้ามใช้น้ำยาทำความสะอาดที่มีฤทธิ์เป็นกรดรุนแรง",
            en: "Never use a cleaning agent with strong acidic properties",
          },
          {
            th: "กรุณาตรวจสอบพื้นที่ติดตั้งสำหรับการนำสินค้าเข้าไปติดตั้งก่อน ห้ามวางบนพื้นที่ไม่เรียบ ควรวางบนพื้นเรียบไม่มีเศษวัสดุหลงเหลืออยู่",
            en: "Check the installation area before bringing the tank in. Never place it on uneven ground - it should sit on a flat surface with no debris left on it",
          },
          {
            th: "พื้นที่ติดตั้งของถังต้องแข็งแรงเพียงพอต่อการรับน้ำหนักของถังน้ำ",
            en: "The installation area must be strong enough to carry the weight of the filled tank",
          },
        ],
      },
    ],
  },
  {
    id: "pe-waste-water-treatment-tank",
    slug: "pe-waste-water-treatment-tank",
    categoryId: "septic-tank-grease-trap",
    title: {
      th: "ถังบำบัดน้ำเสีย PE",
      en: "PE Waste Water Treatment Tank",
    },
    description: {
      th: "มาตรฐานนวัตกรรมการผลิตถังที่แข็งแรงสูงสุดไร้รอยต่อทั้งใบ มีประสิทธิภาพในการบำบัด ถังบำบัดน้ำเสีย แข็งแรงทนทานถังไร้รอยต่อ มีให้เลือกหลาย เช่น ถังบำบัดน้ำเสีย 600 ลิตร ไปจนถึง 6000 ลิตร ราคาคุณภาพ และขนาดอื่นๆ ที่สามารถตอบทุกโจทย์ความต้องการ ด้วยคุณภาพที่เหนือกว่าถังบำบัดทั่วไป",
      en: "Built with innovative manufacturing standards for maximum strength in one seamless, joint-free tank, delivering highly effective wastewater treatment. Strong and durable with a seamless tank body, available in a wide range of sizes from 600 litres up to 6000 litres and beyond, all at a price that matches the quality. It answers every requirement with quality that surpasses ordinary treatment tanks.",
    },
    specs: [
      {
        icon: "material",
        label: { th: "วัสดุ PE", en: "PE Material" },
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
      "/images/products/pe-waste-water-treatment-tank/1.webp",
      "/images/products/pe-waste-water-treatment-tank/2.webp",
    ],
    featured: false,
    order: 6,
    sections: [
      {
        type: "bulletList",
        title: {
          th: "การใช้งาน",
          en: "Usage",
        },
        marker: "dot",
        items: [
          {
            th: "เหมาะสำหรับการบำบัดน้ำเสีย",
            en: "Suitable for wastewater treatment",
          },
        ],
      },
      {
        type: "bulletList",
        title: {
          th: "คำแนะนำ",
          en: "Recommendation",
        },
        marker: "dot",
        items: [
          {
            th: "ระยะเวลาในการสูบกากตะกอน ทั้งส่วนเกรอะและกรองทุก ๆ 2-3 ปี เพื่อให้บ่อเกรอะมีประสิทธิภาพในการบำบัดอยู่เสมอ และต้องให้มีน้ำเหลืออยู่ 2 ใน 3 ส่วนหลังการสูบกาก",
            en: "Pump out the sludge from both the septic and the filter chamber every 2 to 3 years so the septic chamber keeps treating at full efficiency, and leave the tank two thirds full of water after pumping",
          },
          {
            th: "กรุณาตรวจสอบพื้นที่ติดตั้งสำหรับการนำสินค้าเข้าไปติดตั้งก่อน ห้ามวางบนพื้นที่ไม่เรียบ ควรวางบนพื้นเรียบไม่มีเศษวัสดุหลงเหลืออยู่",
            en: "Check the installation area before bringing the tank in. Never place it on uneven ground - it should sit on a flat surface with no debris left on it",
          },
        ],
      },
      {
        type: "specTable",
        title: {
          th: "ตารางขนาดถังบำบัดน้ำเสียไฟเบอร์กลาส",
          en: "FRP Wastewater Tank Size Table",
        },
        columns: [
          { th: "อัตราการไหล (m³/วัน)", en: "Flow Rate (m³/day)" },
          { th: "ความจุถัง (m³)", en: "Tank Capacity (m³)" },
          { th: "⌀ (มม.)", en: "⌀ (mm)" },
          { th: "สูง (มม.)", en: "Height (mm)" },
          { th: "ระบบแนะนำ", en: "Recommended System" },
        ],
        rows: [
          [
            { th: "1-5", en: "1-5" },
            { th: "3-10", en: "3-10" },
            { th: "1,400-2,000", en: "1,400-2,000" },
            { th: "2,000-3,000", en: "2,000-3,000" },
            { th: "SBR / เติมอากาศ", en: "SBR / Aerobic" },
          ],
          [
            { th: "5-20", en: "5-20" },
            { th: "10-40", en: "10-40" },
            { th: "2,000-3,000", en: "2,000-3,000" },
            { th: "3,000-4,000", en: "3,000-4,000" },
            { th: "เติมอากาศ + ตกตะกอน", en: "Aerobic + Settling" },
          ],
          [
            { th: "20-100", en: "20-100" },
            { th: "40-200", en: "40-200" },
            { th: "3,000-4,000", en: "3,000-4,000" },
            { th: "4,000-5,000", en: "4,000-5,000" },
            { th: "ไร้อากาศ + เติมอากาศ", en: "Anaerobic + Aerobic" },
          ],
          [
            { th: "100-500", en: "100-500" },
            { th: "200-1,000", en: "200-1,000" },
            // No fixed vessel size at this flow rate: the job becomes several
            // tanks in series, so the source table gives a note, not figures.
            { th: "หลายถังต่ออนุกรม", en: "Multiple tanks in series" },
            { th: "-", en: "-" },
            { th: "ออกแบบระบบครบวงจร", en: "Full System Design" },
          ],
        ],
      },
      {
        type: "orderedList",
        title: {
          th: "ระบบบำบัดที่เราออกแบบและจัดหา",
          en: "Systems We Design & Supply",
        },
        items: [
          {
            title: {
              th: "ระบบเติมอากาศ (Aerobic)",
              en: "Aerobic System",
            },
            body: {
              th: "ระบบเติมอากาศเพื่อลดค่า BOD/COD เหมาะกับน้ำเสียจากอุตสาหกรรมอาหาร เครื่องดื่ม และอุตสาหกรรมทั่วไป",
              en: "Aeration system reducing BOD/COD. Ideal for food, beverage, general industry wastewater.",
            },
          },
          {
            title: {
              th: "ระบบไร้อากาศ (Anaerobic)",
              en: "Anaerobic System",
            },
            body: {
              th: "ระบบบำบัดแบบไร้ออกซิเจน สำหรับน้ำเสียที่มีค่า BOD สูงจากโรงงานสุรา แป้ง และน้ำตาล",
              en: "No-oxygen system for high-BOD wastewater from distilleries, starch, sugar plants.",
            },
          },
          {
            title: {
              th: "ระบบ SBR / MBR",
              en: "SBR / MBR System",
            },
            body: {
              th: "ระบบบำบัดครบวงจรในถังเดียว ประหยัดพื้นที่ เหมาะกับนิคมอุตสาหกรรมหรือชุมชน",
              en: "All-in-one tank system, space-efficient, ideal for industrial estates or communities.",
            },
          },
          {
            title: {
              th: "ถังปรับสมดุล (Equalization Tank)",
              en: "Equalization Tank",
            },
            body: {
              th: "ถังพักน้ำก่อนเข้าสู่ระบบบำบัด เพื่อปรับอัตราการไหลให้สม่ำเสมอ ไฟเบอร์กลาสทนต่อน้ำเสียได้ทุกประเภท",
              en: "Buffer tank before treatment to equalize flow rate. FRP resists all wastewater types.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "septic-tank-and-grease-trap",
    slug: "septic-tank-and-grease-trap",
    categoryId: "septic-tank-grease-trap",
    title: {
      th: "ถังดักไขมัน",
      en: "Septic Tank and Grease Trap",
    },
    description: {
      th: "ถังดักไขมัน เป็นอุปกรณ์ที่ช่วยดักจับไขมันที่เกิดจากการล้างภาชนะและอุปกรณ์หุงต้มอาหาร ไม่ให้ไหลปนไปกับน้ำทิ้ง เพราะไขมันที่ลอยตัวอยู่ผิวน้ำ ทำให้ออกซิเจนละลายน้ำได้น้อย เป็นสาเหตุให้น้ำเน่าเสีย และท่อระบายน้ำเกิดการอุดตันได้ เรามีถังดักไขมันตั้งแต่ขนาดเล็กถึงใหญ่ ให้บริการแก่ลูกค้า เพื่อใช้ในครัวเรือน และภาคอุตสาหกรรม สินค้ารับประกันคุณภาพ ราคาโรงงาน",
      en: "A grease trap is a device that captures the fat and oil produced from washing dishes and cooking equipment, keeping it from flowing out with the wastewater. Grease that floats on the water's surface reduces dissolved oxygen, which causes the water to spoil and the drainage pipes to clog. We offer grease traps from small to large sizes, serving customers for household and industrial use, with guaranteed quality at factory prices.",
    },
    specs: [
      {
        icon: "material",
        label: { th: "วัสดุ PE", en: "PE Material" },
      },
      {
        icon: "greaseTrap",
        label: { th: "สำหรับดักไขมัน", en: "For Grease Trapping" },
      },
      {
        icon: "brand",
        label: { th: "แบรนด์ TANK-Q", en: "TANK-Q Brand" },
      },
    ],
    images: [
      "/images/products/septic-tank-and-grease-trap/1.webp",
      "/images/products/septic-tank-and-grease-trap/2.webp",
      "/images/products/septic-tank-and-grease-trap/3.webp",
      "/images/products/septic-tank-and-grease-trap/4.webp",
      "/images/products/septic-tank-and-grease-trap/5.webp",
    ],
    featured: false,
    order: 7,
    sections: [
      {
        type: "bulletList",
        title: {
          th: "การใช้งาน",
          en: "Usage",
        },
        marker: "dot",
        items: [
          {
            th: "เหมาะสำหรับการบำบัดน้ำเสีย",
            en: "Suitable for wastewater treatment",
          },
        ],
      },
      {
        type: "bulletList",
        title: {
          th: "คำแนะนำ",
          en: "Recommendation",
        },
        marker: "dot",
        items: [
          {
            th: "ตักเศษอาหารทุกวัน: นำตะแกรงกรองเศษอาหารออกมาเททิ้งทุกวัน เพื่อไม่ให้เศษอาหารเน่าเสียและเกิดกลิ่นเหม็น",
            en: "Scoop out food scraps daily: lift the food strainer out and empty it every day so the scraps do not rot and turn foul-smelling",
          },
          {
            th: "ตักไขมันออกทุก 7 วัน: เปิดฝาถังแล้วใช้กระบวยหรือภาชนะตักชั้นไขมันที่ลอยอยู่ผิวน้ำด้านบนไปทิ้งถังขยะ ห้ามเทลงท่อระบายน้ำเด็ดขาด",
            en: "Skim the grease every 7 days: open the lid and use a ladle or a container to lift the layer of grease floating on the surface into the bin. Never pour it down the drain",
          },
          {
            th: "ล้างทำความสะอาดถังทุก 1 เดือน: ถอดชิ้นส่วนภายในหรือเปิดก้นถังเพื่อระบายตะกอนสะสม ล้างคราบสกปรกด้วยน้ำยาล้างจานและน้ำเปล่า",
            en: "Wash the tank out once a month: take the internal parts out or open the base to drain the sediment that has built up, then wash the grime off with dish soap and water",
          },
          {
            th: "ใช้จุลินทรีย์ช่วยย่อย: เติมหัวเชื้อจุลินทรีย์หรือเอนไซม์สัปดาห์ละครั้ง เพื่อช่วยย่อยสลายคราบไขมันที่เกาะตามผนังถังและลดกลิ่นอับ",
            en: "Use microbes to help break it down: add a microbial or enzyme starter once a week to digest the grease clinging to the tank walls and cut back the stale smell",
          },
        ],
      },
    ],
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
