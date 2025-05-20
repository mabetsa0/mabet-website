import { Unit } from "@/@types"

export interface SearchResultsResponse {
  data: {
    search_data: SearchData
    data: Unit[]
    from: number
    to: number
    total: number
    per_page: number
    current_page: number
    last_page: number
    next_page_url: string
    previous_page_url: null
  }
  message: null
  success: boolean
}

export interface Image {
  image_path: string
  caption: string
  alt: string
}

export interface SearchData {
  city: null
  dates: string
  duration: string
  timer: null
  offer: null
}
