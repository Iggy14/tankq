import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
};

// Points next-intl at src/i18n/request.ts (its default location) and wires the
// `next-intl/config` alias into the bundler.
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
