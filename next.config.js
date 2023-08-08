/** @type {import('next').NextConfig} */

import "@shopify/shopify-api/adapters/node";
import setupCheck from "./utils/setupCheck.js";

setupCheck();

console.log(`--> Running in ${process.env.NODE_ENV} mode`);

const nextConfig = {
  reactStrictMode: false,
  env: {
    CONFIG_SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
    CONFIG_SHOPIFY_APP_URL: process.env.SHOPIFY_APP_URL,
  },
};

export default nextConfig;
