"use client"
import {
  Button,
  ButtonProps,
  Checkbox,
  Divider,
  Popover,
  ScrollArea,
  Stack,
  Title,
} from "@mantine/core"
import { ChevronDown } from "lucide-react"
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs"
import { useTranslations } from "next-intl"
type Props = {
  filterKey: string
  buttonProps: ButtonProps
  data: { value: string; label: string }[]
  title: string
}
const FilterButtonWithCheckbox = (props: Props) => {
  const t = useTranslations()
  const [filter, set] = useQueryState(
    props.filterKey,
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
          rightSection={<ChevronDown strokeWidth={1.25} />}
          {...props.buttonProps}
        />
      </Popover.Target>

      <Popover.Dropdown w={390}>
        <Stack gap={"lg"} p={"xs"}>
          <Title order={5}>{props.title}</Title>
          <Divider />
          <Checkbox.Group value={filter || []} onChange={set}>
            <ScrollArea.Autosize mah={220}>
              <Stack>
                {props.data.map((element, index) => {
                  return (
                    <Checkbox
                      radius={"sm"}
                      size="lg"
                      key={index}
                      value={element.value}
                      label={element.label}
                    />
                  )
                })}
              </Stack>
            </ScrollArea.Autosize>
          </Checkbox.Group>
          <Button variant="light" color="red" onClick={() => set(null)}>
            {t("general.clear")}
          </Button>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}

export default FilterButtonWithCheckbox
