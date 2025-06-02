export type SearchParams = {
  city_id?: string
  region_id?: string
  direction_id?: string
  unit_query?: string
  unit_type_id?: string[]
  unit_for?: string
  priceFrom?: string
  priceTo?: string
  load_offers?: "1" | null
  last_hour_offer?: "1" | null
  rating?: string[]
  facilities?: string[]
  amenities?: string[]
  show_only_available?: "1" | null
  offer_id?: string
  mabet_selection?: string[]
  single_beds_count?: string
  master_beds_count?: string
  receptions_count?: string
  main_receptions_count?: string
  additional_receptions_count?: string
  toilets_count?: string
  external_receptions_count?: string
  pools_count?: string
  kitchens_count?: string
  table_seats_count?: string
  last_hours_offer?: string
  areaFrom?: string
  areaTo?: string
  hour_in_before?: string
  hour_out_after?: string
  no_insurance?: string
  free_cancellation?: string
  page?: string
  rooms_count?: string
  result_type?: string
  from?: string // ISO date string: 'YYYY-MM-DD'
  to?: string // ISO date string: 'YYYY-MM-DD'
}

export const countAppliedFilters = (params: URLSearchParams): number => {
  let count = 0

  // Helper function to check if a value should be counted
  const shouldCount = (value: string | string[]): boolean => {
    if (Array.isArray(value)) {
      return value.length > 0
    }
    return value !== undefined && value !== null && value !== ""
  }

  // Get all unique parameter keys
  const keys = Array.from(new Set(params.keys()))

  // Count each applied parameter
  keys.forEach((key) => {
    // Skip pagination parameter and date parameters
    if (key === "page" || key === "from" || key === "to") return

    // Handle price range as a single filter if both values are present
    if (
      (key === "priceFrom" || key === "priceTo") &&
      params.has("priceFrom") &&
      params.has("priceTo")
    ) {
      if (key === "priceFrom") count++
      return
    }

    // Handle area range as a single filter if both values are present
    if (
      (key === "areaFrom" || key === "areaTo") &&
      params.has("areaFrom") &&
      params.has("areaTo")
    ) {
      if (key === "areaFrom") count++
      return
    }

    // Handle array parameters (they appear multiple times in URLSearchParams)
    const values = params.getAll(key)
    if (values.length > 1) {
      if (shouldCount(values)) count++
      return
    }

    // Handle single value parameters
    const value = params.get(key)
    if (value && shouldCount(value)) {
      count++
    }
  })

  return count
}
