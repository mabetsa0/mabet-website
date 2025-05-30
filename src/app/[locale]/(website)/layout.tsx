import Footer from "@/components/common/footer"
import { routing } from "@/lib/i18n/routing"
import { hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import Navbar from "./components/navbar"
import { Metadata } from "next"
import { SEO } from "@/services/get-seo"
import AuthModal from "@/components/common/auth/auth-modal"
import { getServerSession } from "@/lib/get-server-session"
import { Title } from "@mantine/core"
import { cookies } from "next/headers"

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
      <Navbar>
        {children}
        <Footer />
      </Navbar>
      <AuthModal />
    </>
  )
}
