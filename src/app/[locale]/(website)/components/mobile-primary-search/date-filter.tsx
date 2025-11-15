/* eslint-disable @next/next/no-img-element */
"use client"
import { useLocale, useTranslations } from "next-intl"
import {
  Button,
  Divider,
  Group,
  SegmentedControl,
  Stack,
  Text,
} from "@mantine/core"
import { DatePicker } from "@mantine/dates"
import dayjs from "dayjs"
import "dayjs/locale/ar"
import durations from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"
import { useCities, useUnitTypes } from "@/context/global-data-context"
import { useFormContext } from "./search-contexts"

dayjs.extend(durations)
dayjs.extend(relativeTime)

const DateFilter = () => {
  const cities = useCities()
  const unitTypes = useUnitTypes()
  const form = useFormContext()
  const t = useTranslations()
  const selectedCite =
    cities.find((ele) => String(ele.id) == form.values.city_id)?.name ||
    t("general.all-cities")
  const selectedType =
    unitTypes.find((ele) => String(ele.id) == form.values.unit_type_id)?.name ||
    ""

  const [from, to] = form.values.dates

  const duration = dayjs(to).diff(dayjs(from), "days")

  const locale = useLocale()

  return (
    <Stack>
      <Stack gap={"xs"}>
        <Text py={"xs"} c={"#767676"}>
          {selectedCite} {selectedType}
        </Text>
        <Group justify="space-between">
          <Text c={"#767676"}>
            {t("general.from")}{" "}
            {from ? (
              <span className="text-primary font-bold">
                {dayjs(from).format("DD")}
              </span>
            ) : null}{" "}
            {from ? dayjs(from).format("/ MMMM") : ""} -{" "}
            <span className="text-primary font-bold">
              {to ? dayjs(to).format("DD") : null}
            </span>{" "}
            {to ? dayjs(to).format("/ MMMM") : null}
          </Text>
          {from && to ? (
            <Text c={"primary"}>
              ({dayjs.duration(duration, "day").locale(locale).humanize()})
            </Text>
          ) : null}
        </Group>
      </Stack>
      <Divider />
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
      <div className="flex w-full justify-center">
        <DatePicker
          size="md"
          hideOutsideDates
          minDate={new Date()}
          type="range"
          // value={value}
          // onChange={setValue}
          key={form.key("dates")}
          {...form.getInputProps("dates")}
        />
      </div>
      <Button type="submit">{t("general.search-now")}</Button>
    </Stack>
  )
}

export default DateFilter
