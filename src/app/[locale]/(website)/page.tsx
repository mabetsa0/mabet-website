import { routing } from "@/lib/i18n/routing"
import { SEO } from "@/services/get-seo"
import { Metadata } from "next"
import { hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import AddYourUnit from "./components/add-your-unit"
import Blogs from "./components/blogs"
import DownLoadApp from "./components/download-app"
import Hero from "./components/hero"
import NewUnits from "./components/new-units"
import SpecialUnits from "./components/special-units"
import TopRatedUnits from "./components/top-rated-units"
import UnitTypes from "./components/unit-types"
import WhyMabet from "./components/why-mabet"
import { getSpecialUnits } from "./helpers/get-special-units"
import { getTopRatedUnits } from "./helpers/get-top-rated-units"

export const revalidate = 3600
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

  const [specialUnits, topRatedUnits] = await Promise.all([
    getSpecialUnits(),
    getTopRatedUnits(),
  ])

  return (
    <>
      <Hero />
      <UnitTypes />
      <SpecialUnits data={specialUnits} />
      <NewUnits data={topRatedUnits} />
      <WhyMabet />
      <AddYourUnit />
      <TopRatedUnits />
      <DownLoadApp />
      <Blogs />
    </>
  )
}
