import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    deviceSizes: [360, 390, 430, 640, 750, 828, 1080, 1280, 1440, 1920, 2560],
    imageSizes: [32, 48, 64, 96, 128, 256, 320, 384],
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90, 92],
  },
};

export default nextConfig;
