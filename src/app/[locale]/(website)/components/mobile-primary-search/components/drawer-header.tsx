"use client"
import { useTranslations } from "next-intl"
import { ActionIcon, Burger, Group } from "@mantine/core"
import { ChevronRight } from "lucide-react"
import { Drawer } from "vaul"
import { SEARCH_STEPS } from "../constants"

interface DrawerHeaderProps {
  step: number
  onBack: () => void
}

/**
 * Drawer header component with navigation controls
 */
export const DrawerHeader = ({ step, onBack }: DrawerHeaderProps) => {
  const t = useTranslations("general")

  const getStepTitle = () => {
    switch (step) {
      case SEARCH_STEPS.CITY:
        return t("select-city")
      case SEARCH_STEPS.UNIT_TYPE:
        return t("select-unitType")
      case SEARCH_STEPS.DATE:
        return t("select-select-search-date")
      default:
        return ""
    }
  }

  return (
    <Drawer.Title className="text-xl font-bold">
      <Group gap="xs" align="center">
        {step === SEARCH_STEPS.CITY ? (
          <Drawer.Close>
            <Burger component="span" opened size="md" />
          </Drawer.Close>
        ) : (
          <div className="py-1">
            <ActionIcon
              onClick={onBack}
              variant="white"
              size="lg"
              aria-label="Go back"
            >
              <ChevronRight className="text-primary ltr:rotate-180" />
            </ActionIcon>
          </div>
        )}
        {getStepTitle()}
      </Group>
    </Drawer.Title>
  )
}
