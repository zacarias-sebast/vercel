import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lwxlfdiczzqrkbrtgdld.supabase.co',
      },
    ],
  },
};

export default nextConfig;

