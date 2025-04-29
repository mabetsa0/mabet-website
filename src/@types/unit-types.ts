export interface UnitTypesResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  unit_types: UnitType[]
}

export interface UnitType {
  id: number
  name: string
  image: string
  image_alt: string
  units_count: number
  units_count_text: string
}
