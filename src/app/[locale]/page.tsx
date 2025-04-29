import { routing } from "@/lib/i18n/routing"
import { hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import Hero from "./components/hero"

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

  // const [specialUnits, topRatedUnits] = await Promise.all([
  //   getSpecialUnits(),
  //   getTopRatedUnits(),
  // ])

  return (
    <>
      <Hero />
    </>
  )
}
