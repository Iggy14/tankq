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

// Pictures uploaded in the CMS are served from the WordPress host, which
// `next/image` only optimizes if it is allow-listed. Unset `WP_API_URL` means no
// CMS and no extra host.
const wpUrl = process.env.WP_API_URL ? new URL(process.env.WP_API_URL) : null;

// A WordPress running on this machine (LocalWP's `*.local` hosts, localhost)
// resolves to a private address, which Next refuses to optimize unless told to.
// Never true for the production host.
const wpIsLocal =
  wpUrl !== null && /(^|\.)local$|^localhost$|^127\./.test(wpUrl.hostname);

const nextConfig: NextConfig = {
  // Lets the dev server accept requests (including HMR's websocket) from the
  // LAN IP, not just localhost — Next blocks other origins by default so
  // dev-only assets can't be requested cross-origin.
  allowedDevOrigins: ["192.168.1.229"],

  images: {
    remotePatterns: wpUrl
      ? [
          {
            protocol: wpUrl.protocol === "https:" ? "https" : "http",
            hostname: wpUrl.hostname,
            port: wpUrl.port,
            pathname: "/wp-content/uploads/**",
          },
        ]
      : [],
    dangerouslyAllowLocalIP: wpIsLocal,
  },

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
