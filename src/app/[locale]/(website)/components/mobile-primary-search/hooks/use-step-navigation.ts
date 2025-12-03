import { useCallback } from "react"
import { UseFormReturnType } from "@mantine/form"
import { SEARCH_STEPS } from "../constants"
import { FormValues, TransformedValues } from "../search-contexts"

type Form = UseFormReturnType<FormValues, TransformedValues>

/**
 * Custom hook for managing step navigation in mobile search
 */
export const useStepNavigation = (form: Form) => {
  const currentStep = form.values.step

  const goToNextStep = useCallback(() => {
    if (currentStep < SEARCH_STEPS.DATE) {
      form.setFieldValue("step", currentStep + 1)
    }
  }, [form, currentStep])

  const goToPreviousStep = useCallback(() => {
    if (currentStep > SEARCH_STEPS.CITY) {
      form.setFieldValue("step", currentStep - 1)
    }
  }, [form, currentStep])

  const resetToFirstStep = useCallback(() => {
    form.setFieldValue("step", SEARCH_STEPS.CITY)
  }, [form])

  const isFirstStep = currentStep === SEARCH_STEPS.CITY
  const isLastStep = currentStep === SEARCH_STEPS.DATE

  return {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    resetToFirstStep,
    isFirstStep,
    isLastStep,
  }
}
