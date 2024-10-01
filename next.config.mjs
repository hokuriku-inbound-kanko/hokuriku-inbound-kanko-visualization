/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.PAGES ? "/hokuriku-inbound-kanko-visualization" : "",
};

export default nextConfig;
