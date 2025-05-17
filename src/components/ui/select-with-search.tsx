import React, { useState } from "react"
import {
  Combobox,
  Group,
  Input,
  InputBase,
  InputBaseProps,
  ScrollArea,
  Text,
  useCombobox,
} from "@mantine/core"
import { useTranslations } from "next-intl"
import { Check, Search } from "lucide-react"

type Props = {
  data: { value: string; label: string }[]
  onChange?: (value: string) => void

  value?: string
  placeholder: React.ReactNode
  searchPlaceholder?: string
  searchLabel?: React.ReactNode
} & InputBaseProps
const SelectDropdownSearch = React.forwardRef<HTMLButtonElement, Props>(
  function Component(
    { value, onChange, searchLabel, searchPlaceholder, ...props },
    ref
  ) {
    const [search, setSearch] = useState("")
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
        item.label.toLowerCase()?.includes(search.toLowerCase().trim())
      )
      .map((item) => (
        <Combobox.Option value={item.value} key={item.value}>
          <Group>
            {value == item.value + "" ? (
              <Check size={18} color="#767676" />
            ) : null}
            {item.label}
          </Group>
        </Combobox.Option>
      ))

    const t = useTranslations("general")

    return (
      <Combobox
        transitionProps={{ duration: 200, transition: "pop" }}
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(val) => {
          onChange?.(val)
          combobox.closeDropdown()
        }}
      >
        <Combobox.Target>
          <InputBase
            ref={ref}
            component="button"
            type="button"
            pointer
            onClick={() => combobox.toggleDropdown()}
            {...props}
          >
            {props.data.find((ele) => ele.value === value)?.label || (
              <Input.Placeholder className="text-gray-600 ">
                {props.placeholder}
              </Input.Placeholder>
            )}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown miw={330} p={"md"}>
          {searchLabel && (
            <Text mb={"sm"} fw={500} fz={"sm"}>
              {searchLabel}
            </Text>
          )}
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
            placeholder={searchPlaceholder || t("search")}
          />
          <Combobox.Options>
            <ScrollArea.Autosize pt={"xs"} mah={200} type="scroll">
              {options.length > 0 ? (
                <>{options}</>
              ) : (
                <Combobox.Empty>{t("empty")}</Combobox.Empty>
              )}
            </ScrollArea.Autosize>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    )
  }
)

export default SelectDropdownSearch
