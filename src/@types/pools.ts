export interface PoolsTypeResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  amenities: Pools[]
}

export interface Pools {
  id: number
  name: string
  image_url: null
}
