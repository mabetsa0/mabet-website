export interface CitiesResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  cities: City[]
}

export interface City {
  id: number
  name: string
  image: string
  image_alt: string
  units_count: number
  units_count_text: string
  lat: number
  lng: number
  province: Province
}

export interface Province {
  id: number
  name: string
}
