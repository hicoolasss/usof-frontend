/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: "http://localhost:1000",
    },
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '1000',
            pathname: '/uploads/**',
          },
        ],
      },
}

module.exports = nextConfig
