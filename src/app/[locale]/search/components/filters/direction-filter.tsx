"use client"
import { Button, Divider, Popover, Radio, Stack, Title } from "@mantine/core"
import { ChevronDown, Ticket } from "lucide-react"
import { useTranslations } from "next-intl"
import { parseAsString, useQueryState } from "nuqs"
import { useState } from "react"

const DirectionFilter = () => {
  const t = useTranslations("search.filter.direction-filter")
  const [value, setValue] = useState("")
  const [filter, set] = useQueryState("direction_id", parseAsString)
  const onSubmit = () => {
    set(value)
  }
  return (
    <Popover radius={"16"} shadow="md" position="bottom-start">
      <Popover.Target>
        <Button
          className={filter ? "border-primary" : ""}
          color="dark"
          variant="outline"
          leftSection={<Ticket strokeWidth={1.25} />}
          rightSection={<ChevronDown strokeWidth={1.25} />}
        >
          {t("button")}
        </Button>
      </Popover.Target>

      <Popover.Dropdown w={390}>
        <Stack gap={"lg"} p={"xs"}>
          <Title order={5}>{t("title")}</Title>
          <Divider />
          <Radio.Group>
            <Stack>
              <Radio />
              <Radio />
              <Radio />
            </Stack>
          </Radio.Group>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}

export default DirectionFilter
