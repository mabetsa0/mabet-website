"use client"
import { Button, ButtonProps } from "@mantine/core"
import { X } from "lucide-react"
import { parseAsStringLiteral, useQueryState } from "nuqs"

const ToggleFilterButton = ({
  filterKey,
  ...props
}: ButtonProps & { filterKey: string }) => {
  const [show_only_available, set] = useQueryState(
    filterKey,
    parseAsStringLiteral(["1"])
  )
  return (
    <Button
      className={show_only_available ? "border-primary border" : ""}
      color={show_only_available ? "primary" : "dark"}
      variant={show_only_available ? "light" : "outline"}
      onClick={() => {
        set((value) => (value ? null : "1"))
      }}
      rightSection={show_only_available && <X strokeWidth={1.25} />}
      {...props}
    />
  )
}

export default ToggleFilterButton
