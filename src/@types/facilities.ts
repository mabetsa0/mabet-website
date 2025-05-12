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
  icon: string
}
