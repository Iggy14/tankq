import type { Localized } from "./localized";
import type { ProductCategoryId } from "./product-categories";
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
      "/images/products/frp-vertical-water-tank/2.webp",
      "/images/products/frp-vertical-water-tank/4.webp",
      "/images/products/frp-vertical-water-tank/1.webp",
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
      "/images/products/pe-above-ground-water-tank/6.webp",
      "/images/products/pe-above-ground-water-tank/1.webp",
      "/images/products/pe-above-ground-water-tank/2.webp",
      "/images/products/pe-above-ground-water-tank/3.webp",
      "/images/products/pe-above-ground-water-tank/4.webp",
      "/images/products/pe-above-ground-water-tank/5.webp",
    ],
    featured: true,
    order: 3,
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
      "/images/products/pe-underground-water-tank/1.jpg",
      "/images/products/pe-underground-water-tank/2.webp",
      "/images/products/pe-underground-water-tank/1.webp",
      "/images/products/pe-underground-water-tank/3.webp",
    ],
    featured: false,
    order: 4,
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
      "/images/products/pe-above-ground-water-tank-granite/13.png",
      "/images/products/pe-above-ground-water-tank-granite/1.webp",
      "/images/products/pe-above-ground-water-tank-granite/8.webp",
      "/images/products/pe-above-ground-water-tank-granite/9.webp",
      "/images/products/pe-above-ground-water-tank-granite/10.webp",
      "/images/products/pe-above-ground-water-tank-granite/11.webp",
      "/images/products/pe-above-ground-water-tank-granite/12.webp",
    ],
    featured: false,
    order: 5,
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
      "/images/products/pe-waste-water-treatment-tank/2.jpg",
      "/images/products/pe-waste-water-treatment-tank/1.webp",
      "/images/products/pe-waste-water-treatment-tank/2.webp",
    ],
    featured: false,
    order: 6,
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
      "/images/products/fiberglass-septic-tank/fiberglassentry.jpg",
      "/images/products/fiberglass-septic-tank/2.jpg",
      "/images/products/fiberglass-septic-tank/3.jpg",
    ],
    featured: false,
    order: 8,
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
    order: 9,
  },
  {
    id: "epoxy-flooring",
    slug: "epoxy-flooring",
    categoryId: "epoxy-pu-flooring",
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
      "/images/products/epoxy-flooring/5.jpg",
      "/images/products/epoxy-flooring/6.jpg",
      "/images/products/epoxy-flooring/7.jpg",
      "/images/products/epoxy-flooring/8.jpg",
      "/images/products/epoxy-flooring/9.jpg",
      "/images/products/epoxy-flooring/10.jpg",
      "/images/products/epoxy-flooring/11.jpg",
      "/images/products/epoxy-flooring/12.jpg",
    ],
    featured: false,
    order: 10,
  },
  {
    id: "polyurethane-concrete-flooring",
    slug: "polyurethane-concrete-flooring",
    categoryId: "epoxy-pu-flooring",
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
      "/images/products/polyurethane-concrete-flooring/1.png",
      "/images/products/polyurethane-concrete-flooring/2.png",
      "/images/products/polyurethane-concrete-flooring/3.png",
      "/images/products/polyurethane-concrete-flooring/4.png",
      "/images/products/polyurethane-concrete-flooring/5.png",
      "/images/products/polyurethane-concrete-flooring/6.png",
    ],
    featured: false,
    order: 11,
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
