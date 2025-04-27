"use client"

import { Building2, MapPin, Search } from "lucide-react"
import { ActionIcon, Divider, Group, Select, Grid } from "@mantine/core"
import { useTranslations } from "next-intl"
import DateRangePicker from "./date-range-picker"

const SearchBar = () => {
  const t = useTranslations("general")

  return (
    <section>
      <div className="container">
        <form>
          <Group
            wrap="nowrap"
            className="bg-white rounded-[90px] border-[3px] border-[#F3F3F3] text-black"
            p={"8px"}
          >
            <Grid className="grow " px={"lg"}>
              <Grid.Col span={3}>
                <Select
                  size="lg"
                  classNames={{
                    label: "text-sm",
                    input: "text-gray-700 placeholder:text-gray-600",
                  }}
                  variant="unstyled"
                  label={
                    <Group gap={"4"}>
                      <MapPin size={17} strokeWidth={1.5} />
                      {t("select-city")}
                    </Group>
                  }
                  placeholder={t("select")}
                  data={["React", "Angular", "Vue", "Svelte"]}
                  rightSection={<div></div>}
                  rightSectionWidth={0}
                  searchable
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Group wrap="nowrap">
                  <Divider orientation="vertical" />
                  <Select
                    size="lg"
                    classNames={{
                      label: "text-sm",
                      input: "text-gray-700 placeholder:text-gray-600",
                    }}
                    variant="unstyled"
                    label={
                      <Group gap={"4"}>
                        <Building2 size={17} strokeWidth={1.5} />
                        {t("select-unit-type")}
                      </Group>
                    }
                    placeholder={t("select")}
                    data={["React", "Angular", "Vue", "Svelte"]}
                    rightSection={<div></div>}
                    rightSectionWidth={0}
                    searchable
                  />
                </Group>
              </Grid.Col>
              <Grid.Col span={6}>
                <Group wrap="nowrap" h={"100%"}>
                  <Divider orientation="vertical" />
                  <DateRangePicker />
                </Group>
              </Grid.Col>
            </Grid>
            <ActionIcon size={96} radius={"50%"}>
              <Search size={36} strokeWidth={1.25} />
            </ActionIcon>
          </Group>
        </form>
      </div>
    </section>
  )
}

export default SearchBar
