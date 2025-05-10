import AuthModal from "@/components/common/auth/auth-modal"
import GlobalDataContextProvider from "@/context/global-date-context"
import { routing } from "@/lib/i18n/routing"
import MyReactQueryProvider from "@/lib/react-query"
import { getCities, getUnitTypes } from "@/services/lists"
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { IBM_Plex_Sans_Arabic } from "next/font/google"
import { notFound } from "next/navigation"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import "../globals.css"
import MyMantineProvider from "../mantine-provider"
import Navbar from "./components/navbar"
import Footer from "@/components/common/footer"

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

  const [unitTypes, cities] = await Promise.all([getUnitTypes(), getCities()])
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
        <GlobalDataContextProvider cities={cities} unitTypes={unitTypes}>
          <MyReactQueryProvider>
            <NuqsAdapter>
              <MyMantineProvider locale={locale}>
                <NextIntlClientProvider>
                  <Navbar>
                    {children}

                    <Footer />
                  </Navbar>
                  <AuthModal />
                </NextIntlClientProvider>
              </MyMantineProvider>
            </NuqsAdapter>
          </MyReactQueryProvider>
        </GlobalDataContextProvider>
      </body>
    </html>
  )
}
