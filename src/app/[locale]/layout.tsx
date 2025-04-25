import { routing } from "@/lib/i18n/routing"
import { ColorSchemeScript, MantineProvider } from "@mantine/core"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import theme from "../theme"
import "./globals.css"

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

  return (
    <html lang={locale}>
      <body>
        <head>
          <ColorSchemeScript />
        </head>
        <body className="antialiased">
          <MantineProvider theme={theme}>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </MantineProvider>
        </body>
      </body>
    </html>
  )
}
