/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },

  experimental: {
    appDir: true, // ✅ ให้รู้ว่าใช้ App Router
  },
};

export default nextConfig;
