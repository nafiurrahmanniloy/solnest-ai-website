/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["lenis"],
  async redirects() {
    return [
      // /book is the canonical booking route (spec v2.1 dev fix #2)
      { source: "/apply", destination: "/book", permanent: true },
    ];
  },
  webpack: (config) => {
    config.resolve.conditionNames = ["import", "module", "require", "default"];
    return config;
  },
};

module.exports = nextConfig;
