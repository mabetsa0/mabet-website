import { routing } from "@/lib/i18n/routing"
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { notFound } from "next/navigation"
import "../globals.css"
import MyMantineProvider from "../mantine-provider"
import Navbar from "./components/navbar"
import { setRequestLocale } from "next-intl/server"
import { IBM_Plex_Sans_Arabic } from "next/font/google"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import MyReactQueryProvider from "@/lib/react-query"

const arFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font",
})

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
    <html
      lang={locale}
      dir={locale == "ar" ? "rtl" : "ltr"}
      {...mantineHtmlProps}
    >
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${arFont.className} ${arFont.variable}`}>
        <MyReactQueryProvider>
          <NuqsAdapter>
            <MyMantineProvider locale={locale}>
              <NextIntlClientProvider>
                <Navbar>{children}</Navbar>
              </NextIntlClientProvider>
            </MyMantineProvider>
          </NuqsAdapter>
        </MyReactQueryProvider>
      </body>
    </html>
  )
}
