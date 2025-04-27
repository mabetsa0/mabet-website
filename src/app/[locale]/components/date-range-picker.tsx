/* eslint-disable @next/next/no-img-element */
"use client"
import { calenderIn, calenderOut } from "@/assets"
import "@mantine/dates/styles.css"

import { Divider, Group, Popover, Stack, Text } from "@mantine/core"
import { DatePicker } from "@mantine/dates"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { cn } from "@/lib/cn"
import dayjs from "dayjs"

const DateRangePicker = () => {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null])

  const t = useTranslations("date-range-picker")

  return (
    <Popover withArrow shadow="md">
      <Popover.Target>
        <Group wrap="nowrap" className="w-full h-full">
          <Stack className="w-full " gap={2}>
            <Group gap={4}>
              <img alt="icon" src={calenderIn.src} />
              <Text className="text-sm">{t("check-in")}</Text>
            </Group>
            <Group
              className={cn(
                "h-[50px] items-center text-gray-600 text-lg",
                value[0] && "text-gray-700"
              )}
            >
              {value[0]
                ? dayjs(value[0]).format("dddd MM, YYYY")
                : t("select-date")}
            </Group>
          </Stack>
          <Divider orientation="vertical" />
          <Stack className="w-full " gap={2}>
            <Group gap={4}>
              <img alt="icon" src={calenderOut.src} />

              <Text className="text-sm">{t("check-out")}</Text>
            </Group>
            <Group
              className={cn(
                "h-[50px] items-center text-gray-600 text-lg",
                value[1] && "text-gray-700"
              )}
            >
              {value[1]
                ? dayjs(value[1]).format("dddd MM, YYYY")
                : t("select-date")}
            </Group>
          </Stack>
        </Group>
      </Popover.Target>
      <Popover.Dropdown>
        <DatePicker
          numberOfColumns={2}
          hideOutsideDates
          minDate={new Date()}
          type="range"
          value={value}
          onChange={setValue}
        />
      </Popover.Dropdown>
    </Popover>
  )
}

export default DateRangePicker
