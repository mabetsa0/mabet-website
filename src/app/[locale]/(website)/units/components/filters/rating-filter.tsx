"use client"
import {
  Button,
  Checkbox,
  Divider,
  Group,
  Popover,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import { ChevronDown, Star } from "lucide-react"
import { useTranslations } from "next-intl"
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs"

const RatingFilter = () => {
  const t = useTranslations("search.filter.rating-filter")
  const [filter, set] = useQueryState(
    "rating[]",
    parseAsArrayOf(parseAsString).withDefault([])
  )

  return (
    <Popover
      transitionProps={{ duration: 200, transition: "pop" }}
      radius={"16"}
      shadow="md"
      position="bottom-start"
    >
      <Popover.Target>
        <Button
          className={
            filter.length > 0 ? "border-primary bg-primary/10 text-primary" : ""
          }
          color="dark"
          variant="outline"
          leftSection={<Star strokeWidth={1.25} />}
          rightSection={<ChevronDown strokeWidth={1.25} />}
        >
          {t("button")}
        </Button>
      </Popover.Target>

      <Popover.Dropdown w={390}>
        <Stack gap={"lg"} p={"xs"}>
          <Title order={5}>{t("title")}</Title>
          <Divider />
          <Checkbox.Group value={filter || []} onChange={set}>
            <SimpleGrid cols={3}>
              {[3, 4, 5, 6, 7, 8, 9, 10].map((ele) => {
                return (
                  <Checkbox.Card
                    className="group data-checked:bg-primary duration-200"
                    value={ele + ""}
                    key={ele}
                    radius="md"
                  >
                    <Group
                      wrap="nowrap"
                      align="center"
                      justify="center"
                      py={"xs"}
                      gap={"4"}
                      w={"100%"}
                    >
                      <Checkbox.Indicator className=" absolute inset-0 opacity-0" />
                      <Star
                        className="text-[#FFE234] duration-200 fill-[#FFE234] group-data-checked:text-white group-data-checked:fill-white"
                        strokeWidth={1.25}
                      />
                      <Text
                        fw={500}
                        className="group-data-checked:text-white duration-200"
                      >
                        {ele === 3 ? "<" : ""} {ele}
                      </Text>
                    </Group>
                  </Checkbox.Card>
                )
              })}
            </SimpleGrid>
          </Checkbox.Group>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}

export default RatingFilter
