import { routing } from "@/lib/i18n/routing"
import { hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import Hero from "./components/hero"
import UnitTypes from "./components/unit-types"
import SpecialUnits from "./components/special-units"
import { getSpecialUnits } from "./helpers/get-special-units"
import { getTopRatedUnits } from "./helpers/get-top-rated-units"
import NewUnits from "./components/new-units"
import AddYourUnit from "./components/add-your-unit"
import TopRatedUnits from "./components/top-rated-units"
import DownLoadApp from "./components/download-app"
import Blogs from "./components/blogs"
import Footer from "@/components/common/footer"
import WhyMabet from "./components/why-mabet"

export const revalidate = 3600
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
      <Footer />
    </>
  )
}
