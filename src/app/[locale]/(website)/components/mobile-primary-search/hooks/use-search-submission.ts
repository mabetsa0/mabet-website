import { useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { UseFormReturnType } from "@mantine/form"
import { useRouter } from "@/lib/i18n/navigation"
import { SEARCH_STEPS } from "../constants"
import {
  FormValues,
  TransformedValues,
  TransformedValuesObject,
} from "../search-contexts"
import { buildSearchUrl } from "../utils"

type Form = UseFormReturnType<FormValues, TransformedValues>

/**
 * Custom hook for handling search form submission
 */
export const useSearchSubmission = (form: Form) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleSubmit = useCallback(
    (values: TransformedValuesObject) => {
      const url = buildSearchUrl(searchParams, values)

      form.reset()
      form.setFieldValue("step", SEARCH_STEPS.CITY)
      router.push(url)
    },
    [form, router, searchParams]
  )

  return handleSubmit
}
