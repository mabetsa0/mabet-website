/* eslint-disable @next/next/no-img-element */
"use client"
import { memo, useCallback, useMemo } from "react"
import { useTranslations } from "next-intl"
import { Button, Group, Radio, SimpleGrid, Stack, Text } from "@mantine/core"
import "dayjs/locale/ar"
import { UnitType } from "@/@types/unit-types"
import { UnitTypeIcons } from "@/assets"
import { useUnitTypes } from "@/context/global-data-context"
import { useFormContext } from "./search-contexts"

interface UnitTypeCardProps {
  type: UnitType
}

// Constants
const GRID_COLS = 2
const ICON_SIZE = 35

// Helper function to safely get unit type icon
const getUnitTypeIcon = (typeId: number): string | undefined => {
  const iconKey = String(typeId) as keyof typeof UnitTypeIcons
  return UnitTypeIcons[iconKey]
}

// Memoized unit type card component to prevent unnecessary re-renders
const UnitTypeCard = memo(({ type }: UnitTypeCardProps) => {
  const iconSrc = useMemo(() => getUnitTypeIcon(type.id), [type.id])

  return (
    <Radio.Card
      radius="md"
      value={String(type.id)}
      className="group data-[checked]:border-primary relative px-1.5 py-1.5 duration-300 data-[checked]:bg-[#18807826]"
      aria-label={type.name}
    >
      <Group wrap="nowrap" align="flex-start">
        <Radio.Indicator className="absolute opacity-0" />
        <Stack gap="xs" ta="center">
          {iconSrc && (
            <img
              height={ICON_SIZE}
              width={ICON_SIZE}
              className="mx-auto"
              src={iconSrc}
              alt={type.name}
              loading="lazy"
            />
          )}
          <Text
            fz="sm"
            fw={700}
            className="group-data-[checked]:text-primary whitespace-break-spaces duration-300"
          >
            {type.name.replace(",", ", ")}
          </Text>
        </Stack>
      </Group>
    </Radio.Card>
  )
})

UnitTypeCard.displayName = "UnitTypeCard"

const UnitTypeFilter = () => {
  const unitTypes = useUnitTypes()
  const form = useFormContext()
  const t = useTranslations("general")

  // Memoize unit type cards to prevent unnecessary re-renders
  const unitTypeCards = useMemo(
    () => unitTypes.map((type) => <UnitTypeCard key={type.id} type={type} />),
    [unitTypes]
  )

  // Memoize continue handler
  const handleContinue = useCallback(() => {
    form.setFieldValue("step", 2)
  }, [form])

  return (
    <Stack>
      <div className="p-lg">
        <Radio.Group
          key={form.key("unit_type_id")}
          {...form.getInputProps("unit_type_id")}
        >
          <SimpleGrid cols={GRID_COLS}>{unitTypeCards}</SimpleGrid>
        </Radio.Group>
      </div>
      <Button onClick={handleContinue}>{t("continue")}</Button>
    </Stack>
  )
}

export default UnitTypeFilter
