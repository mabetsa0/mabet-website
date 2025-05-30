import GlobalDataContextProvider from "@/context/global-data-context"
import { getServerSession } from "@/lib/get-server-session"
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
import { SessionProvider } from "../session-provider"
import Scripts from "./components/scripts"
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
  const session = await getServerSession()

  return (
    <html
      lang={locale}
      dir={locale == "ar" ? "rtl" : "ltr"}
      {...mantineHtmlProps}
    >
      <head>
        <ColorSchemeScript />
        <Scripts />
      </head>
      <body className={`${arFont.className} ${arFont.variable}`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KNRTR8HX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <GlobalDataContextProvider cities={cities} unitTypes={unitTypes}>
          <MyReactQueryProvider>
            <NuqsAdapter>
              <MyMantineProvider locale={locale}>
                <NextIntlClientProvider>
                  <SessionProvider session={session}>
                    {children}
                  </SessionProvider>
                </NextIntlClientProvider>
              </MyMantineProvider>
            </NuqsAdapter>
          </MyReactQueryProvider>
        </GlobalDataContextProvider>
      </body>
    </html>
  )
}
