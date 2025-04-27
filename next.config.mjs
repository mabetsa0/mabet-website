import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts")
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
      "lucide-react",
    ],
  },
})

export default nextConfig
