"use client"
import React from "react"
import {
  Button,
  Divider,
  Popover,
  Stack,
  TextInput,
  Title,
} from "@mantine/core"
import { useTranslations } from "next-intl"
import { ChevronDown, QrCode, Search } from "lucide-react"
import { useField } from "@mantine/form"
import { parseAsString, useQueryState } from "nuqs"

const UnitCodeFilter = () => {
  const t = useTranslations("search.filter.unit-code-filter")

  const [unit_code, setUnitCode] = useQueryState(
    "unit_query",
    parseAsString.withDefault("")
  )
  const field = useField({
    mode: "uncontrolled",
    initialValue: unit_code,
  })
  const onSubmit = () => {
    setUnitCode(field.getValue())
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

      <Popover.Dropdown w={390}>
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
          <Button size="lg" onClick={onSubmit} variant="outline">
            {t("search-now")}
          </Button>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}

export default UnitCodeFilter
