import type { NextConfig } from "next";
const { version } = require("./package.json");

// const nextConfig: NextConfig = {
//   env: {
//     version,
//   },
//   images: { remotePatterns: [{ hostname: "*" },] },
//   /* config options here */
// };

const nextConfig: NextConfig = {
  env: {
    version,
  },
  reactStrictMode: true,
  images: {
    domains: [
      "i.imgur.com",
      "imgur.com",
      "photos.marinetraffic.com",
      "images2.imgbox.com",
      "farm5.staticflickr.com",
      "portfolio-nextjs-aws.s3.ap-southeast-1.amazonaws.com",
    ],
    remotePatterns: [
      { protocol: "https", hostname: "portfolio-nextjs-aws.s3.ap-southeast-1.amazonaws.com" },
    ],
  },
};

export default nextConfig;
