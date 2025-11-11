import Footer from "@/components/common/footer"
import { routing } from "@/lib/i18n/routing"
import { SEO } from "@/services/get-seo"
import { Loader } from "@mantine/core"
import { Metadata } from "next"
import { hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import AddYourUnit from "./components/add-your-unit"
import DownLoadApp from "./components/download-app"
import Hero from "./components/hero"
import NewUnits from "./components/new-units"
import SpecialUnits from "./components/special-units"
import TopRatedUnits from "./components/top-rated-units"
import UnitTypes from "./components/unit-types"
import WhyMabet from "./components/why-mabet"
import dynamic from "next/dynamic"
import DebugClient from "@/components/common/debug-component"
const Blogs = dynamic(async () => import("./components/blogs"))

export async function generateMetadata(): Promise<Metadata> {
  return await SEO("/home")
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // for static rendering
  setRequestLocale(locale)

  return (
    <>
      <DebugClient label="Page" />

      <Hero />
      <Suspense
        fallback={
          <div className="min-h-svh flex items-center justify-center">
            <Loader />
          </div>
        }
      >
        <UnitTypes />
      </Suspense>
      <Suspense
        fallback={
          <div className="min-h-svh flex items-center justify-center">
            <Loader />
          </div>
        }
      >
        <SpecialUnits />
      </Suspense>
      <Suspense
        fallback={
          <div className="min-h-svh flex items-center justify-center">
            <Loader />
          </div>
        }
      >
        <NewUnits />
      </Suspense>

      <WhyMabet />
      <AddYourUnit />
      <Suspense
        fallback={
          <div className="min-h-svh flex items-center justify-center">
            <Loader />
          </div>
        }
      >
        <TopRatedUnits />
      </Suspense>
      <DownLoadApp />
      <Blogs />
      <Footer />
    </>
  )
}
