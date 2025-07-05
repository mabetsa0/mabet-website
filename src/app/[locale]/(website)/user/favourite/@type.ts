import { Unit } from "@/@types"

export interface FavouritesResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  favourites: Unit[]
  from: number
  to: number
  total: number
  per_page: number
  current_page: number
  last_page: number
  next_page_url: null
  previous_page_url: null
}
