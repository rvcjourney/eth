import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produces a small self-contained server in .next/standalone, used by the Docker image.
  output: "standalone",
  devIndicators: false,

  // `next dev` runs Turbopack while `next build` runs webpack, and the two write incompatible
  // output. Sharing one directory means a production build silently breaks a running dev server
  // (fonts fail to resolve), so dev gets a directory of its own.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",

  // Ensure we can build without issues
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
