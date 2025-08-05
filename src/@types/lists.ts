export interface FacilitiesResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  facilities: Facility[]
}

export interface Facility {
  id: number
  name: string
  image: string
}

export interface ProvincesResponse {
  data: {
    provinces: Province[]
  }
  message: null
  success: boolean
}

export interface Province {
  id: number | string
  name: string
  image: string
  units_count: number
  units_count_text: string
}

export interface UnitTypesResponse {
  data: {
    unit_types: UnitType[]
  }
  message: null
  success: boolean
}

export interface UnitType {
  id: number | string
  name: string
  image: string
  slug: string
  units_count: number
  units_count_text: string
}

export interface CitiesResponse {
  data: {
    cities: City[]
  }
  message: null
  success: boolean
}

export interface City {
  id: number | string
  name: string
  image: string
  units_count: number
  units_count_text: string
  province: {
    id: number | string
    name: null | string
  }
}

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

export interface City {
  id: string | number
  name: string
}
