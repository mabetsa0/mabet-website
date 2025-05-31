"use client"
import { CustomNumberInput } from "@/components/ui/number-input"
import {
  Button,
  Divider,
  Popover,
  SimpleGrid,
  Stack,
  Title,
} from "@mantine/core"
import { ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"
import { parseAsInteger, useQueryStates } from "nuqs"
import { useState } from "react"

const CountFilter = () => {
  const [filter, set] = useQueryStates({
    rooms_count: parseAsInteger.withDefault(0),
    single_beds_count: parseAsInteger.withDefault(0),
    master_beds_count: parseAsInteger.withDefault(0),
  })
  const [values, setValues] = useState({
    rooms_count: filter.rooms_count,
    single_beds_count: filter.single_beds_count,
    master_beds_count: filter.master_beds_count,
  })
  const t = useTranslations("search.filter.count-filter")

  const onApply = () => {
    set(values)
  }

  const onClear = () => {
    set(null)
    setValues({
      rooms_count: 0,
      single_beds_count: 0,
      master_beds_count: 0,
    })
  }
  return (
    <Popover
      transitionProps={{ duration: 200, transition: "pop" }}
      radius={"16"}
      shadow="md"
      position="bottom-start"
    >
      <Popover.Target>
        <Button
          className={
            filter.rooms_count ||
            filter.single_beds_count ||
            filter.master_beds_count
              ? "border-primary bg-primary/10 text-primary"
              : ""
          }
          color="dark"
          variant="outline"
          rightSection={<ChevronDown strokeWidth={1.25} />}
        >
          {t("button")}
        </Button>
      </Popover.Target>

      <Popover.Dropdown w={390}>
        <Stack gap={"lg"} p={"xs"}>
          <Title order={5}>{t("title")}</Title>
          <Divider />
          <Stack gap={"lg"}>
            <CustomNumberInput
              value={values.rooms_count!}
              onChange={(value) => {
                setValues((pre) => ({
                  ...pre,
                  rooms_count: +value,
                }))
              }}
              label={t("room-count")}
            />
            <CustomNumberInput
              value={values.master_beds_count!}
              onChange={(value) => {
                setValues((pre) => ({
                  ...pre,
                  master_beds_count: +value,
                }))
              }}
              label={t("beds-count")}
            />
            <CustomNumberInput
              value={values.single_beds_count!}
              onChange={(value) => {
                setValues((pre) => ({
                  ...pre,
                  single_beds_count: +value,
                }))
              }}
              label={t("single-beds-count")}
            />
            <SimpleGrid cols={2}>
              <Button onClick={onApply}>{t("applay")}</Button>
              <Button onClick={onClear} color="red" variant="transparent">
                {t("delete")}
              </Button>
            </SimpleGrid>
          </Stack>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}

export default CountFilter
