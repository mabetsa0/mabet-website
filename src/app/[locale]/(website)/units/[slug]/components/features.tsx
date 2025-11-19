/* eslint-disable @next/next/no-img-element */
"use client"
import { useTranslations } from "next-intl"
import { Group, List, Space, Spoiler, Stack, Text } from "@mantine/core"
import { Dot } from "lucide-react"
import { useUnitData } from "../context/unit-context"

const Features = () => {
  const unit = useUnitData()
  const t = useTranslations()
  return (
    <Stack>
      <h3 className="text-h4 md:text-h3 font-medium">{t("unit.features")}</h3>
      <Stack gap={"xs"} className="mb-1 text-[#767676]">
        <Spoiler
          maxHeight={130}
          showLabel={t("unit.show-more")}
          hideLabel={t("unit.show-less")}
          classNames={{
            content:
              "relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 backdrop-blur-sm  before:bg-gradient before:bg-gradient-to-t before:from-white before:to-white/0 ",
            control:
              "bg-primary px-2.5  font-medium py-0.5 rounded-sm text-sm text-white h-2.5 block",
          }}
        >
          <Stack>
            <Stack className="divide-y divide-[#F3F3F3]" gap={"md"}>
              {unit.features.map((value, index) => {
                return (
                  <Stack key={index} className="pb-0.5">
                    <Group>
                      <img
                        className="h-2"
                        src={value.icon_svg}
                        alt={value.name}
                      />
                      <Text>{value.name}</Text>
                    </Group>
                    {value.list.length > 0 ? (
                      <List icon={<Dot />} size="sm" withPadding>
                        {value.list.map((e) => {
                          return <List.Item key={e}>{e}</List.Item>
                        })}
                      </List>
                    ) : null}
                  </Stack>
                )
              })}
            </Stack>
            <Space />
          </Stack>
        </Spoiler>
      </Stack>
    </Stack>
  )
}

export default Features
