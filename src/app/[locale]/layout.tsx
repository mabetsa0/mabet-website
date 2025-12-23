import { hasLocale, NextIntlClientProvider } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { IBM_Plex_Sans_Arabic } from "next/font/google"
import { notFound } from "next/navigation"
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core"
import { TestTube2 } from "lucide-react"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import GlobalDataContextProvider from "@/context/global-data-context"
import { routing } from "@/lib/i18n/routing"
import MyReactQueryProvider from "@/lib/react-query"
import { getServerSession } from "@/services/get-server-session"
import { getCities, getUnitTypes } from "@/services/lists"
import "../globals.css"
import MyMantineProvider from "../mantine-provider"
import ReceivedMessage from "./(website)/user/chat/_components/received-messages"
import { getCachedTokenFromCookie } from "./(website)/user/chat/_lib/get-cached-access-token"
import { ChatsListStoreProvider } from "./(website)/user/chat/_stores/chats-list-store-provider"
import { SessionStoreProvider } from "./(website)/user/chat/_stores/session-store-provider"
import { UserStoreProvider } from "./(website)/user/chat/_stores/user-store-provider"
import { InitSession } from "./components/init-session"
import Scripts from "./components/scripts"

const arFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font",
})

export const revalidate = 3600
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
  const chatAccessToken = await getCachedTokenFromCookie()
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
        <GlobalDataContextProvider cities={cities} unitTypes={unitTypes}>
          <MyReactQueryProvider>
            <NuqsAdapter>
              <MyMantineProvider locale={locale}>
                <NextIntlClientProvider>
                  <SessionStoreProvider accessToken={chatAccessToken}>
                    <UserStoreProvider user={null}>
                      <ChatsListStoreProvider>
                        <InitSession initialValue={session} />
                        {children}
                        {process.env.NEXT_PUBLIC_TEST == "true" && (
                          <div className="fixed end-1 bottom-9 z-10 rounded-full bg-gray-200 p-0.5 md:bottom-4">
                            <TestTube2 className="text-primary" />
                          </div>
                        )}
                        <ReceivedMessage />
                      </ChatsListStoreProvider>
                    </UserStoreProvider>
                  </SessionStoreProvider>
                </NextIntlClientProvider>
              </MyMantineProvider>
            </NuqsAdapter>
          </MyReactQueryProvider>
        </GlobalDataContextProvider>
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
