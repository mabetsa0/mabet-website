import React, { useState } from "react"
import {
  Combobox,
  Input,
  InputBase,
  InputBaseProps,
  useCombobox,
} from "@mantine/core"
import { useTranslations } from "next-intl"

type Props = {
  data: { value: string; label: string }[]
  onChange?: (value: string) => void
  // onFocus?: () => void
  // onBlur?: () => void
  value?: string
  // label: React.ReactNode
  placeholder: React.ReactNode
  // classNames?: {
  //   input?: string
  //   label?: string
  //   placeholder?: string
  // }
} & InputBaseProps
const SelectDropdownSearch = React.forwardRef<HTMLButtonElement, Props>(
  function Component({ value, onChange, ...props }, ref) {
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
        item.label.toLowerCase().includes(search.toLowerCase().trim())
      )
      .map((item) => (
        <Combobox.Option value={item.value} key={item.value}>
          {item.label}
        </Combobox.Option>
      ))

    const t = useTranslations("general")

    return (
      <Combobox
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
              <Input.Placeholder>{props.placeholder}</Input.Placeholder>
            )}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Search
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Search groceries"
          />
          <Combobox.Options mah={200} style={{ overflowY: "auto" }}>
            {options.length > 0 ? (
              options
            ) : (
              <Combobox.Empty>{t("empty")}</Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    )
  }
)

export default SelectDropdownSearch
