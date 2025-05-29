import { Cairo } from "next/font/google"

import Footer from "@/components/blog/footer"

import { getSEO } from "@/api/services/get-seo"

export const dynamic = "force-dynamic"

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["700", "600", "500", "400", "300"],
})

export const generateMetadata = async () => {
  return await getSEO("ar", "/blog")
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main
      dir="rtl"
      lang="ar"
      className={cairo.className}
      style={{ background: "#ffffff" }}
    >
      {" "}
      {children}
      <Footer />
    </main>
  )
}
