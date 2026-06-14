const isDev = process.env.NODE_ENV === "development";
const nextConfig = {
  env: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  },
  ...(isDev
    ? {
        experimental: {
          allowDevelopmentBuild: true,
        },
      }
    : {}),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.goroqit.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};
export default nextConfig;
