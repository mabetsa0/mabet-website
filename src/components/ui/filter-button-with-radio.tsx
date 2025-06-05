"use client"
import {
  Button,
  ButtonProps,
  Divider,
  Popover,
  Radio,
  ScrollArea,
  Stack,
  Title,
} from "@mantine/core"
import { ChevronDown } from "lucide-react"
import { parseAsString, useQueryState } from "nuqs"
import { useTranslations } from "next-intl"
type Props = {
  filterKey: string
  buttonProps: ButtonProps
  data: { value: string; label: string }[]
  title: string
}
const FilterButtonWithRadio = (props: Props) => {
  const [filter, set] = useQueryState(props.filterKey, parseAsString)
  const t = useTranslations()

  return (
    <Popover
      transitionProps={{ duration: 200, transition: "pop" }}
      radius={"16"}
      shadow="md"
      position="bottom-start"
    >
      <Popover.Target>
        <Button
          className={filter ? "border-primary bg-primary/10 text-primary" : ""}
          color="dark"
          variant="outline"
          rightSection={<ChevronDown strokeWidth={1.25} />}
          {...props.buttonProps}
        ></Button>
      </Popover.Target>

      <Popover.Dropdown className="!w-[340px] md:!w-[390px]">
        <Stack gap={"lg"} p={"xs"}>
          <Title order={5}>{props.title}</Title>
          <Divider />
          <Radio.Group value={filter} onChange={set}>
            <ScrollArea.Autosize mah={220}>
              <Stack>
                {props.data.map((element) => {
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
            </ScrollArea.Autosize>
          </Radio.Group>
          <Button variant="light" color="red" onClick={() => set(null)}>
            {t("general.clear")}
          </Button>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}

export default FilterButtonWithRadio
