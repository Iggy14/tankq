import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Product pages that were merged into a combined page. Each old slug goes to the
// new page, landing on the section that variant now owns (the section's `id` is
// the old slug, see `subProduct` in src/lib/product-section-data.ts).
const mergedProducts = {
  "frp-vertical-water-tank": "frp-water-tank",
  "frp-horizontal-water-tank": "frp-water-tank",
  "pe-above-ground-water-tank": "pe-water-tank",
  "pe-above-ground-water-tank-granite": "pe-water-tank",
  "pe-underground-water-tank": "pe-water-tank",
  "pe-waste-water-treatment-tank": "pe-septic-tank-grease-trap",
  "septic-tank-and-grease-trap": "pe-septic-tank-grease-trap",
  "water-treatment-system": "water-wastewater-treatment-system",
  "wastewater-treatment-system": "water-wastewater-treatment-system",
};

const nextConfig: NextConfig = {
  // Lets the dev server accept requests (including HMR's websocket) from the
  // LAN IP, not just localhost — Next blocks other origins by default so
  // dev-only assets can't be requested cross-origin.
  allowedDevOrigins: ["192.168.1.229"],

  // Runs before the locale proxy, so both /products/<old> and
  // /th/products/<old> are covered; the unprefixed form then picks up its
  // locale as usual.
  async redirects() {
    return Object.entries(mergedProducts).flatMap(([oldSlug, newSlug]) => {
      const destination = `/products/${newSlug}#product-section-${oldSlug}`;
      return [
        {
          source: `/:locale(th|en)/products/${oldSlug}`,
          destination: `/:locale${destination}`,
          permanent: true,
        },
        {
          source: `/products/${oldSlug}`,
          destination,
          permanent: true,
        },
      ];
    });
  },
};

// Points next-intl at src/i18n/request.ts (its default location) and wires the
// `next-intl/config` alias into the bundler.
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
