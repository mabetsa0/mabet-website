export interface DirectionsResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  directions: Direction[]
}

export interface Direction {
  id: number
  name: string
}
