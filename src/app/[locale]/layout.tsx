import { Suspense } from "react"
import { NextIntlClientProvider } from "next-intl"
import { IBM_Plex_Sans_Arabic } from "next/font/google"
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core"
import { TestTube2 } from "lucide-react"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import GlobalDataContextProvider from "@/context/global-data-context"
import MyReactQueryProvider from "@/lib/react-query"
import "../globals.css"
import MyMantineProvider from "../mantine-provider"
import { InitSession } from "./components/init-session"
import Scripts from "./components/scripts"

const arFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font",
  display: "swap",
  preload: true,
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

  return (
    <html
      lang={locale}
      dir={locale == "ar" ? "rtl" : "ltr"}
      {...mantineHtmlProps}
    >
      <head>
        {/* Preconnect hints for external origins to reduce connection time */}
        <link rel="preconnect" href="https://app.mabet.com.sa" />
        <link rel="dns-prefetch" href="https://app.mabet.com.sa" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://static.hotjar.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <ColorSchemeScript />
        <Scripts />
      </head>
      <body className={`${arFont.className} ${arFont.variable}`}>
        <MyReactQueryProvider>
          <GlobalDataContextProvider>
            <NuqsAdapter>
              <MyMantineProvider locale={locale}>
                <NextIntlClientProvider>
                  {children}
                  {process.env.NEXT_PUBLIC_TEST == "true" && (
                    <div className="fixed right-1 bottom-4 z-10 rounded-full bg-gray-200 p-0.5">
                      <TestTube2 className="text-primary" />
                    </div>
                  )}
                  <Suspense>
                    <InitSession />
                  </Suspense>
                </NextIntlClientProvider>
              </MyMantineProvider>
            </NuqsAdapter>
          </GlobalDataContextProvider>
        </MyReactQueryProvider>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NZRRZ8G7"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      </body>
    </html>
  )
}
