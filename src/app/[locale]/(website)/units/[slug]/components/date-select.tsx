/* eslint-disable @next/next/no-img-element */
"use client"
import { calenderIn, calenderOut } from "@/assets"
import useMdScreen from "@/hooks/use-md-screen"
import { cn } from "@/lib/cn"
import { getDaysBetweenDates } from "@/utils/get-days-between-dates"
import {
  Button,
  Divider,
  Group,
  Indicator,
  Popover,
  SegmentedControl,
  Stack,
  Text,
} from "@mantine/core"
import { DatePicker } from "@mantine/dates"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import dayjs from "dayjs"
import durations from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"
import { Minus } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { parseAsBoolean, parseAsIsoDate, useQueryStates } from "nuqs"
import { ComponentRef, useEffect, useRef, useState } from "react"
import { useUnitData } from "../context/unit-context"
import useBusyDays from "../hooks/use-busy-days"

dayjs.extend(durations)
dayjs.extend(relativeTime)

const DateSelect = ({
  readOnly,
  initialValues,
  mode,
}: {
  readOnly?: boolean
  initialValues?: { from: Date; to: Date }
  mode: "mobile" | "desktop"
}) => {
  const unit = useUnitData()
  const ref = useRef<ComponentRef<"div">>(null)

  const [opened, { close, open }] = useDisclosure(false)

  const t = useTranslations()

  const [{ from, to, selectDate }, setDates] = useQueryStates(
    {
      from: parseAsIsoDate.withDefault(dayjs().toDate()),
      to: parseAsIsoDate.withDefault(dayjs().add(1, "days").toDate()),
      selectDate: parseAsBoolean.withDefault(false),
    },
    {
      scroll: false,
      history: "replace",
    }
  )
  useEffect(() => {
    if (selectDate) {
      open()
      ref.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [selectDate])
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
      <div className={cn(isBusyDay ? "!opacity-85" : "")}>
        {date.getDate()}
        {isBusyDay ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Minus className=" text-red-600" size={32} strokeWidth={1} />
          </div>
        ) : null}
      </div>
    )
  }
  const matches = useMdScreen()

  const handleDateChange = (values: [string | null, string | null]) => {
    const days = getDaysBetweenDates(values[0], values[1])

    const hasBusyDaysInRange = busyDays.find((busyDay, i) => {
      return days.slice(0, -1).includes(busyDay)
    })

    if (hasBusyDaysInRange) {
      notifications.show({
        color: "red",
        title: t("can-not-choose-date"),
        message: t("can-not-choose-date-message"),
      })

      return
    }

    const start = dayjs(values[0])
    const end = dayjs(values[1])
    const duration = end.diff(start, "day")

    // اجمع الأيام داخل الفترة
    const daysInRange: string[] = []
    for (let i = 0; i <= duration; i++) {
      daysInRange.push(start.add(i, "day").format("YYYY-MM-DD"))
    }

    // تحقق من الأيام المميزة داخل الفترة
    const matchedFeatured = featuredDates.filter((f) =>
      daysInRange.includes(f.date)
    )

    if (matchedFeatured.length > 0) {
      // احصل على أعلى min_stay
      const maxMinStay = Math.max(...matchedFeatured.map((f) => f.min_stay))
      console.log("🚀 ~ handleDateChange ~ maxMinStay:", maxMinStay)

      // لو المدة أقل من المطلوب، عدّل النهاية
      if (duration < maxMinStay) {
        const newEndDate = start.add(maxMinStay, "day").toDate()

        notifications.show({
          color: "orange",
          title: t("general.warning"),
          message:
            `${t("general.min_stay_warning")}: ${maxMinStay} ${t("general.nights")}. ` +
            t("general.date_extended_to") +
            dayjs(newEndDate).format("YYYY-MM-DD"),
        })

        setValue([start.toDate(), newEndDate])
        return
      }
    }

    setValue([
      values[0] ? new Date(values[0]) : null,
      values[1] ? new Date(values[1]) : null,
    ])
  }
  return (
    <Stack>
      <div>
        {readOnly ? null : (
          <Text mb={"xs"} c="#767676">
            {t("date-range-picker.can-edit")}
          </Text>
        )}
        <Group justify="space-between" ref={ref}>
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
        opened={opened}
        trapFocus={false}
        closeOnClickOutside={false}
        onClose={() => {
          if (value[0] && value[1]) {
            setDates({ from: value[0], to: value[1] })
            console.log({ from: value[0], to: value[1] })
            console.log("Mode is: " + mode)
          } else if (value[0] && !value[1]) {
            setDates({
              from: value[0],
              to: dayjs(value[0]).add(1, "day").toDate(),
            })
          }
          close()
        }}
        onDismiss={() => {
          close()
        }}
        disabled={readOnly}
        transitionProps={{ duration: 200, transition: "pop" }}
        withArrow
        shadow="md"
      >
        <Popover.Target>
          <Group
            onClick={() => {
              open()
            }}
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
          {/* <div > */}
          <DatePicker
            numberOfColumns={matches ? 1 : 2}
            hideOutsideDates
            minDate={new Date()}
            type="range"
            classNames={{
              day: " relative ",
            }}
            // ref={dropdownRef}

            onDateChange={(date) => handleStartDateChange(new Date(date))}
            value={value}
            onChange={handleDateChange}
            // excludeDate={(date) =>
            //   busyDays.includes(dayjs(date).format("YYYY-MM-DD"))
            // }
            renderDay={(date) => renderDay(new Date(date))}
          />
          <Group justify="end" mt={"sm"}>
            <Button
              onClick={() => {
                close()
              }}
            >
              {t("date-range-picker.apply")}
            </Button>
          </Group>
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
