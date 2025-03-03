import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
}

export default nextConfig
