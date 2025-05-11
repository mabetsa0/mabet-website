import { City } from "./cities"

export interface RegionsResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  districts: Region[]
}

export interface Region {
  id: number
  name: string
  lat: number
  lng: number
  parents: Parents
}

export interface Parents {
  city: City
  province: City
}
