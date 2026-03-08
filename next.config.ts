import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90, 92],
  },
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/favicon.png" }];
  },
};
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
