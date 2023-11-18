/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_URL: "http://localhost:1000",
  },
  images: {
    domains: ['localhost'], // или другой домен, откуда загружаются изображения
  },
}

module.exports = nextConfig
