/* eslint-disable @next/next/no-img-element */
"use client"
import { useTranslations } from "next-intl"
import {
  Button,
  Divider,
  Group,
  Image,
  Popover,
  SegmentedControl,
  Stack,
  Text,
} from "@mantine/core"
import { DatePicker } from "@mantine/dates"
import { useDisclosure } from "@mantine/hooks"
import dayjs from "dayjs"
import { calenderIn, calenderOut } from "@/assets"
import { cn } from "@/lib/cn"
import { useSearchBarFormContext } from "./search-bar"

const DateRangePicker = () => {
  const [opened, { close, open }] = useDisclosure(false)
  const form = useSearchBarFormContext()

  const t = useTranslations("date-range-picker")

  const duration = dayjs(form.values.dates[1]).diff(
    dayjs(form.values.dates[0]),
    "days"
  )
  return (
    <Popover
      transitionProps={{ duration: 200, transition: "pop" }}
      withArrow
      opened={opened}
      onClose={close}
      onDismiss={close}
      shadow="md"
    >
      <Popover.Target>
        <Group
          wrap="nowrap"
          className="h-full w-full cursor-pointer"
          onClick={() => {
            open()
          }}
        >
          <Stack className="w-full" gap={2}>
            <Group gap={4}>
              <Image alt="icon" src={calenderIn} />
              <Text className="text-sm">{t("check-in")}</Text>
            </Group>
            <Group
              className={cn(
                "h-[50px] items-center text-lg text-gray-600",
                form.values.dates[0] && "text-gray-700"
              )}
            >
              {form.values.dates[0]
                ? dayjs(form.values.dates[0]).format("dddd DD MM, YYYY")
                : t("select-date")}
            </Group>
          </Stack>
          <Divider orientation="vertical" />
          <Stack className="w-full" gap={2}>
            <Group gap={4}>
              <Image alt="icon" src={calenderOut} />

              <Text className="text-sm">{t("check-out")}</Text>
            </Group>
            <Group
              className={cn(
                "h-[50px] items-center text-lg text-gray-600",
                form.values.dates[1] && "text-gray-700"
              )}
            >
              {form.values.dates[1]
                ? dayjs(form.values.dates[1]).format("dddd DD MM, YYYY")
                : t("select-date")}
            </Group>
          </Stack>
        </Group>
      </Popover.Target>
      <Popover.Dropdown>
        <div className="mb-xs">
          <SegmentedControl
            value={
              duration >= 27 ? "monthly" : duration >= 7 ? "weekly" : "daily"
            }
            fullWidth
            readOnly
            data={[
              {
                value: "daily",
                label: t("daily"),
              },
              {
                value: "weekly",
                label: t("weekly"),
              },
              {
                value: "monthly",
                label: t("monthly"),
              },
            ]}
          />
        </div>
        <DatePicker
          numberOfColumns={2}
          hideOutsideDates
          minDate={new Date()}
          type="range"
          // value={value}
          // onChange={setValue}
          key={form.key("dates")}
          {...form.getInputProps("dates")}
        />
        <Group justify="end">
          <Button
            mt="md"
            onClick={() => {
              close()
            }}
          >
            {t("apply")}
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  )
}

export default DateRangePicker
