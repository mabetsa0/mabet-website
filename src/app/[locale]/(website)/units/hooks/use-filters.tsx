import React from "react"
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
} from "nuqs"

const useFilters = () => {
  return useQueryStates({
    city_id: parseAsString.withDefault(""),
    region_id: parseAsString.withDefault(""),
    direction_id: parseAsString.withDefault(""),
    unit_query: parseAsString.withDefault(""),
    unit_type_id: parseAsString.withDefault(""),
    unit_for: parseAsString.withDefault(""),
    priceFrom: parseAsInteger.withDefault(50),
    priceTo: parseAsInteger.withDefault(6000),
    load_offers: parseAsStringLiteral(["1"]),
    last_hour_offer: parseAsStringLiteral(["1"]),
    "rating[]": parseAsArrayOf(parseAsString).withDefault([""]),
    "facilities[]": parseAsArrayOf(parseAsString).withDefault([""]),
    "amenities[]": parseAsArrayOf(parseAsString).withDefault([""]),
    show_only_available: parseAsStringLiteral(["1"]),
    single_beds_count: parseAsInteger.withDefault(0),
    master_beds_count: parseAsInteger.withDefault(0),
    no_insurance: parseAsStringLiteral(["1"]),
    free_cancellation: parseAsStringLiteral(["1"]),
    rooms_count: parseAsInteger.withDefault(0),
    result_type: parseAsString.withDefault("Default"),
    page: parseAsInteger.withDefault(1),
  })
}

export default useFilters
