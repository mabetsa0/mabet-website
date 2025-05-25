"use client"
import { Box, Tabs } from "@mantine/core"
import { useTranslations } from "next-intl"
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
          list: " before:border-transparent  justify-center",
          tab: "data-[active]:text-primary text-lg",
        }}
        value={tab}
        onChange={setTab}
      >
        <Tabs.List>
          <Tabs.Tab size={"lg"} value="Default">
            {t("deatils-tab")}
          </Tabs.Tab>
          <Tabs.Tab size={"lg"} value="Reviews">
            {t("reviews-tab")}
          </Tabs.Tab>
          <Tabs.Tab size={"lg"} value="Map">
            {t("map-tab")}
          </Tabs.Tab>
          <Tabs.Tab size={"lg"} value="Terms">
            {t("conditions-tap")}
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </Box>
  )
}

export default UnitSegmentedControl
