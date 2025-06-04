"use client"
import { DirectionProvider, MantineProvider } from "@mantine/core"
import { DatesProvider } from "@mantine/dates"
import dayjs from "dayjs"
import "dayjs/locale/ar"
import theme from "./theme"
import { Notifications } from "@mantine/notifications"
import "@mantine/notifications/styles.css"
import "@mantine/dates/styles.css"
import "@mantine/carousel/styles.css"

export default function MyMantineProvider({
  children,
  locale,
}: {
  children: React.ReactNode
  locale: string
}) {
  dayjs.locale(locale)
  return (
    <DirectionProvider
      detectDirection
      initialDirection={locale == "ar" ? "rtl" : "ltr"}
    >
      <MantineProvider theme={theme}>
        <DatesProvider
          settings={{
            locale,
            firstDayOfWeek: 6,
            weekendDays: [5],
          }}
        >
          {children}
          <Notifications />
        </DatesProvider>
      </MantineProvider>
    </DirectionProvider>
  )
}
