"use client"
import { Button } from "@mantine/core"
import { Building2, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { parseAsStringLiteral, useQueryState } from "nuqs"

const OnlyAvailable = () => {
  const t = useTranslations("search.filter.show_only_available-filter")
  const [show_only_available, set] = useQueryState(
    "show_only_available",
    parseAsStringLiteral(["1"])
  )
  return (
    <Button
      color={show_only_available ? "primary" : "dark"}
      variant={show_only_available ? "light" : "outline"}
      onClick={() => {
        set((value) => (value ? null : "1"))
      }}
      leftSection={<Building2 strokeWidth={1.25} />}
      rightSection={show_only_available && <X strokeWidth={1.25} />}
    >
      {t("button")}
    </Button>
  )
}

export default OnlyAvailable
