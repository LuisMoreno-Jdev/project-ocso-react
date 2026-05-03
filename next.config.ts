import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // allowedDevOrigins es para seguridad de cabeceras, no para imágenes
  allowedDevOrigins: ['127.0.0.1:3000', 'localhost:3000'],

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '4000', // El puerto de tu backend NestJS
        pathname: '/employees/photos/**', // La ruta que configuramos en el backend
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