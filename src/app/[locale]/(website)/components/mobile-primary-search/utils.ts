import { ReadonlyURLSearchParams } from "next/navigation"
import {
  getInitialSearchFormValues,
  transformSearchFormValues,
  buildSearchUrl as buildSharedSearchUrl,
  type SearchFormValues,
} from "../shared/search-utils"
import { FormValues, TransformedValuesObject } from "./search-contexts"

/**
 * Get initial form values from URL search params
 * Extends shared form values with step for mobile navigation
 */
export const getInitialFormValues = (
  searchParams: ReadonlyURLSearchParams
): FormValues => {
  const baseValues = getInitialSearchFormValues(searchParams)
  return {
    ...baseValues,
    step: 0,
  }
}

/**
 * Transform form values to search params format
 * Uses shared transformation logic
 */
export const transformFormValues = (
  values: FormValues
): TransformedValuesObject => {
  const baseValues: SearchFormValues = {
    city_id: values.city_id,
    unit_type_id: values.unit_type_id,
    dates: values.dates,
  }
  return transformSearchFormValues(baseValues)
}

/**
 * Build search URL with transformed values
 * Uses shared URL building logic
 */
export const buildSearchUrl = (
  currentParams: ReadonlyURLSearchParams,
  transformedValues: TransformedValuesObject
): string => {
  return buildSharedSearchUrl(currentParams, transformedValues)
}
