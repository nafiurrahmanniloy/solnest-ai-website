/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["lenis"],
  webpack: (config) => {
    config.resolve.conditionNames = ["import", "module", "require", "default"];
    return config;
  },
};

module.exports = nextConfig;
