import React from "react"
import Mabet from "."
import { CitiesResponse } from "@/@types/cities"
import { UnitTypesResponse } from "@/@types/unit-types"
import { RegionsResponse } from "@/@types/regrions"
import { PoolsTypeResponse } from "@/@types/pools"
import { FacilitiesResponse } from "@/@types/facilities"
import { DirectionsResponse } from "@/@types/directions"

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

export const getRegions = async (cityId: string) => {
  const response = await Mabet.get<RegionsResponse>(
    `/location/regions?sort_by=units_count&sort_order=desc&city_id=${cityId}`
  )
  return response.data
}

export const getPools = async () => {
  const response = await Mabet.get<PoolsTypeResponse>(
    `/lists/amenities?amenity_type=pools`
  )
  return response.data
}
export const getFacilities = async () => {
  const response = await Mabet.get<FacilitiesResponse>(`/lists/facilities`)
  return response.data
}
export const getDirections = async () => {
  const response = await Mabet.get<DirectionsResponse>(`/location/directions`)
  return response.data
}
