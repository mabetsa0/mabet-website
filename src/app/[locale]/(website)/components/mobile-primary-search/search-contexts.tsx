import { createFormContext } from "@mantine/form"
import type {
  SearchFormValues,
  TransformedSearchValues,
} from "../shared/search-utils"

/**
 * Mobile search form values - extends shared form values with step for navigation
 */
export type FormValues = SearchFormValues & {
  step: number
}

/**
 * Transformed values for URL search params
 * Re-export shared type for consistency
 */
export type TransformedValuesObject = TransformedSearchValues

export type TransformedValues = (values: FormValues) => TransformedValuesObject

const [FormProvider, useFormContext, useForm] = createFormContext<
  FormValues,
  TransformedValues
>()

export { FormProvider, useFormContext, useForm }
