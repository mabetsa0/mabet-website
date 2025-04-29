import React from "react"
import Mabet from "."
import { CitiesResponse } from "@/@types/cities"
import { UnitTypesResponse } from "@/@types/unit-types"

export const getCities = React.cache(async () => {
  const response = await Mabet.get<CitiesResponse>(
    "/location/cities?show_image=1&show_count=1&sort_by=units_count&sort_order=desc"
  )
  return response.data.data.cities
})

export const getUnitTypes = React.cache(async () => {
  const response = await Mabet.get<UnitTypesResponse>(
    `/lists/unit-types?show_image=1&show_count=1&sort_by=units_count&sort_order=desc`
  )
  return response.data.data.unit_types
})
