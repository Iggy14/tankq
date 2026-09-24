import type { ContentSection, ProductSection } from "./product-sections";

/**
 * Shared verbatim between `water-treatment-system` and
 * `wastewater-treatment-system`: its title and copy talk about both systems
 * generically (filters, pumps, control valves, storage tanks, membranes), so
 * it is one constant referenced from both products' arrays below rather than
 * two copies that could drift out of sync.
 */
const waterAndWastewaterMaintenanceSection: ContentSection = {
  type: "content",
  // Nothing links here - it stands on its own at the end of the page - but
  // the `id` is set anyway in case something needs to later.
  id: "maintenance",
  title: {
    th: "การซ่อมบำรุงของระบบน้ำดีและน้ำเสีย",
    en: "Water Treatment and Wastewater System Maintenance",
  },
  blocks: [
    {
      type: "paragraph",
      body: {
        th: "เป็นกระบวนการที่จำเป็นเพื่อให้ระบบทำงานอย่างมีประสิทธิภาพและยืดอายุการใช้งานของอุปกรณ์ โดยปกติจะประกอบด้วยการตรวจสอบและบำรุงรักษาส่วนประกอบต่างๆ ดังนี้:",
        en: "This is a necessary process to keep the system running efficiently and to extend the equipment's service life. It normally consists of inspecting and maintaining the following components:",
      },
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          text: {
            th: "ตัวกรอง: ทำความสะอาดหรือเปลี่ยนไส้กรองเพื่อป้องกันการอุดตัน",
            en: "Filters: clean or replace the filter cartridges to prevent clogging.",
          },
        },
        {
          text: {
            th: "ปั๊มและท่อ: ตรวจสอบการทำงานและซ่อมแซมท่อที่อาจมีการรั่วไหล",
            en: "Pumps and Pipes: check that they are working and repair any pipes that may be leaking.",
          },
        },
        {
          text: {
            th: "ระบบควบคุมและวาล์ว: ตรวจสอบการทำงานและการตั้งค่าของระบบควบคุมเพื่อให้แน่ใจว่าทำงานตามมาตรฐาน",
            en: "Control System and Valves: check the control system's operation and settings to make sure it works to standard.",
          },
        },
        {
          text: {
            th: "ถังเก็บและระบบกักเก็บ: ตรวจสอบความสะอาดและสถานะของถังเพื่อป้องกันการปนเปื้อน",
            en: "Storage Tanks and Containment: check the tanks' cleanliness and condition to prevent contamination.",
          },
        },
        {
          text: {
            th: "เมมเบรนและระบบกรองละเอียด: ตรวจสอบการทำงานและเปลี่ยนเมื่อเสื่อมสภาพ",
            en: "Membranes and Fine Filters: check their operation and replace them once they deteriorate.",
          },
        },
      ],
    },
    {
      type: "paragraph",
      body: {
        th: "การซ่อมบำรุงที่สม่ำเสมอช่วยให้ระบบทำงานได้เต็มประสิทธิภาพและลดความเสี่ยงจากการเกิดปัญหาใหญ่.",
        en: "Regular maintenance keeps the system running at full efficiency and reduces the risk of major problems.",
      },
    },
  ],
};

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
        { th: "Cu.m.", en: "Cu.m." },
        { th: "เส้นผ่านศูนย์กลาง (มม.)", en: "Diameter (mm)" },
        { th: "ความสูง (มม.)", en: "Height (mm)" },
        { th: "ท่อเข้าออก", en: "Inlet and outlet pipes" },
      ],
      rows: [
        [{ th: "8", en: "8" }, { th: "2,000", en: "2,000" }, { th: "2,950", en: "2,950" }, { th: "2\"", en: "2\"" }],
        [{ th: "10", en: "10" }, { th: "2,000", en: "2,000" }, { th: "3,600", en: "3,600" }, { th: "2\"", en: "2\"" }],
        [{ th: "15", en: "15" }, { th: "2,000", en: "2,000" }, { th: "5,200", en: "5,200" }, { th: "2\"", en: "2\"" }],
        [{ th: "20", en: "20" }, { th: "2,500", en: "2,500" }, { th: "4,600", en: "4,600" }, { th: "2\"", en: "2\"" }],
        [{ th: "25", en: "25" }, { th: "2,500", en: "2,500" }, { th: "5,600", en: "5,600" }, { th: "2\"", en: "2\"" }],
        [{ th: "30", en: "30" }, { th: "2,500", en: "2,500" }, { th: "6,600", en: "6,600" }, { th: "2\"", en: "2\"" }],
        [{ th: "35", en: "35" }, { th: "2,500", en: "2,500" }, { th: "7,650", en: "7,650" }, { th: "2\"", en: "2\"" }],
        [{ th: "40", en: "40" }, { th: "2,500", en: "2,500" }, { th: "8,650", en: "8,650" }, { th: "2\"", en: "2\"" }],
        [{ th: "45", en: "45" }, { th: "3,000", en: "3,000" }, { th: "6,700", en: "6,700" }, { th: "2\"", en: "2\"" }],
        [{ th: "50", en: "50" }, { th: "3,000", en: "3,000" }, { th: "7,700", en: "7,700" }, { th: "2\"", en: "2\"" }],
        [{ th: "60", en: "60" }, { th: "3,000", en: "3,000" }, { th: "9,100", en: "9,100" }, { th: "2\"", en: "2\"" }],
        [{ th: "70", en: "70" }, { th: "3,000", en: "3,000" }, { th: "10,500", en: "10,500" }, { th: "2\"", en: "2\"" }],
        [{ th: "80", en: "80" }, { th: "3,500", en: "3,500" }, { th: "9,110", en: "9,110" }, { th: "2\"", en: "2\"" }],
        [{ th: "90", en: "90" }, { th: "3,500", en: "3,500" }, { th: "10,150", en: "10,150" }, { th: "2\"", en: "2\"" }],
        [{ th: "100", en: "100" }, { th: "3,500", en: "3,500" }, { th: "11,500", en: "11,500" }, { th: "2\"", en: "2\"" }],
      ],
      columnAlign: ["left", "center", "center", "center"],
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
        { th: "Cu.m.", en: "Cu.m." },
        { th: "เส้นผ่านศูนย์กลาง (มม.)", en: "Diameter (mm)" },
        { th: "ความสูง (มม.)", en: "Height (mm)" },
        { th: "ท่อเข้าออก", en: "Inlet and outlet pipes" },
      ],
      rows: [
        [{ th: "6", en: "6" }, { th: "2,000", en: "2,000" }, { th: "1,950", en: "1,950" }, { th: "2\"", en: "2\"" }],
        [{ th: "8", en: "8" }, { th: "2,000", en: "2,000" }, { th: "2,600", en: "2,600" }, { th: "2\"", en: "2\"" }],
        [{ th: "10", en: "10" }, { th: "2,000", en: "2,000" }, { th: "3,200", en: "3,200" }, { th: "2\"", en: "2\"" }],
        [{ th: "15", en: "15" }, { th: "2,000", en: "2,000" }, { th: "4,800", en: "4,800" }, { th: "2\"", en: "2\"" }],
        [{ th: "20", en: "20" }, { th: "2,500", en: "2,500" }, { th: "4,100", en: "4,100" }, { th: "2\"", en: "2\"" }],
        [{ th: "25", en: "25" }, { th: "2,500", en: "2,500" }, { th: "5,100", en: "5,100" }, { th: "2\"", en: "2\"" }],
        [{ th: "30", en: "30" }, { th: "2,500", en: "2,500" }, { th: "6,200", en: "6,200" }, { th: "2\"", en: "2\"" }],
        [{ th: "35", en: "35" }, { th: "2,500", en: "2,500" }, { th: "7,200", en: "7,200" }, { th: "2\"", en: "2\"" }],
        [{ th: "40", en: "40" }, { th: "2,500", en: "2,500" }, { th: "8,200", en: "8,200" }, { th: "2\"", en: "2\"" }],
        [{ th: "45", en: "45" }, { th: "3,000", en: "3,000" }, { th: "6,400", en: "6,400" }, { th: "2\"", en: "2\"" }],
        [{ th: "50", en: "50" }, { th: "3,000", en: "3,000" }, { th: "7,100", en: "7,100" }, { th: "2\"", en: "2\"" }],
        [{ th: "60", en: "60" }, { th: "3,000", en: "3,000" }, { th: "8,500", en: "8,500" }, { th: "2\"", en: "2\"" }],
        [{ th: "70", en: "70" }, { th: "3,000", en: "3,000" }, { th: "9,950", en: "9,950" }, { th: "2\"", en: "2\"" }],
        [{ th: "80", en: "80" }, { th: "3,500", en: "3,500" }, { th: "8,320", en: "8,320" }, { th: "2\"", en: "2\"" }],
        [{ th: "90", en: "90" }, { th: "3,500", en: "3,500" }, { th: "9,400", en: "9,400" }, { th: "2\"", en: "2\"" }],
        [{ th: "100", en: "100" }, { th: "3,500", en: "3,500" }, { th: "10,400", en: "10,400" }, { th: "2\"", en: "2\"" }],
      ],
      columnAlign: ["left", "center", "center", "center"],
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
      columnAlign: ["left", "center", "center", "center", "center"],
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
          width: 2289,
          height: 1490,
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
          type: "table",
          columns: [
            { th: "รุ่น", en: "Model" },
            { th: "ปริมาณน้ำเสีย (ลบ.ม./วัน)", en: "Wastewater (m3/day)" },
            { th: "กว้าง (m)", en: "Width (m)" },
            { th: "ยาว (m)", en: "Length (m)" },
            { th: "สูง (m)", en: "Height (m)" },
            { th: "ท่อเข้า (mm)", en: "Inlet (mm)" },
            { th: "ท่อออก (mm)", en: "Outlet (mm)" },
            { th: "ห้องพัก (max)", en: "Rooms (max)" },
            { th: "คน (max)", en: "People (max)" },
            { th: "พนักงาน สนง./รร. (คน)", en: "Staff, office/school" },
            { th: "พนักงาน โรงงาน (คน max)", en: "Staff, factory (max)" },
          ],
          rows: [
            [{ th: "WSF-04", en: "WSF-04" }, { th: "4", en: "4" }, { th: "1.60", en: "1.60" }, { th: "2.20", en: "2.20" }, { th: "1.80", en: "1.80" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "6", en: "6" }, { th: "20", en: "20" }, { th: "60", en: "60" }, { th: "30", en: "30" }],
            [{ th: "WSF-05", en: "WSF-05" }, { th: "5", en: "5" }, { th: "1.60", en: "1.60" }, { th: "2.80", en: "2.80" }, { th: "1.80", en: "1.80" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "8", en: "8" }, { th: "25", en: "25" }, { th: "70", en: "70" }, { th: "40", en: "40" }],
            [{ th: "WSF-06", en: "WSF-06" }, { th: "6", en: "6" }, { th: "1.60", en: "1.60" }, { th: "3.40", en: "3.40" }, { th: "1.80", en: "1.80" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "10", en: "10" }, { th: "30", en: "30" }, { th: "85", en: "85" }, { th: "50", en: "50" }],
            [{ th: "WSF-07", en: "WSF-07" }, { th: "7", en: "7" }, { th: "1.60", en: "1.60" }, { th: "3.95", en: "3.95" }, { th: "1.80", en: "1.80" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "12", en: "12" }, { th: "35", en: "35" }, { th: "100", en: "100" }, { th: "60", en: "60" }],
            [{ th: "WSF-08", en: "WSF-08" }, { th: "8", en: "8" }, { th: "1.60", en: "1.60" }, { th: "4.50", en: "4.50" }, { th: "1.80", en: "1.80" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "13", en: "13" }, { th: "40", en: "40" }, { th: "115", en: "115" }, { th: "67", en: "67" }],
            [{ th: "WSF-09", en: "WSF-09" }, { th: "9", en: "9" }, { th: "1.60", en: "1.60" }, { th: "5.00", en: "5.00" }, { th: "1.80", en: "1.80" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "15", en: "15" }, { th: "45", en: "45" }, { th: "130", en: "130" }, { th: "75", en: "75" }],
            [{ th: "WSF-10", en: "WSF-10" }, { th: "10", en: "10" }, { th: "2.00", en: "2.00" }, { th: "3.50", en: "3.50" }, { th: "2.20", en: "2.20" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "16", en: "16" }, { th: "50", en: "50" }, { th: "145", en: "145" }, { th: "85", en: "85" }],
            [{ th: "WSF-12", en: "WSF-12" }, { th: "12", en: "12" }, { th: "2.00", en: "2.00" }, { th: "4.20", en: "4.20" }, { th: "2.20", en: "2.20" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "20", en: "20" }, { th: "60", en: "60" }, { th: "175", en: "175" }, { th: "100", en: "100" }],
            [{ th: "WSF-15", en: "WSF-15" }, { th: "15", en: "15" }, { th: "2.00", en: "2.00" }, { th: "5.30", en: "5.30" }, { th: "2.20", en: "2.20" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "25", en: "25" }, { th: "75", en: "75" }, { th: "215", en: "215" }, { th: "125", en: "125" }],
            [{ th: "WSF-20", en: "WSF-20" }, { th: "20", en: "20" }, { th: "2.50", en: "2.50" }, { th: "4.40", en: "4.40" }, { th: "2.70", en: "2.70" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "33", en: "33" }, { th: "100", en: "100" }, { th: "285", en: "285" }, { th: "170", en: "170" }],
            [{ th: "WSF-30", en: "WSF-30" }, { th: "30", en: "30" }, { th: "2.50", en: "2.50" }, { th: "6.50", en: "6.50" }, { th: "2.70", en: "2.70" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "50", en: "50" }, { th: "150", en: "150" }, { th: "430", en: "430" }, { th: "250", en: "250" }],
            [{ th: "WSF-40", en: "WSF-40" }, { th: "40", en: "40" }, { th: "2.50", en: "2.50" }, { th: "8.70", en: "8.70" }, { th: "2.70", en: "2.70" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "67", en: "67" }, { th: "200", en: "200" }, { th: "570", en: "570" }, { th: "335", en: "335" }],
            [{ th: "WSF-45", en: "WSF-45" }, { th: "45", en: "45" }, { th: "2.50", en: "2.50" }, { th: "9.90", en: "9.90" }, { th: "2.70", en: "2.70" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "75", en: "75" }, { th: "225", en: "225" }, { th: "645", en: "645" }, { th: "375", en: "375" }],
            [{ th: "WSF-50", en: "WSF-50" }, { th: "50", en: "50" }, { th: "2.50", en: "2.50" }, { th: "10.80", en: "10.80" }, { th: "2.70", en: "2.70" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "85", en: "85" }, { th: "250", en: "250" }, { th: "715", en: "715" }, { th: "420", en: "420" }],
          ],
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
          src: "/images/products/fiberglass-septic-tank/treatment-systems/2.webp",
          alt: {
            th: "ภาพตัดถังบำบัดน้ำเสียแบบเกรอะ-กรองเติมอากาศ แสดงส่วนเกรอะ (1) ส่วนกรองเติมอากาศ (2) และส่วนตกตะกอน (3)",
            en: "Cutaway of the septic - aerobic filter tank showing the septic chamber (1), the aerated filter chamber (2) and the sedimentation chamber (3)",
          },
          width: 2289,
          height: 1497,
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
          type: "table",
          columns: [
            { th: "รุ่น", en: "Model" },
            { th: "ปริมาณน้ำเสีย (ลบ.ม./วัน)", en: "Wastewater (m3/day)" },
            { th: "กว้าง (m)", en: "Width (m)" },
            { th: "ยาว (m)", en: "Length (m)" },
            { th: "สูง (m)", en: "Height (m)" },
            { th: "ท่อเข้า (mm)", en: "Inlet (mm)" },
            { th: "ท่อออก (mm)", en: "Outlet (mm)" },
            { th: "ปริมาณการจ่ายอากาศ (ลิตร/นาที)", en: "Air supply (L/min)" },
            { th: "ห้องพัก (max)", en: "Rooms (max)" },
            { th: "คน (max)", en: "People (max)" },
            { th: "พนักงาน สนง./รร. (คน)", en: "Staff, office/school" },
            { th: "พนักงาน โรงงาน (คน max)", en: "Staff, factory (max)" },
          ],
          rows: [
            [{ th: "WSFA-04", en: "WSFA-04" }, { th: "4", en: "4" }, { th: "1.60", en: "1.60" }, { th: "2.20", en: "2.20" }, { th: "1.80", en: "1.80" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "80", en: "80" }, { th: "6", en: "6" }, { th: "20", en: "20" }, { th: "60", en: "60" }, { th: "30", en: "30" }],
            [{ th: "WSFA-05", en: "WSFA-05" }, { th: "5", en: "5" }, { th: "1.60", en: "1.60" }, { th: "2.80", en: "2.80" }, { th: "1.80", en: "1.80" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "80", en: "80" }, { th: "8", en: "8" }, { th: "25", en: "25" }, { th: "70", en: "70" }, { th: "40", en: "40" }],
            [{ th: "WSFA-06", en: "WSFA-06" }, { th: "6", en: "6" }, { th: "1.60", en: "1.60" }, { th: "3.40", en: "3.40" }, { th: "1.80", en: "1.80" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "10", en: "10" }, { th: "30", en: "30" }, { th: "85", en: "85" }, { th: "50", en: "50" }],
            [{ th: "WSFA-07", en: "WSFA-07" }, { th: "7", en: "7" }, { th: "1.60", en: "1.60" }, { th: "3.95", en: "3.95" }, { th: "1.80", en: "1.80" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "120", en: "120" }, { th: "12", en: "12" }, { th: "35", en: "35" }, { th: "100", en: "100" }, { th: "60", en: "60" }],
            [{ th: "WSFA-08", en: "WSFA-08" }, { th: "8", en: "8" }, { th: "1.60", en: "1.60" }, { th: "4.50", en: "4.50" }, { th: "1.80", en: "1.80" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "120", en: "120" }, { th: "13", en: "13" }, { th: "40", en: "40" }, { th: "115", en: "115" }, { th: "67", en: "67" }],
            [{ th: "WSFA-09", en: "WSFA-09" }, { th: "9", en: "9" }, { th: "1.60", en: "1.60" }, { th: "5.00", en: "5.00" }, { th: "1.80", en: "1.80" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "150", en: "150" }, { th: "15", en: "15" }, { th: "45", en: "45" }, { th: "130", en: "130" }, { th: "75", en: "75" }],
            [{ th: "WSFA-10", en: "WSFA-10" }, { th: "10", en: "10" }, { th: "2.00", en: "2.00" }, { th: "3.50", en: "3.50" }, { th: "2.20", en: "2.20" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "150", en: "150" }, { th: "16", en: "16" }, { th: "50", en: "50" }, { th: "145", en: "145" }, { th: "85", en: "85" }],
            [{ th: "WSFA-12", en: "WSFA-12" }, { th: "12", en: "12" }, { th: "2.00", en: "2.00" }, { th: "4.20", en: "4.20" }, { th: "2.20", en: "2.20" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "200", en: "200" }, { th: "20", en: "20" }, { th: "60", en: "60" }, { th: "175", en: "175" }, { th: "100", en: "100" }],
            [{ th: "WSFA-15", en: "WSFA-15" }, { th: "15", en: "15" }, { th: "2.00", en: "2.00" }, { th: "5.30", en: "5.30" }, { th: "2.20", en: "2.20" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "240", en: "240" }, { th: "25", en: "25" }, { th: "75", en: "75" }, { th: "215", en: "215" }, { th: "125", en: "125" }],
            [{ th: "WSFA-18", en: "WSFA-18" }, { th: "18", en: "18" }, { th: "2.00", en: "2.00" }, { th: "6.20", en: "6.20" }, { th: "2.20", en: "2.20" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "280", en: "280" }, { th: "30", en: "30" }, { th: "90", en: "90" }, { th: "260", en: "260" }, { th: "150", en: "150" }],
            [{ th: "WSFA-20", en: "WSFA-20" }, { th: "20", en: "20" }, { th: "2.50", en: "2.50" }, { th: "4.40", en: "4.40" }, { th: "2.70", en: "2.70" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "300", en: "300" }, { th: "33", en: "33" }, { th: "100", en: "100" }, { th: "285", en: "285" }, { th: "170", en: "170" }],
            [{ th: "WSFA-25", en: "WSFA-25" }, { th: "25", en: "25" }, { th: "2.50", en: "2.50" }, { th: "5.40", en: "5.40" }, { th: "2.70", en: "2.70" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "400", en: "400" }, { th: "42", en: "42" }, { th: "125", en: "125" }, { th: "360", en: "360" }, { th: "210", en: "210" }],
            [{ th: "WSFA-30", en: "WSFA-30" }, { th: "30", en: "30" }, { th: "2.50", en: "2.50" }, { th: "6.50", en: "6.50" }, { th: "2.70", en: "2.70" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "480", en: "480" }, { th: "50", en: "50" }, { th: "150", en: "150" }, { th: "430", en: "430" }, { th: "250", en: "250" }],
            [{ th: "WSFA-35", en: "WSFA-35" }, { th: "35", en: "35" }, { th: "2.50", en: "2.50" }, { th: "7.50", en: "7.50" }, { th: "2.70", en: "2.70" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "560", en: "560" }, { th: "60", en: "60" }, { th: "175", en: "175" }, { th: "500", en: "500" }, { th: "290", en: "290" }],
            [{ th: "WSFA-40", en: "WSFA-40" }, { th: "40", en: "40" }, { th: "2.50", en: "2.50" }, { th: "8.70", en: "8.70" }, { th: "2.70", en: "2.70" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "640", en: "640" }, { th: "67", en: "67" }, { th: "200", en: "200" }, { th: "570", en: "570" }, { th: "335", en: "335" }],
            [{ th: "WSFA-45", en: "WSFA-45" }, { th: "45", en: "45" }, { th: "2.50", en: "2.50" }, { th: "9.90", en: "9.90" }, { th: "2.70", en: "2.70" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "640", en: "640" }, { th: "75", en: "75" }, { th: "225", en: "225" }, { th: "645", en: "645" }, { th: "375", en: "375" }],
            [{ th: "WSFA-50", en: "WSFA-50" }, { th: "50", en: "50" }, { th: "2.50", en: "2.50" }, { th: "10.80", en: "10.80" }, { th: "2.70", en: "2.70" }, { th: "100", en: "100" }, { th: "100", en: "100" }, { th: "960", en: "960" }, { th: "85", en: "85" }, { th: "250", en: "250" }, { th: "715", en: "715" }, { th: "420", en: "420" }],
          ],
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
          src: "/images/products/fiberglass-septic-tank/treatment-systems/3.webp",
          alt: {
            th: "ภาพตัดถังบำบัดน้ำเสียแบบตะกอนเวียนเติมอากาศ แสดงส่วนเกรอะ (1) ส่วนกรองไร้อากาศ (2) ส่วนกรองเติมอากาศ (3) และส่วนตกตะกอน (4)",
            en: "Cutaway of the activated sludge tank showing the septic chamber (1), the anaerobic chamber (2), the aerated filter chamber (3) and the sedimentation chamber (4)",
          },
          width: 2285,
          height: 1492,
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
          type: "table",
          columns: [
            { th: "รุ่น", en: "Model" },
            { th: "ปริมาณน้ำเสีย (ลบ.ม./วัน)", en: "Wastewater (m3/day)" },
            { th: "กว้าง (m)", en: "Width (m)" },
            { th: "ยาว (m)", en: "Length (m)" },
            { th: "สูง (m)", en: "Height (m)" },
            { th: "จำนวนถัง", en: "Tanks" },
            { th: "ท่อเข้า (mm)", en: "Inlet (mm)" },
            { th: "ท่อออก (mm)", en: "Outlet (mm)" },
            { th: "ท่อเข้า-ออก (m)", en: "Inlet to outlet (m)" },
            { th: "พักอาศัย (max)", en: "Housing (max)" },
            { th: "สำนักงาน (max)", en: "Office (max)" },
            { th: "โรงงาน (max)", en: "Factory (max)" },
            { th: "โรงเรียน (max)", en: "School (max)" },
          ],
          rows: [
            [{ th: "WAS-20", en: "WAS-20" }, { th: "20", en: "20" }, { th: "2.50", en: "2.50" }, { th: "5.00", en: "5.00" }, { th: "2.75", en: "2.75" }, { th: "1", en: "1" }, { th: "150", en: "150" }, { th: "150", en: "150" }, { th: "0.15", en: "0.15" }, { th: "100", en: "100" }, { th: "286", en: "286" }, { th: "400", en: "400" }, { th: "400", en: "400" }],
            [{ th: "WAS-25", en: "WAS-25" }, { th: "25", en: "25" }, { th: "2.50", en: "2.50" }, { th: "6.00", en: "6.00" }, { th: "2.75", en: "2.75" }, { th: "1", en: "1" }, { th: "150", en: "150" }, { th: "150", en: "150" }, { th: "0.15", en: "0.15" }, { th: "125", en: "125" }, { th: "357", en: "357" }, { th: "500", en: "500" }, { th: "500", en: "500" }],
            [{ th: "WAS-30", en: "WAS-30" }, { th: "30", en: "30" }, { th: "2.50", en: "2.50" }, { th: "7.00", en: "7.00" }, { th: "2.75", en: "2.75" }, { th: "1", en: "1" }, { th: "150", en: "150" }, { th: "150", en: "150" }, { th: "0.15", en: "0.15" }, { th: "150", en: "150" }, { th: "429", en: "429" }, { th: "600", en: "600" }, { th: "600", en: "600" }],
            [{ th: "WAS-35", en: "WAS-35" }, { th: "35", en: "35" }, { th: "2.50", en: "2.50" }, { th: "7.50", en: "7.50" }, { th: "2.75", en: "2.75" }, { th: "1", en: "1" }, { th: "150", en: "150" }, { th: "150", en: "150" }, { th: "0.15", en: "0.15" }, { th: "175", en: "175" }, { th: "500", en: "500" }, { th: "700", en: "700" }, { th: "700", en: "700" }],
            [{ th: "WAS-40", en: "WAS-40" }, { th: "40", en: "40" }, { th: "2.50", en: "2.50" }, { th: "8.50", en: "8.50" }, { th: "2.75", en: "2.75" }, { th: "1", en: "1" }, { th: "150", en: "150" }, { th: "150", en: "150" }, { th: "0.15", en: "0.15" }, { th: "200", en: "200" }, { th: "571", en: "571" }, { th: "800", en: "800" }, { th: "800", en: "800" }],
            [{ th: "WAS-50", en: "WAS-50" }, { th: "50", en: "50" }, { th: "2.50", en: "2.50" }, { th: "10.50", en: "10.50" }, { th: "2.75", en: "2.75" }, { th: "1", en: "1" }, { th: "150", en: "150" }, { th: "150", en: "150" }, { th: "0.15", en: "0.15" }, { th: "250", en: "250" }, { th: "714", en: "714" }, { th: "1000", en: "1000" }, { th: "1000", en: "1000" }],
            [{ th: "WAS-60", en: "WAS-60" }, { th: "60", en: "60" }, { th: "2.50", en: "2.50" }, { th: "6.50", en: "6.50" }, { th: "2.75", en: "2.75" }, { th: "2", en: "2" }, { th: "150", en: "150" }, { th: "150", en: "150" }, { th: "0.15", en: "0.15" }, { th: "300", en: "300" }, { th: "857", en: "857" }, { th: "1200", en: "1200" }, { th: "1200", en: "1200" }],
            [{ th: "WAS-70", en: "WAS-70" }, { th: "70", en: "70" }, { th: "2.50", en: "2.50" }, { th: "7.50", en: "7.50" }, { th: "2.75", en: "2.75" }, { th: "2", en: "2" }, { th: "150", en: "150" }, { th: "150", en: "150" }, { th: "0.15", en: "0.15" }, { th: "350", en: "350" }, { th: "1000", en: "1000" }, { th: "1400", en: "1400" }, { th: "1400", en: "1400" }],
            [{ th: "WAS-80", en: "WAS-80" }, { th: "80", en: "80" }, { th: "2.50", en: "2.50" }, { th: "9.00", en: "9.00" }, { th: "2.75", en: "2.75" }, { th: "2", en: "2" }, { th: "150", en: "150" }, { th: "150", en: "150" }, { th: "0.15", en: "0.15" }, { th: "400", en: "400" }, { th: "1143", en: "1143" }, { th: "1600", en: "1600" }, { th: "1600", en: "1600" }],
            [{ th: "WAS-90", en: "WAS-90" }, { th: "90", en: "90" }, { th: "2.50", en: "2.50" }, { th: "10.00", en: "10.00" }, { th: "2.75", en: "2.75" }, { th: "2", en: "2" }, { th: "150", en: "150" }, { th: "150", en: "150" }, { th: "0.15", en: "0.15" }, { th: "450", en: "450" }, { th: "1286", en: "1286" }, { th: "1800", en: "1800" }, { th: "1800", en: "1800" }],
            [{ th: "WAS-100", en: "WAS-100" }, { th: "100", en: "100" }, { th: "2.50", en: "2.50" }, { th: "10.50", en: "10.50" }, { th: "2.75", en: "2.75" }, { th: "2", en: "2" }, { th: "150", en: "150" }, { th: "150", en: "150" }, { th: "0.15", en: "0.15" }, { th: "500", en: "500" }, { th: "1429", en: "1429" }, { th: "2000", en: "2000" }, { th: "2000", en: "2000" }],
          ],
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
  "water-treatment-system": [
    {
      type: "content",
      // `id` matches the `sectionId` of the first entry in this product's
      // `sectionLinks` (src/lib/products.ts) - see the ProductSectionLink
      // note in src/lib/product-sections.ts.
      id: "water-filter-system",
      title: {
        th: "ระบบกรองน้ำ",
        en: "Water Filter System",
      },
      blocks: [
        {
          type: "paragraph",
          body: {
            th: "ระบบกรองน้ำคือกระบวนการที่ใช้ในการกำจัดสิ่งเจือปนต่างๆ ออกจากน้ำเพื่อปรับปรุงคุณภาพของน้ำให้อยู่ในระดับที่เหมาะสมสำหรับการบริโภคหรือการใช้งานในด้านอื่นๆ การกรองน้ำสามารถใช้วิธีการที่หลากหลาย ส่วนประกอบหลักมีดังนี้:",
            en: "A water filter system is the process used to remove various impurities from water, improving its quality to a level suitable for consumption or other uses. Water filtration can use a variety of methods. Its main components are as follows:",
          },
        },
        {
          type: "list",
          ordered: false,
          items: [
            {
              text: {
                th: "ตัวกรองหยาบ (Pre-filter): ใช้สำหรับกำจัดสิ่งสกปรกขนาดใหญ่ เช่น ทรายและตะกอน เพื่อป้องกันไม่ให้ตัวกรองหลักอุดตันเร็วเกินไป",
                en: "Pre-filter: removes large debris such as sand and sediment, so the main filter does not clog too quickly.",
              },
            },
            {
              text: {
                th: "ตัวกรองคาร์บอน (Carbon Filter): ช่วยกำจัดสารเคมี, คลอรีน, และสารอินทรีย์ที่ทำให้น้ำมีกลิ่นและรสไม่พึงประสงค์",
                en: "Carbon filter: removes chemicals, chlorine, and organic substances that give water an unpleasant smell and taste.",
              },
            },
          ],
        },
        {
          type: "image",
          src: "/images/products/water-treatment-system/6.webp",
          alt: {
            th: "ถังกรองน้ำไฟเบอร์กลาสในระบบกรองน้ำ",
            en: "Fiberglass water filter tanks in the water filter system",
          },
          width: 1478,
          height: 1108,
        },
      ],
    },
    {
      type: "content",
      // Matches the second `sectionLinks` entry on this product - see the
      // note on the previous section above.
      id: "softener-system",
      title: {
        th: "ระบบ Softener หรือระบบทำน้ำอ่อน",
        en: "Softener System (Water Softener)",
      },
      blocks: [
        {
          type: "paragraph",
          body: {
            th: "เป็นระบบที่ใช้ในการกำจัดความกระด้างของน้ำ ซึ่งมักเกิดจากแร่ธาตุเช่น แคลเซียม (Ca) และแมกนีเซียม (Mg) ที่ละลายในน้ำ โดยระบบนี้จะใช้หลักการแลกเปลี่ยนไอออน โดยให้แร่ธาตุที่ทำให้น้ำกระด้างจับกับเรซินในระบบและปลดปล่อยโซเดียม (Na) ออกมาแทน ทำให้น้ำมีความกระด้างลดลง ส่วนประกอบหลักมีดังนี้:",
            en: "A system used to remove water hardness, which is usually caused by minerals such as calcium (Ca) and magnesium (Mg) dissolved in the water. It works on the principle of ion exchange: the minerals that make the water hard bind to the resin in the system, which releases sodium (Na) in their place, reducing the water's hardness. Its main components are as follows:",
          },
        },
        {
          type: "list",
          ordered: false,
          items: [
            {
              text: {
                th: "ถังเก็บเรซิน (Resin Tank): บรรจุเรซินชนิดที่สามารถแลกเปลี่ยนไอออน ซึ่งจะจับกับแร่ธาตุที่ทำให้น้ำกระด้าง เช่น แคลเซียมและแมกนีเซียม",
                en: "Resin Tank: holds ion-exchange resin that binds to the minerals that make water hard, such as calcium and magnesium.",
              },
            },
            {
              text: {
                th: "ถังเกลือ (Brine Tank): ใช้เก็บเกลือที่ใช้ในการฟื้นฟูประจุของเรซิน เพื่อให้เรซินสามารถแลกเปลี่ยนไอออนกับน้ำได้อย่างต่อเนื่อง",
                en: "Brine Tank: stores the salt used to regenerate the resin's charge, so it can keep exchanging ions with the water continuously.",
              },
            },
            {
              text: {
                th: "หัวควบคุม (Control Valve): ควบคุมการไหลของน้ำและการทำงานของระบบ เช่น การล้างกลับเรซินและการเติมเกลือ",
                en: "Control Valve: controls the water flow and the system's operation, such as backwashing the resin and adding salt.",
              },
            },
            {
              text: {
                th: "ปั๊มน้ำ (Water Pump): ช่วยให้การไหลของน้ำผ่านระบบเป็นไปอย่างต่อเนื่อง",
                en: "Water Pump: keeps the water flowing through the system continuously.",
              },
            },
          ],
        },
        {
          type: "image",
          src: "/images/products/water-treatment-system/treatment-systems/1.webp",
          alt: {
            th: "ปั๊มน้ำและตู้ควบคุมของระบบทำน้ำอ่อน",
            en: "Water pumps and the control panel of the softener system",
          },
          width: 1000,
          height: 517,
        },
      ],
    },
    {
      type: "content",
      // Matches the third `sectionLinks` entry on this product - see the
      // note on the first section above.
      id: "reverse-osmosis-system",
      title: {
        th: "ระบบรีเวิร์สออสโมซิส (Reverse Osmosis)",
        en: "Reverse Osmosis (RO) System",
      },
      blocks: [
        {
          type: "paragraph",
          body: {
            th: "คือระบบกรองน้ำที่ใช้เมมเบรนในการแยกสารละลายและสิ่งเจือปนออกจากน้ำ โดยใช้น้ำแรงดันสูงเพื่อผลักดันน้ำผ่านเมมเบรนที่มีรูเล็กมาก จึงสามารถกรองได้ทั้งสารเคมี, แบคทีเรีย, และโลหะหนัก ทำให้น้ำมีความบริสุทธิ์สูง",
            en: "A water filtration system that uses a membrane to separate dissolved solids and impurities from the water. High-pressure water is forced through a membrane with extremely fine pores, so it can filter out chemicals, bacteria and heavy metals, giving very pure water.",
          },
        },
        {
          type: "list",
          ordered: false,
          items: [
            {
              text: {
                th: "ปั๊มน้ำแรงดันสูง: เพื่อผลักดันน้ำผ่านเมมเบรน",
                en: "High-Pressure Water Pump: pushes the water through the membrane.",
              },
            },
            {
              text: {
                th: "เมมเบรน RO (RO Membrane): ฟิลเตอร์หลักที่กรองสิ่งเจือปน",
                en: "RO Membrane: the main filter that filters out impurities.",
              },
            },
          ],
        },
        {
          type: "image",
          src: "/images/products/water-treatment-system/5.webp",
          alt: {
            th: "วิศวกรตรวจสอบอุปกรณ์ในระบบบำบัดน้ำ",
            en: "An engineer inspecting equipment in the water treatment system",
          },
          width: 1000,
          height: 667,
        },
      ],
    },
    {
      type: "content",
      // Matches the fourth (and last) `sectionLinks` entry on this product -
      // see the note on the first section above.
      id: "uv-system",
      title: {
        th: "ระบบการใช้รังสี UV",
        en: "UV System",
      },
      blocks: [
        {
          type: "paragraph",
          body: {
            th: "คือระบบบำบัดน้ำที่ใช้แสงอัลตราไวโอเลต (UV) เพื่อฆ่าเชื้อโรค, แบคทีเรีย, ไวรัส, และจุลินทรีย์ที่อาจเป็นอันตรายในน้ำ แสง UV สามารถทำลาย DNA ของจุลชีพเหล่านี้ ทำให้พวกมันไม่สามารถแพร่พันธุ์หรือก่อให้เกิดโรคได้",
            en: "A water treatment system that uses ultraviolet (UV) light to kill pathogens, bacteria, viruses and microorganisms that may be harmful in the water. UV light destroys the DNA of these microorganisms, so they can no longer reproduce or cause disease.",
          },
        },
        {
          type: "paragraph",
          body: {
            th: "ส่วนประกอบของระบบการใช้รังสี UV ประกอบด้วย:",
            en: "The components of a UV system include:",
          },
        },
        {
          type: "list",
          ordered: false,
          items: [
            {
              text: {
                th: "หลอด UV (UV Lamp): แหล่งกำเนิดรังสี UV สำหรับการฆ่าเชื้อ",
                en: "UV Lamp: the source of UV radiation used for disinfection.",
              },
            },
            {
              text: {
                th: "ท่อควอตซ์ (Quartz Sleeve): ป้องกันหลอด UV จากน้ำและสิ่งปนเปื้อน",
                en: "Quartz Sleeve: protects the UV lamp from the water and contaminants.",
              },
            },
          ],
        },
        {
          type: "image",
          src: "/images/products/water-treatment-system/1.webp",
          alt: {
            th: "ภาพมุมสูงของโรงบำบัดน้ำ",
            en: "Aerial view of a water treatment plant",
          },
          width: 1500,
          height: 841,
        },
      ],
    },
    waterAndWastewaterMaintenanceSection,
  ],
  "wastewater-treatment-system": [
    {
      type: "content",
      id: "wastewater-treatment-overview",
      title: {
        th: "ประเภทของระบบบำบัดน้ำเสีย",
        en: "Types of Wastewater Treatment Systems",
      },
      blocks: [
        {
          type: "paragraph",
          body: {
            th: "ประเภทของระบบบำบัดน้ำเสีย ได้แก่:",
            en: "Types of wastewater treatment systems include:",
          },
        },
        {
          type: "list",
          ordered: false,
          items: [
            {
              text: {
                th: "ระบบบำบัดทางกายภาพ: เช่น การกรองและการตกตะกอน",
                en: "Physical Treatment: for example filtration and sedimentation.",
              },
            },
            {
              text: {
                th: "ระบบบำบัดทางชีวภาพ: เช่น การใช้ออกซิเจนในกระบวนการย่อยสลายสารอินทรีย์โดยจุลินทรีย์",
                en: "Biological Treatment: for example using oxygen in the process by which microorganisms break down organic matter.",
              },
            },
            {
              text: {
                th: "ระบบบำบัดทางเคมี: เช่น การเติมสารเคมีเพื่อปรับค่า pH หรือกำจัดสาร",
                en: "Chemical Treatment: for example adding chemicals to adjust the pH or remove substances.",
              },
            },
          ],
        },
      ],
    },
    waterAndWastewaterMaintenanceSection,
  ],
};

/** The sections for a product, in render order. Empty when it has none. */
export function getProductSections(productId: string): ProductSection[] {
  return productSections[productId] ?? [];
}
