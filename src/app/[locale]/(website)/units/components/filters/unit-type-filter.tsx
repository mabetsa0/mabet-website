"use client"

import { useTranslations } from "next-intl"
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
import { parseAsString, useQueryState } from "nuqs"
import { UnitTypeIcons } from "@/assets"
import { useUnitTypes } from "@/context/global-data-context"

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
                  className="group data-[checked]:border-primary relative px-1 py-1 duration-300 data-[checked]:bg-[#18807826] md:px-2.5 md:py-2.5"
                >
                  <Group wrap="nowrap" align="flex-start">
                    <Radio.Indicator className="absolute opacity-0" />
                    <Stack ta={"center"} className="gap-xs md:gap-sm w-full">
                      <Image
                        className="h-[30px] w-[30px] md:h-[40px] md:w-[40px]"
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
                        className="group-data-[checked]:text-primary duration-300"
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
