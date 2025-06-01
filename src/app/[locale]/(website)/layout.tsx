import { routing } from "@/lib/i18n/routing"
import { SEO } from "@/services/get-seo"
import { Metadata } from "next"
import { hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import Navbar from "./components/navbar"
import dynamic from "next/dynamic"
const AuthModal = dynamic(
  () => import("@/components/common/auth/auth-modal"),
  {}
)
const Nafath = dynamic(() => import("@/components/common/auth/nafath"), {})
export async function generateMetadata(): Promise<Metadata> {
  return await SEO("/home")
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
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
      <Navbar>{children}</Navbar>
      <AuthModal />
      <Nafath />
    </>
  )
}
