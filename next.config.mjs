const createNextIntlPlugin = require("next-intl/plugin")

const withNextIntl = createNextIntlPlugin()
/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  experimental: {
    optimizePackageImports: [
      "@mantine/core",
      "@mantine/hooks",
      "@mantine/dates",
      "@mantine/form",
      "@mantine/modals",
      "@mantine/notifications",
      "@mantine/carousel",
    ],
  },
})

export default nextConfig
