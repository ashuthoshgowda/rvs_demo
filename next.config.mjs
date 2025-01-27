/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    API_SECRET_KEY: process.env.API_SECRET_KEY,
  },
};

export default nextConfig;
