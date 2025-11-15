/* eslint-disable @next/next/no-img-element */
"use client"
import { useCallback, useMemo, useState } from "react"
import { useTranslations } from "next-intl"
import {
  Button,
  ScrollArea,
  Stack,
  TextInput,
  UnstyledButton,
} from "@mantine/core"
import "dayjs/locale/ar"
import { Check, Search } from "lucide-react"
import { useCities } from "@/context/global-data-context"
import { useFormContext } from "./search-contexts"

const CitiesFilter = () => {
  const cities = useCities()
  const form = useFormContext()
  const t = useTranslations("general")
  const [search, setSearch] = useState("")

  const currentCityId = form.values.city_id
  const isAllCitiesSelected = currentCityId === "0"

  // Memoize filtered cities to avoid recalculating on every render
  const filteredCities = useMemo(() => {
    if (!search.trim()) {
      return cities
    }

    const searchLower = search.toLowerCase().trim()
    return cities.filter((city) =>
      city.name.toLowerCase().includes(searchLower)
    )
  }, [cities, search])

  // Memoize handlers to prevent unnecessary re-renders
  const handleCitySelect = useCallback(
    (cityId: string) => {
      form.setFieldValue("city_id", cityId)
    },
    [form]
  )

  const handleContinue = useCallback(() => {
    form.setFieldValue("step", 1)
  }, [form])

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.currentTarget.value)
    },
    []
  )

  return (
    <Stack>
      <TextInput
        variant="default"
        value={search}
        leftSection={<Search size={18} className="text-primary" />}
        classNames={{
          input: "border border-gray-300 rounded-[30px] h-[50px]",
        }}
        onChange={handleSearchChange}
        placeholder={t("city-search-placeholder")}
      />
      <ScrollArea.Autosize h="50vh">
        <Stack gap="xs">
          <UnstyledButton
            className="py-xs gap-xs flex"
            onClick={() => handleCitySelect("0")}
          >
            {isAllCitiesSelected && <Check size={18} color="#767676" />}
            {t("all-cities")}
          </UnstyledButton>
          {filteredCities.map((city) => {
            const cityIdStr = String(city.id)
            const isSelected = currentCityId === cityIdStr
            return (
              <UnstyledButton
                key={city.id}
                className="py-xs gap-xs flex"
                onClick={() => handleCitySelect(cityIdStr)}
              >
                {isSelected && <Check size={18} color="#767676" />}
                {city.name}
              </UnstyledButton>
            )
          })}
        </Stack>
      </ScrollArea.Autosize>
      <Button onClick={handleContinue}>{t("continue")}</Button>
    </Stack>
  )
}

export default CitiesFilter
