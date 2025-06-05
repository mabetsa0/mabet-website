"use client"
import { RiyalIcon } from "@/components/icons"
import {
  Button,
  Divider,
  Group,
  NumberFormatter,
  Popover,
  RangeSlider,
  SimpleGrid,
  Stack,
  Title,
} from "@mantine/core"
import { ChevronDown, Ticket } from "lucide-react"
import { useTranslations } from "next-intl"
import { parseAsInteger, useQueryStates } from "nuqs"
import { useState } from "react"

const PriceFilter = () => {
  const t = useTranslations("search.filter.price-filter")
  const [price, set] = useQueryStates({
    priceFrom: parseAsInteger,
    priceTo: parseAsInteger,
  })
  const [value, setValue] = useState<[number, number]>([
    price.priceFrom ?? 50,
    price.priceTo ?? 6000,
  ])
  const onSubmit = () => {
    set({
      priceFrom: value[0],
      priceTo: value[1],
    })
  }
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
            price.priceFrom && price.priceTo
              ? "border-primary bg-primary/10 text-primary"
              : ""
          }
          color="dark"
          variant="outline"
          leftSection={<Ticket strokeWidth={1.25} />}
          rightSection={<ChevronDown strokeWidth={1.25} />}
        >
          {t("button")}
        </Button>
      </Popover.Target>

      <Popover.Dropdown className="!w-[340px] md:!w-[390px]">
        <Stack gap={"lg"} p={"xs"}>
          <Title order={5}>{t("title")}</Title>
          <Divider />
          <RangeSlider
            min={50}
            max={6000}
            step={10}
            value={value}
            onChange={setValue}
          />
          <Group wrap="nowrap" className="text-[#767676]">
            <div className="w-full rounded-4xl border-[1.5px] border-[#F3F3F3] p-1">
              {t("from")} <NumberFormatter value={value[0]} thousandSeparator />{" "}
              <RiyalIcon />
            </div>
            -
            <div className="w-full rounded-4xl border-[1.5px] border-[#F3F3F3] p-1">
              {t("to")} <NumberFormatter value={value[1]} thousandSeparator />{" "}
              <RiyalIcon />
            </div>
          </Group>

          <SimpleGrid cols={2}>
            <Button onClick={onSubmit}>{t("search-now")}</Button>
            <Button
              color={"red"}
              onClick={() => {
                setValue([50, 6000])
                set(null)
              }}
              variant="subtle"
            >
              {t("clear")}
            </Button>
          </SimpleGrid>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}

export default PriceFilter
