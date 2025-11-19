"use client"
import { useTranslations } from "next-intl"
import { Button, Popover, Radio, Stack } from "@mantine/core"
import { ArrowUpDown } from "lucide-react"
import { parseAsString, useQueryState } from "nuqs"

const OrderFilter = () => {
  const t = useTranslations()
  const [filter, set] = useQueryState("result_type", parseAsString)

  return (
    <div className="fixed right-1/2 bottom-3 z-10 flex w-fit translate-x-1/2 justify-center">
      <Popover width={200} position="bottom" withArrow shadow="md">
        <Popover.Target>
          <Button
            color="primary.6"
            leftSection={<ArrowUpDown strokeWidth={1.25} />}
          >
            {t("general.arrange")}
          </Button>
        </Popover.Target>

        <Popover.Dropdown w={390}>
          <Stack gap={"lg"} p={"xs"}>
            {/* <Title order={5}>{}</Title>
          <Divider /> */}

            <Radio.Group value={filter} onChange={set}>
              <Stack>
                {[
                  {
                    label: t("general.default"),
                    value: "default",
                  },
                  {
                    label: t("general.mostly_viewed"),
                    value: "mostly_viewed",
                  },
                  {
                    label: t("general.lowest_price"),
                    value: "lowest_price",
                  },
                  {
                    label: t("general.highest_price"),
                    value: "highest_price",
                  },
                ].map((element) => {
                  return (
                    <Radio
                      key={element.value}
                      classNames={{ label: "text-base" }}
                      value={element.value}
                      label={element.label}
                    />
                  )
                })}
              </Stack>
            </Radio.Group>
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </div>
  )
}

export default OrderFilter
