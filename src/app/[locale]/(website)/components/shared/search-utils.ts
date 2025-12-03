import { ReadonlyURLSearchParams } from "next/navigation"
import dayjs from "dayjs"

/**
 * Shared constants for search functionality
 */
export const DEFAULT_CITY_ID = "0"
export const DATE_FORMAT = "YYYY-MM-DD"

/**
 * Form values type for search forms
 */
export type SearchFormValues = {
  city_id: string
  unit_type_id: string
  dates: [Date | null, Date | null]
}

/**
 * Transformed values for URL search params
 */
export type TransformedSearchValues = {
  city_id: string
  unit_type_id: string
  from: string
  to: string
}

/**
 * Get initial form values from URL search params
 */
export const getInitialSearchFormValues = (
  searchParams: ReadonlyURLSearchParams
): SearchFormValues => {
  const fromParam = searchParams.get("from")
  const toParam = searchParams.get("to")

  return {
    city_id: searchParams.get("city_id") || DEFAULT_CITY_ID,
    unit_type_id: searchParams.get("unit_type_id") || "",
    dates: [
      fromParam ? new Date(fromParam) : dayjs().toDate(),
      toParam ? new Date(toParam) : dayjs().add(1, "day").toDate(),
    ],
  }
}

/**
 * Transform form values to search params format
 */
export const transformSearchFormValues = (
  values: SearchFormValues
): TransformedSearchValues => {
  return {
    city_id: values.city_id === DEFAULT_CITY_ID ? "" : values.city_id,
    unit_type_id: values.unit_type_id,
    from: values.dates[0]
      ? dayjs(values.dates[0]).format(DATE_FORMAT)
      : dayjs().format(DATE_FORMAT),
    to: values.dates[1]
      ? dayjs(values.dates[1]).format(DATE_FORMAT)
      : dayjs().add(1, "day").format(DATE_FORMAT),
  }
}

/**
 * Build search URL with transformed values
 */
export const buildSearchUrl = (
  currentParams: ReadonlyURLSearchParams,
  transformedValues: TransformedSearchValues
): string => {
  const newSearchParams = new URLSearchParams(currentParams)

  Object.entries(transformedValues).forEach(([key, value]) => {
    newSearchParams.delete(key)
    if (value) {
      newSearchParams.append(key, value)
    }
  })

  return `/units?${newSearchParams.toString()}`
}
