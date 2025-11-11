import createNextIntlPlugin from "next-intl/plugin"
import bundleAnalyzer from "@next/bundle-analyzer"

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts")

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})
/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer(
  withNextIntl({
    async rewrites() {
      return [
        {
          source: "/api/v1/:path*",
          destination: "https://app.mabet.com.sa/api/v1/:path*", // Matched parameters can be used in the destination
        },
        {
          source: "/api/v2/:path*",
          destination: "https://app.mabet.com.sa/api/v2/:path*", // Matched parameters can be used in the destination
        },
        {
          source: "/download",
          destination: "https://app.mabet.com.sa/download", // Matched parameters can be used in the destination
        },
        {
          source: "/sitemap.xml",
          destination: "https://app.mabet.com.sa/sitemap.xml", // Matched parameters can be used in the destination
        },
        {
          source: "/robots.txt",
          destination: "https://app.mabet.com.sa/robots.txt", // Matched parameters can be used in the destination
        },
        {
          source: "/sitemap/:path*",
          destination: "https://app.mabet.com.sa/sitemap/:path*",
        },
        {
          source: "/en/sitemap/:path*",
          destination: "https://app.mabet.com.sa/en/sitemap/:path*",
        },
        {
          source: "/en/gathern",
          destination: "/en/units",
        },
        {
          source: "/ar/gathern",
          destination: "/ar/units",
        },
        {
          source: "/gathern",
          destination: "/ar/units",
        },
      ]
    },
    async redirects() {
      return [
        {
          source: "/unit",
          destination: "/ar/units/:unitID",
          permanent: true,
          has: [
            {
              type: "query",
              key: "id",
              value: "(?<unitID>.*)",
            },
          ],
        },
        // {
        //   source: "/gathern",
        //   destination: "/ar",
        //   permanent: true,
        // },
      ]
    },
    experimental: {
      webpackMemoryOptimizations: true,
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

      staleTimes: {
        dynamic: 30,
        static: 180,
      },
    },
  })
)

export default nextConfig
