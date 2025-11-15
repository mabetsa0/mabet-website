"use client"
import { useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Divider } from "@mantine/core"
import dayjs from "dayjs"
import "dayjs/locale/ar"
import durations from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"
import { Drawer } from "vaul"
import "@/app/transition-css.css"
import AutoHeight from "@/components/ui/auto-height"
import { useRouter } from "@/lib/i18n/navigation"
import CitiesFilter from "./cities-filter"
import { DrawerHeader } from "./components/drawer-header"
import { StepIndicator } from "./components/step-indicator"
import { StepTransition } from "./components/step-transition"
import { DRAWER_STYLES, SEARCH_STEPS } from "./constants"
import DateFilter from "./date-filter"
import { useMobileSearchForm } from "./hooks/use-mobile-search-form"
import { useSearchSubmission } from "./hooks/use-search-submission"
import { useStepNavigation } from "./hooks/use-step-navigation"
import { FormProvider, TransformedValuesObject } from "./search-contexts"
import UnitTypeFilter from "./unit-type-filter"
import { buildSearchUrl } from "./utils"

dayjs.extend(durations)
dayjs.extend(relativeTime)

interface MobileSearchProps {
  children: React.ReactNode
}

/**
 * Mobile search component with multi-step form
 * Handles city, unit type, and date selection
 */
const MobileSearch = ({ children }: MobileSearchProps) => {
  const [opened, setOpened] = useState(false)
  const form = useMobileSearchForm()
  const { currentStep, goToPreviousStep, resetToFirstStep } =
    useStepNavigation(form)

  const searchParams = useSearchParams()
  const router = useRouter()

  const handleSubmit = useCallback(
    (values: TransformedValuesObject) => {
      const url = buildSearchUrl(searchParams, values)

      form.reset()
      setOpened(false)
      router.push(url)
    },
    [form, router, searchParams]
  )

  const handleClose = useCallback(() => {
    form.reset()
    resetToFirstStep()
  }, [form, resetToFirstStep])

  const onSubmit = form.onSubmit(handleSubmit)

  const renderStepContent = () => {
    switch (currentStep) {
      case SEARCH_STEPS.CITY:
        return <CitiesFilter />
      case SEARCH_STEPS.UNIT_TYPE:
        return <UnitTypeFilter />
      case SEARCH_STEPS.DATE:
        return <DateFilter />
      default:
        return null
    }
  }

  return (
    <Drawer.Root
      onOpenChange={(value) => {
        form.setFieldValue("step", SEARCH_STEPS.CITY)
        setOpened(value)
      }}
      open={opened}
      onClose={handleClose}
    >
      <Drawer.Trigger className="w-full">{children}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay
          className="fixed inset-0 bg-black/40"
          style={{ zIndex: DRAWER_STYLES.OVERLAY_Z_INDEX }}
        />
        <Drawer.Content
          className="fixed right-0 bottom-0 left-0 h-fit outline-none"
          style={{ zIndex: DRAWER_STYLES.CONTENT_Z_INDEX }}
        >
          <div className="overflow-hidden rounded-t-lg bg-white px-1 pb-1">
            <StepIndicator />
            <DrawerHeader step={currentStep} onBack={goToPreviousStep} />
            <Divider />
            <AutoHeight>
              <FormProvider form={form}>
                <form onSubmit={onSubmit}>
                  <StepTransition step={currentStep}>
                    {renderStepContent()}
                  </StepTransition>
                </form>
              </FormProvider>
            </AutoHeight>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default MobileSearch
