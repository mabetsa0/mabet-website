import { routing } from "@/lib/i18n/routing"
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { notFound } from "next/navigation"
import "../globals.css"
import MyMantineProvider from "../mantine-provider"
import Navbar from "./components/layout"
import { setRequestLocale } from "next-intl/server"

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
    <html lang={locale} dir={locale == "ar" ? "rtl" : "ltr"} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MyMantineProvider>
          <Navbar>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </Navbar>
        </MyMantineProvider>
      </body>
    </html>
  )
}
