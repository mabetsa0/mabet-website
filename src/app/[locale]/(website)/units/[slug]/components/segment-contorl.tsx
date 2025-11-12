"use client"
import { useTranslations } from "next-intl"
import { Box, Tabs } from "@mantine/core"
import { parseAsString, useQueryState } from "nuqs"

const UnitSegmentedControl = () => {
  const [tab, setTab] = useQueryState(
    "tab",
    parseAsString.withDefault("Default")
  )
  const t = useTranslations("unit")
  return (
    <Box hiddenFrom="md">
      <Tabs
        py={"sm"}
        classNames={{
          list: " before:border-transparent  justify-center flex-nowrap",
          tab: "data-[active]:text-primary text-[17px]",
        }}
        value={tab}
        onChange={setTab}
      >
        <Tabs.List>
          <Tabs.Tab value="Default">{t("deatils-tab")}</Tabs.Tab>
          <Tabs.Tab value="Reviews">{t("reviews-tab")}</Tabs.Tab>
          <Tabs.Tab value="Map">{t("map-tab")}</Tabs.Tab>
          <Tabs.Tab value="Terms">{t("conditions-tap")}</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </Box>
  )
}

export default UnitSegmentedControl
