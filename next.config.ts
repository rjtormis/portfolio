import type { NextConfig } from "next";
const { version } = require("./package.json");

const nextConfig: NextConfig = {
  env: {
    version,
  },
  images: { remotePatterns: [{ hostname: "*" }] },
  /* config options here */
};

export default nextConfig;
