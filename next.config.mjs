/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
