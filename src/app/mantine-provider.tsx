"use client"
import { DirectionProvider, MantineProvider } from "@mantine/core"
import "dayjs/locale/ar"
import theme from "./theme"
import { DatesProvider } from "@mantine/dates"
import dayjs from "dayjs"

export default function MyMantineProvider({
  children,
  locale,
}: {
  children: React.ReactNode
  locale: string
}) {
  dayjs.locale(locale)
  return (
    <DirectionProvider>
      <MantineProvider theme={theme}>
        <DatesProvider
          settings={{
            locale,
            firstDayOfWeek: 6,
            weekendDays: [5],
            timezone: "UTC",
          }}
        >
          {children}
        </DatesProvider>
      </MantineProvider>
    </DirectionProvider>
  )
}
