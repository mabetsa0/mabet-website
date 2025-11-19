"use client"
import React from "react"
import { useTranslations } from "next-intl"
import {
  Button,
  Divider,
  Popover,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from "@mantine/core"
import { useField } from "@mantine/form"
import { ChevronDown, QrCode, Search } from "lucide-react"
import { parseAsString, useQueryState } from "nuqs"

const UnitCodeFilter = () => {
  const t = useTranslations("search.filter.unit-code-filter")

  const [unit_code, setUnitCode] = useQueryState(
    "unit_query",
    parseAsString.withDefault("")
  )
  const field = useField({
    mode: "controlled",
    initialValue: unit_code,
  })
  const onSubmit = () => {
    setUnitCode(field.getValue())
  }
  const onClear = () => {
    setUnitCode(null)
    field.setValue("")
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
          className={unit_code && "border-primary bg-primary/10 text-primary"}
          color="dark"
          variant="outline"
          leftSection={<QrCode strokeWidth={1.25} />}
          rightSection={<ChevronDown strokeWidth={1.25} />}
        >
          {t("button")}
        </Button>
      </Popover.Target>

      <Popover.Dropdown className="!w-[340px] md:!w-[390px]">
        <Stack gap={"lg"} p={"xs"}>
          <Title order={5}>{t("title")}</Title>
          <Divider />
          <TextInput
            size="xl"
            radius={"xl"}
            leftSection={<Search className="text-primary" strokeWidth={1.25} />}
            placeholder={t("placeholder")}
            {...field.getInputProps()}
          />

          <SimpleGrid cols={2}>
            <Button size="lg" onClick={onSubmit} variant="outline">
              {t("search-now")}
            </Button>
            <Button onClick={onClear} color="red" variant="transparent">
              {t("clear")}
            </Button>
          </SimpleGrid>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}

export default UnitCodeFilter
