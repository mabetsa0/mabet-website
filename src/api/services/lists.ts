import { cache } from "react"

import {
  CitiesResponse,
  FacilitiesResponse,
  ProvincesResponse,
  RegionsResponse,
  UnitTypesResponse,
} from "@/types/lists"

import Mabeet from ".."

export const getCities = cache(async () => {
  const response = await Mabeet.get<CitiesResponse>(
    "/location/cities?show_image=1&show_count=1&sort_by=units_count&sort_order=desc",
  )
  return response.data
})
export const getProvinces = cache(async () => {
  const response = await Mabeet.get<ProvincesResponse>(
    "/location/provinces?show_image=1&show_count=1&sort_by=units_count&sort_order=desc",
  )
  return response.data
})
export const getRegions = cache(async (cityId: string) => {
  const response = await Mabeet.get<RegionsResponse>(
    `/location/regions?sort_by=units_count&sort_order=desc&city_id=${cityId}`,
  )
  return response.data
})

export const getUnitTypes = cache(async () => {
  const response = await Mabeet.get<UnitTypesResponse>(
    `/lists/unit-types?show_image=1&show_count=1&sort_by=units_count&sort_order=desc`,
  )
  return response.data
})

export const getFacilities = cache(async () => {
  const response = await Mabeet.get<FacilitiesResponse>("lists/facilities?show_image=1")
  return response.data
})
