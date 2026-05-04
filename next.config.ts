import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // IMPORTANTE: Agrega estas variantes exactas
  allowedDevOrigins: [
    'localhost:3000', 
    '127.0.0.1:3000',
    'localhost',
    '127.0.0.1'
  ],

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '4000',
        pathname: '/employees/photos/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/employees/photos/**',
      },
    ],
  },
};

export default nextConfig;