import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Lets the dev server accept requests (including HMR's websocket) from the
  // LAN IP, not just localhost — Next blocks other origins by default so
  // dev-only assets can't be requested cross-origin.
  allowedDevOrigins: ["192.168.1.229"],
};

// Points next-intl at src/i18n/request.ts (its default location) and wires the
// `next-intl/config` alias into the bundler.
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
