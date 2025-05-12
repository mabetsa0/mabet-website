"use client"
import { Button, Divider, Popover, Radio, Stack, Title } from "@mantine/core"
import { ChevronDown, SignpostBig } from "lucide-react"
import { useTranslations } from "next-intl"
import { parseAsString, useQueryState } from "nuqs"

const DirectionFilter = () => {
  const t = useTranslations("search.filter.direction-filter")
  const [filter, set] = useQueryState("direction_id", parseAsString)

  return (
    <Popover radius={"16"} shadow="md" position="bottom-start">
      <Popover.Target>
        <Button
          className={filter ? "border-primary" : ""}
          color="dark"
          variant="outline"
          leftSection={<SignpostBig strokeWidth={1.25} />}
          rightSection={<ChevronDown strokeWidth={1.25} />}
        >
          {t("button")}
        </Button>
      </Popover.Target>

      <Popover.Dropdown w={390}>
        <Stack gap={"lg"} p={"xs"}>
          <Title order={5}>{t("title")}</Title>
          <Divider />
          <Radio.Group value={filter} onChange={set}>
            <Stack>
              <Radio
                classNames={{ label: "text-base" }}
                value="1"
                label={t("north")}
              />
              <Radio
                classNames={{ label: "text-base" }}
                value="2"
                label={t("south")}
              />
              <Radio
                classNames={{ label: "text-base" }}
                value="3"
                label={t("west")}
              />
              <Radio
                classNames={{ label: "text-base" }}
                value="4"
                label={t("east")}
              />
            </Stack>
          </Radio.Group>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}

export default DirectionFilter
