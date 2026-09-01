import type { ProductSection } from "./product-sections";

/**
 * Detail-page section data, keyed by `Product.id`.
 *
 * Kept out of `src/lib/products.ts` so the catalogue file stays a readable
 * list of products: this is the long-form copy that only the detail page
 * renders. Section text is content, so both locales live inline - read it as
 * `block.title[locale]`, never through next-intl.
 *
 * A product with no entry here simply renders no sections.
 */
const productSections: Record<string, ProductSection[]> = {
  "frp-horizontal-water-tank": [
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
  "frp-vertical-water-tank": [
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
  "pe-above-ground-water-tank": [
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
  "pe-underground-water-tank": [
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
  "pe-above-ground-water-tank-granite": [
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
  "pe-waste-water-treatment-tank": [
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
  "fiberglass-septic-tank": [
    {
      type: "content",
      title: {
        th: "ระบบบำบัดน้ำเสียแบบเกรอะ-กรองไร้อากาศ (Anaerobic Filter System)",
        en: "Septic - Anaerobic Filter System",
      },
      blocks: [
        {
          type: "paragraph",
          body: {
            th: "เป็นหนึ่งในเทคโนโลยีการบำบัดน้ำเสียที่ใช้กระบวนการชีวภาพแบบไร้อากาศ โดยมีหลักการทำงานดังนี้",
            en: "One of the wastewater treatment technologies that works by an anaerobic biological process. It runs as follows.",
          },
        },
        {
          type: "image",
          src: "/images/products/fiberglass-septic-tank/treatment-systems/1.webp",
          alt: {
            th: "ภาพตัดถังบำบัดน้ำเสียแบบเกรอะ-กรองไร้อากาศ แสดงส่วนเกรอะ (1) และส่วนกรองไร้อากาศที่บรรจุวัสดุกรอง (2)",
            en: "Cutaway of the septic - anaerobic filter tank showing the septic chamber (1) and the anaerobic filter chamber packed with filter media (2)",
          },
          width: 1024,
          height: 645,
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              text: {
                th: "ส่วนเกรอะ: น้ำเสียจะถูกนำเข้ามาผ่านถังเกรอะ (Septic Tank) ที่ซึ่งสิ่งสกปรกที่เป็นของแข็งหนักจะตกตะกอนลงไปที่ก้นถัง ส่วนที่เบากว่าจะแยกตัวออกมาลอยที่ผิวน้ำ ในถังนี้จะมีแบคทีเรียไร้อากาศทำการย่อยสลายสารอินทรีย์",
                en: "Septic chamber: wastewater is fed through the septic tank, where the heavy solids settle to the bottom and the lighter matter separates out and floats on the surface. Anaerobic bacteria in this chamber break down the organic matter.",
              },
            },
            {
              text: {
                th: "ส่วนไร้อากาศ: น้ำเสียที่ผ่านการเกรอะแล้วจะถูกนำไปผ่านระบบกรองไร้อากาศ ซึ่งมีวัสดุกรองต่าง ๆ เช่น หินกรวด หินภูเขาไฟ หรือวัสดุพลาสติก ที่แบคทีเรียจะเกาะอยู่และทำการย่อยสลายสารอินทรีย์ในน้ำเสีย",
                en: "Anaerobic chamber: the settled water then passes through an anaerobic filter holding media such as gravel, volcanic rock or plastic media. Bacteria colonise the media and break down the organic matter in the water.",
              },
            },
          ],
        },
        {
          type: "image",
          src: "/images/products/fiberglass-septic-tank/treatment-systems/2.webp",
          alt: {
            th: "ตารางขนาดถังรุ่น WSF-04 ถึง WSF-50 ระบุปริมาณน้ำเสียต่อวัน ขนาดถัง ขนาดท่อเข้าและท่อออก และจำนวนผู้ใช้สูงสุดสำหรับที่พักอาศัย สำนักงาน โรงเรียนและโรงงาน",
            en: "Sizing table for models WSF-04 to WSF-50, listing daily wastewater volume, tank dimensions, inlet and outlet pipe sizes, and the maximum number of users for housing, offices, schools and factories",
          },
          width: 1024,
          height: 361,
        },
      ],
    },
    {
      type: "content",
      title: {
        th: "ระบบบำบัดน้ำเสียแบบเกรอะ-กรองเติมอากาศ (Aerobic Filter System)",
        en: "Septic - Aerobic Filter System",
      },
      blocks: [
        {
          type: "paragraph",
          body: {
            th: "เป็นเทคโนโลยีที่ใช้ในการบำบัดน้ำเสีย โดยผสมผสานการใช้กระบวนการกรองและการเติมอากาศเพื่อส่งเสริมการย่อยสลายสารอินทรีย์ด้วยแบคทีเรียที่ต้องการออกซิเจน (Aerobic Bacteria) มีหลักการทำงานดังนี้",
            en: "A treatment technology that combines filtration with aeration, so that oxygen-dependent bacteria (aerobic bacteria) break the organic matter down. It runs as follows.",
          },
        },
        {
          type: "image",
          src: "/images/products/fiberglass-septic-tank/treatment-systems/3.webp",
          alt: {
            th: "ภาพตัดถังบำบัดน้ำเสียแบบเกรอะ-กรองเติมอากาศ แสดงส่วนเกรอะ (1) ส่วนกรองเติมอากาศ (2) และส่วนพักน้ำที่ผ่านการบำบัด (3)",
            en: "Cutaway of the septic - aerobic filter tank showing the septic chamber (1), the aerated filter chamber (2) and the treated water chamber (3)",
          },
          width: 1024,
          height: 617,
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              text: {
                th: "ส่วนเกรอะ (Septic Tank): น้ำเสียจะถูกนำเข้าถังเกรอะ เพื่อให้สารแขวนลอยและสารที่มีขนาดใหญ่อยู่ในน้ำตกตะกอนลงที่ก้นถัง ส่วนที่เบากว่าจะลอยอยู่ด้านบน แบคทีเรียจะเริ่มทำการย่อยสลายสารอินทรีย์ในน้ำเสีย",
                en: "Septic chamber (Septic Tank): wastewater is fed into the septic tank so that suspended and larger solids settle to the bottom while the lighter matter floats on top. Bacteria begin breaking down the organic matter in the water.",
              },
            },
            {
              text: {
                th: "ส่วนเติมอากาศ (Aerobic Filtration)",
                en: "Aeration stage (Aerobic Filtration)",
              },
              children: {
                ordered: false,
                items: [
                  {
                    text: {
                      th: "น้ำเสียที่ผ่านการเกรอะจะถูกนำเข้าสู่ระบบกรองที่มีการเติมอากาศ เช่น ระบบฟิลเตอร์ที่มีวัสดุกรองเช่น กรวด หินภูเขาไฟ หรือวัสดุพลาสติก แบคทีเรียที่ต้องการออกซิเจนจะเกาะอยู่ที่วัสดุกรองและทำการย่อยสลายสารอินทรีย์ในน้ำเสีย",
                      en: "The settled water enters an aerated filter, for example a filter bed of gravel, volcanic rock or plastic media. Aerobic bacteria colonise the media and break down the organic matter in the water.",
                    },
                  },
                  {
                    text: {
                      th: "ในขั้นตอนนี้จะมีการเติมอากาศอย่างต่อเนื่อง เพื่อเพิ่มปริมาณออกซิเจนในน้ำเสีย ทำให้แบคทีเรียเจริญเติบโตและทำงานได้ดี",
                      en: "Air is fed in continuously at this stage to raise the oxygen level in the water, which keeps the bacteria growing and working well.",
                    },
                  },
                ],
              },
            },
          ],
        },
        {
          type: "image",
          src: "/images/products/fiberglass-septic-tank/treatment-systems/4.webp",
          alt: {
            th: "ตารางขนาดถังรุ่น WSFA-04 ถึง WSFA-50 ระบุปริมาณน้ำเสียต่อวัน ขนาดถัง ขนาดท่อ ปริมาณการจ่ายอากาศ และจำนวนผู้ใช้สูงสุดสำหรับที่พักอาศัย สำนักงาน โรงเรียนและโรงงาน",
            en: "Sizing table for models WSFA-04 to WSFA-50, listing daily wastewater volume, tank dimensions, pipe sizes, air supply rate, and the maximum number of users for housing, offices, schools and factories",
          },
          width: 1024,
          height: 385,
        },
      ],
    },
    {
      type: "content",
      title: {
        th: "ระบบบำบัดน้ำเสียแบบตะกอนเวียนเติมอากาศ (Activated Sludge Process)",
        en: "Activated Sludge Process",
      },
      blocks: [
        {
          type: "paragraph",
          body: {
            th: "เป็นเทคโนโลยีการบำบัดน้ำเสียที่ใช้กระบวนการชีวภาพแบบแอโรบิก (ต้องการออกซิเจน) โดยมีการหมุนเวียนตะกอนกลับมาใช้ใหม่เพื่อเพิ่มประสิทธิภาพในการบำบัดน้ำเสีย หลักการทำงานของระบบนี้มีดังนี้",
            en: "A treatment technology that works by an aerobic (oxygen-dependent) biological process and recirculates the sludge to raise treatment efficiency. The system runs as follows.",
          },
        },
        {
          type: "image",
          src: "/images/products/fiberglass-septic-tank/treatment-systems/5.webp",
          alt: {
            th: "ภาพตัดถังบำบัดน้ำเสียแบบตะกอนเวียนเติมอากาศ แสดงส่วนเกรอะ (1) ถังเติมอากาศ (2) ถังแยกตะกอน (3) และชุดสูบตะกอนเวียนกลับ (4)",
            en: "Cutaway of the activated sludge tank showing the septic chamber (1), the aeration tank (2), the clarifier (3) and the sludge return set (4)",
          },
          width: 1024,
          height: 617,
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              text: {
                th: "ขั้นตอนการเกรอะ (Primary Treatment)",
                en: "Septic stage (Primary Treatment)",
              },
              children: {
                ordered: false,
                items: [
                  {
                    text: {
                      th: "น้ำเสียจะถูกนำเข้าถังเกรอะเพื่อแยกของแข็งออกจากของเหลว ของแข็งที่ตกตะกอนจะถูกเก็บรวบรวมในถังเกรอะ ส่วนของเหลวจะถูกส่งต่อไปยังขั้นตอนถัดไป",
                      en: "Wastewater is fed into the septic tank to separate the solids from the liquid. The settled solids collect in the septic tank and the liquid passes on to the next stage.",
                    },
                  },
                ],
              },
            },
            {
              text: {
                th: "ขั้นตอนการเติมอากาศ (Aeration Tank)",
                en: "Aeration stage (Aeration Tank)",
              },
              children: {
                ordered: false,
                items: [
                  {
                    text: {
                      th: "น้ำเสียจากถังเกรอะจะถูกนำเข้าสู่ถังเติมอากาศ ที่ซึ่งมีการเติมอากาศอย่างต่อเนื่องเพื่อเพิ่มปริมาณออกซิเจนในน้ำเสีย ทำให้แบคทีเรียแอโรบิกสามารถย่อยสลายสารอินทรีย์ได้",
                      en: "Water from the septic tank enters the aeration tank, where air is fed in continuously to raise the oxygen level so that aerobic bacteria can break down the organic matter.",
                    },
                  },
                  {
                    text: {
                      th: "ในถังนี้ แบคทีเรียจะรวมตัวกันเป็นตะกอนจุลชีพ (Microbial Flocs) ที่สามารถดูดซับสารอินทรีย์และย่อยสลายได้อย่างมีประสิทธิภาพ",
                      en: "In this tank the bacteria gather into microbial flocs that absorb organic matter and break it down efficiently.",
                    },
                  },
                ],
              },
            },
            {
              text: {
                th: "ขั้นตอนการแยกตะกอน (Secondary Clarifier)",
                en: "Settling stage (Secondary Clarifier)",
              },
              children: {
                ordered: false,
                items: [
                  {
                    text: {
                      th: "น้ำเสียที่ผ่านการเติมอากาศจะถูกนำเข้าสู่ถังแยกตะกอน ที่ซึ่งตะกอนจุลชีพจะตกตะกอนลงก้นถัง น้ำใสที่อยู่ด้านบนจะถูกนำออกมาเป็นน้ำที่ผ่านการบำบัดแล้ว",
                      en: "The aerated water enters the clarifier, where the microbial flocs settle to the bottom and the clear water above is drawn off as treated water.",
                    },
                  },
                  {
                    text: {
                      th: "ตะกอนจุลชีพบางส่วนจะถูกหมุนเวียนกลับไปยังถังเติมอากาศเพื่อเพิ่มปริมาณแบคทีเรียและเพิ่มประสิทธิภาพในการบำบัด",
                      en: "Part of the sludge is recirculated to the aeration tank to build up the bacteria and raise treatment efficiency.",
                    },
                  },
                ],
              },
            },
            {
              text: {
                th: "การจัดการตะกอนส่วนเกิน",
                en: "Handling the surplus sludge",
              },
              children: {
                ordered: false,
                items: [
                  {
                    text: {
                      th: "ตะกอนจุลชีพที่ไม่ได้หมุนเวียนกลับจะถูกนำไปบำบัดเพิ่มเติมหรือกำจัดตามวิธีการที่เหมาะสม",
                      en: "Sludge that is not recirculated goes on for further treatment or is disposed of by a suitable method.",
                    },
                  },
                ],
              },
            },
          ],
        },
        {
          type: "image",
          src: "/images/products/fiberglass-septic-tank/treatment-systems/6.webp",
          alt: {
            th: "ตารางขนาดถังรุ่น WAS-20 ถึง WAS-100 ระบุปริมาณน้ำเสียต่อวัน ขนาดถัง จำนวนถัง ขนาดท่อเข้าและท่อออก และจำนวนผู้ใช้สูงสุด",
            en: "Sizing table for models WAS-20 to WAS-100, listing daily wastewater volume, tank dimensions, number of tanks, inlet and outlet pipe sizes, and the maximum number of users",
          },
          width: 1024,
          height: 244,
        },
        {
          type: "paragraph",
          body: {
            th: "Thai Chemical Storage (TCS) ผู้เชี่ยวชาญด้านการออกแบบ ผลิต และติดตั้งระบบบำบัดน้ำเสียให้กับกลุ่มโรงงานอุตสาหกรรมต่างๆ ที่เกิดจากการผลิตชิ้นงานของลูกค้า ด้วยประสบการณ์กว่า 20 ปีและโรงงานผลิตขนาดใหญ่ที่ได้มาตรฐาน ISO 9001:2015 เรามุ่งมั่นในการให้บริการและสินค้าที่มีคุณภาพสูงสุด ตอบสนองความต้องการของลูกค้าในทุกอุตสาหกรรม ด้วยทีมงานวิศวกรผู้เชี่ยวชาญและเทคโนโลยีที่ทันสมัย TCS ได้รับความไว้วางใจจากลูกค้าทั้งในและต่างประเทศ เลือก TCS เพื่อความมั่นใจในคุณภาพและบริการระดับมืออาชีพ",
            en: "Thai Chemical Storage (TCS) specialises in designing, manufacturing and installing wastewater treatment systems for industrial plants, handling the wastewater their production generates. With over 20 years of experience and a large ISO 9001:2015 certified factory, we are committed to the highest standard of product and service, meeting the needs of customers in every industry. With a team of specialist engineers and up to date technology, TCS is trusted by customers in Thailand and abroad. Choose TCS for confidence in quality and professional service.",
          },
        },
      ],
    }

  ],
  "septic-tank-and-grease-trap": [
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
};

/** The sections for a product, in render order. Empty when it has none. */
export function getProductSections(productId: string): ProductSection[] {
  return productSections[productId] ?? [];
}
