export interface ReviewsResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  statics: Static[]
  reviews: {
    id: number
    name: string
    stars: number
    comment: string | null
  }[]
  from: null
  to: null
  total: number
  per_page: number
  current_page: number
  last_page: number
  next_page_url: null
  previous_page_url: null
}

export interface Static {
  name: string
  stars: string
  color: string
  bg_color: string
  icon: string
}
