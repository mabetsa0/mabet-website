import {
  Button,
  ButtonProps,
  Combobox,
  Group,
  ScrollArea,
  Title,
  useCombobox,
} from "@mantine/core"
import { Check, ChevronDown, Search } from "lucide-react"
import { useTranslations } from "next-intl"
import { parseAsString, useQueryState, UseQueryStateOptions } from "nuqs"
import { useState } from "react"

type Props = {
  filterKey: string
  data: { label: string; value: string }[]
  label: string
  buttonProps: ButtonProps
  searchPlaceholder?: string
  options?: UseQueryStateOptions<unknown>
  withinPortal?: boolean
}
export function FilterButtonWithSearch({
  withinPortal = true,
  ...props
}: Props) {
  const [search, setSearch] = useState("")
  const [selectedItem, setSelectedItem] = useQueryState(
    props.filterKey,
    props.options || parseAsString.withDefault("")
  )
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption()
      combobox.focusTarget()
      setSearch("")
    },

    onDropdownOpen: () => {
      combobox.focusSearchInput()
    },
  })

  const options = props.data
    .filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase().trim())
    )
    .map((item) => (
      <Combobox.Option value={item.value} key={item.value}>
        <Group>
          {selectedItem == item.value + "" ? (
            <Check size={18} color="#767676" />
          ) : null}
          {item.label}
        </Group>
      </Combobox.Option>
    ))

  const t = useTranslations("general")

  return (
    <>
      <Combobox
        transitionProps={{ duration: 200, transition: "pop" }}
        store={combobox}
        width={350}
        shadow="md"
        radius={16}
        position="bottom-start"
        withinPortal={withinPortal}
        onOptionSubmit={(val) => {
          setSelectedItem(val)
          combobox.closeDropdown()
        }}
      >
        <Combobox.Target withAriaAttributes={false}>
          <Button
            onClick={() => combobox.toggleDropdown()}
            className={
              selectedItem ? "border-primary bg-primary/10 text-primary" : ""
            }
            color="dark"
            variant="outline"
            rightSection={<ChevronDown strokeWidth={1.25} />}
            {...props.buttonProps}
          />
        </Combobox.Target>

        <Combobox.Dropdown p={"md"}>
          <Combobox.Header mb={"md"}>
            <Title order={5}>{props.label}</Title>
          </Combobox.Header>
          <Combobox.Search
            h={50}
            variant="default"
            radius={"md"}
            value={search}
            leftSection={<Search size={18} className="text-primary" />}
            classNames={{
              input: "border border-gray-300 rounded-[30px]  h-full",
            }}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder={props.searchPlaceholder || t("search")}
          />
          <Combobox.Options>
            <ScrollArea.Autosize pt={"xs"} mah={240}>
              {options.length > 0 ? (
                options
              ) : (
                <Combobox.Empty>{t("empty")}</Combobox.Empty>
              )}
            </ScrollArea.Autosize>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  )
}
