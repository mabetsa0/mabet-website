/* eslint-disable @next/next/no-img-element */
"use client"
import {
  Divider,
  Group,
  Indicator,
  Popover,
  SegmentedControl,
  Stack,
  Text,
} from "@mantine/core"
import dayjs from "dayjs"
import { useLocale, useTranslations } from "next-intl"
import { parseAsIsoDate, useQueryStates } from "nuqs"
import durations from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"
import { calenderIn, calenderOut } from "@/assets"
import { cn } from "@/lib/cn"
import { DatePicker } from "@mantine/dates"
import { useState } from "react"
import useBusyDays from "../hooks/use-busy-days"
import { useUnitData } from "../context/unit-context"
import { Minus } from "lucide-react"
import useMdScreen from "../hooks/use-md-screen"
dayjs.extend(durations)
dayjs.extend(relativeTime)

const DateSelect = ({
  readOnly,
  initialValues,
}: {
  readOnly?: boolean
  initialValues?: { from: Date; to: Date }
}) => {
  const unit = useUnitData()
  const t = useTranslations()

  const [{ from, to }, setDates] = useQueryStates(
    {
      from: parseAsIsoDate.withDefault(dayjs().toDate()),
      to: parseAsIsoDate.withDefault(dayjs().add(1, "days").toDate()),
    },
    {
      scroll: false,

      history: "replace",
    }
  )
  const [value, setValue] = useState<[Date | null, Date | null]>(
    initialValues ? [initialValues?.from, initialValues?.to] : [from, to]
  )
  const duration = dayjs(value[1]).diff(dayjs(value[0]), "days")

  const locale = useLocale()

  //  handle rendering calender
  const { busyDays, featuredDates, handleStartDateChange } = useBusyDays({
    id: unit.id,
    startDate: from,
  })
  const renderDay = (date: Date) => {
    const __date = dayjs(date).format("YYYY-MM-DD")
    const isBusyDay = busyDays.includes(__date)

    const isFeaturedDate = featuredDates.filter((day) => day.date === __date)[0]
    if (isFeaturedDate)
      return (
        <Indicator size={6} color="green" offset={-5}>
          <div>{date.getDate()}</div>
        </Indicator>
      )

    return (
      <div className={cn(isBusyDay ? "!opacity-65" : "")}>
        {date.getDate()}
        {isBusyDay ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Minus
              className="rotate-45 text-red-600"
              size={32}
              strokeWidth={1}
            />
          </div>
        ) : null}
      </div>
    )
  }
  const matches = useMdScreen()
  return (
    <Stack>
      <div>
        {readOnly ? null : (
          <Text mb={"xs"} c="#767676">
            {t("date-range-picker.can-edit")}
          </Text>
        )}
        <Group justify="space-between">
          <Text c={"#767676"}>
            {t("general.from")}{" "}
            {value[0] ? (
              <span className=" font-bold text-primary">
                {dayjs(value[0]).format("DD")}
              </span>
            ) : null}{" "}
            {value[0] ? dayjs(value[0]).format("/ MMMM") : ""} -{" "}
            <span className=" font-bold text-primary">
              {value[1] ? dayjs(value[1]).format("DD") : null}
            </span>{" "}
            {value[1] ? dayjs(value[1]).format("/ MMMM") : null}
          </Text>
          {value[0] && value[1] ? (
            <Text c={"primary"}>
              ({dayjs.duration(duration, "day").locale(locale).humanize()})
            </Text>
          ) : null}
        </Group>
      </div>
      <div>
        <SegmentedControl
          size="sm"
          value={
            duration >= 27 ? "monthly" : duration >= 7 ? "weekly" : "daily"
          }
          fullWidth
          readOnly
          data={[
            {
              value: "daily",
              label: t("date-range-picker.daily"),
            },
            {
              value: "weekly",
              label: t("date-range-picker.weekly"),
            },
            {
              value: "monthly",
              label: t("date-range-picker.monthly"),
            },
          ]}
        />
      </div>
      <Popover
        onClose={() => {
          if (value[0] && value[1]) setDates({ from: value[0], to: value[1] })
        }}
        disabled={readOnly}
        transitionProps={{ duration: 200, transition: "pop" }}
        withArrow
        shadow="md"
      >
        <Popover.Target>
          <Group
            wrap="nowrap"
            className="w-full h-full cursor-pointer rounded-md p-xs border-primary border-1"
          >
            <Stack className="w-full " gap={0}>
              <Group gap={4}>
                <img alt="icon" src={calenderIn.src} />
                <Text c="#767676" className="text-sm">
                  {t("date-range-picker.check-in")}
                </Text>
              </Group>
              <Group
                className={cn(
                  "h-[44px] items-center font-medium text-gray-600 text-lg",
                  value[0] && "text-dark"
                )}
              >
                {value[0]
                  ? dayjs(value[0]).format("dddd, DD MMM YYYY")
                  : t("date-range-picker.select-date")}
              </Group>
            </Stack>
            <Divider orientation="vertical" />
            <Stack className="w-full " gap={0}>
              <Group gap={4}>
                <img alt="icon" src={calenderOut.src} />

                <Text c="#767676" className="text-sm">
                  {t("date-range-picker.check-out")}
                </Text>
              </Group>
              <Group
                className={cn(
                  "h-[44px] items-center font-medium text-gray-600 text-lg",
                  value[1] && "text-dark"
                )}
              >
                {value[1]
                  ? dayjs(value[1]).format("dddd, DD MMM YYYY")
                  : t("date-range-picker.select-date")}
              </Group>
            </Stack>
          </Group>
        </Popover.Target>
        <Popover.Dropdown>
          <DatePicker
            numberOfColumns={matches ? 1 : 2}
            hideOutsideDates
            minDate={new Date()}
            type="range"
            classNames={{
              day: " relative ",
            }}
            onDateChange={handleStartDateChange}
            value={value}
            onChange={setValue}
            excludeDate={(date) =>
              busyDays.includes(dayjs(date).format("YYYY-MM-DD"))
            }
            renderDay={renderDay}
          />
        </Popover.Dropdown>
      </Popover>

      <Group wrap="nowrap" className="w-full h-full cursor-pointer  p-xs ">
        <Stack className="w-full " gap={0}>
          <Group gap={4}>
            <img alt="icon" src={calenderIn.src} />
            <Text className="text-sm">{t("date-range-picker.check-in")}</Text>
          </Group>
          <Group
            className={cn(
              " items-center font-medium text-lg",
              "text-[#767676]"
            )}
          >
            {unit.checkin}
          </Group>
        </Stack>
        <Divider orientation="vertical" />
        <Stack className="w-full " gap={0}>
          <Group gap={4}>
            <img alt="icon" src={calenderOut.src} />

            <Text className="text-sm">{t("date-range-picker.check-out")}</Text>
          </Group>
          <Group
            className={cn(
              " items-center font-medium  text-lg",
              "text-[#767676]"
            )}
          >
            {unit.checkout}
          </Group>
        </Stack>
      </Group>
    </Stack>
  )
}

export default DateSelect
