import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Increase Server Actions body size limit
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", // you can use "10mb" if needed
    },
  },

  // ✅ Cloudinary images support
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
