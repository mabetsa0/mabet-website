"use client"

import { UnitTypeIcons } from "@/assets"
import { useUnitTypes } from "@/context/global-data-context"
import {
  Button,
  Group,
  Image,
  Popover,
  Radio,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core"
import { ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"
import { parseAsString, useQueryState } from "nuqs"
const UnitTypeFilter = () => {
  const [filter, set] = useQueryState("unit_type_id", parseAsString)
  const t = useTranslations()
  const unitTypes = useUnitTypes()
  return (
    <Popover
      transitionProps={{ duration: 200, transition: "pop" }}
      withArrow
      shadow="md"
    >
      <Popover.Target>
        <Button
          className={filter ? "border-primary bg-primary/10 text-primary" : ""}
          color="dark"
          variant="outline"
          rightSection={<ChevronDown strokeWidth={1.25} />}
        >
          {t("general.select-unit-type")}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Radio.Group value={filter} onChange={(value) => set(value)}>
          <SimpleGrid cols={2}>
            {unitTypes.map((type) => {
              return (
                <Radio.Card
                  key={type.id}
                  radius="md"
                  value={type.id + ""}
                  className="group duration-300 data-[checked]:border-primary data-[checked]:bg-[#18807826] px-2.5 py-2.5 relative"
                >
                  <Group wrap="nowrap" align="flex-start">
                    <Radio.Indicator className="absolute opacity-0" />
                    <Stack gap={"xs"} ta={"center"} className="w-full">
                      <Image
                        h={40}
                        w={40}
                        mx={"auto"}
                        src={
                          UnitTypeIcons[
                            (type.id + "") as keyof typeof UnitTypeIcons
                          ]
                        }
                        alt={type.name}
                      />
                      <Text
                        fz={"sm"}
                        fw={700}
                        className="duration-300 group-data-[checked]:text-primary"
                      >
                        {type.name}
                      </Text>
                      <Text ta={"center"} size="sm" c={"gray"}>
                        {type.units_count_text}
                      </Text>
                    </Stack>
                  </Group>
                </Radio.Card>
              )
            })}
          </SimpleGrid>
        </Radio.Group>
        <Button
          fullWidth
          mt={"xs"}
          variant="light"
          color="red"
          onClick={() => set(null)}
        >
          {t("general.clear")}
        </Button>
      </Popover.Dropdown>
    </Popover>
  )
}

export default UnitTypeFilter
