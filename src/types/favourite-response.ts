export interface FavouriteResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  favourites: Favourite[]
  from: number
  to: number
  total: number
  per_page: number
  current_page: number
  last_page: number
  next_page_url: null
  previous_page_url: null
}

export interface Favourite {
  id: number
  slug: string
  code: string
  name: string
  views: number | null
  link: string
  description: string
  stars: string
  reviews_count: number
  reviews_count_text: string
  province: string
  city: string
  region: string
  area: string
  location: string
  unit_for: Badge[]
  unit_content: UnitContent[]
  unit_type: string
  is_favourite: boolean
  label: Label | null
  dates_suggestions: null
  badge: Badge
  prices: null
  tabby_enabled: boolean
  images: Image[]
}

export interface Badge {
  text: string
  color: string
  bg_color: string
  border_color?: string
  icon: string
  icon_svg?: string
}

export interface Image {
  image_path: string
  caption: string
  alt: string
}

export interface Label {
  text: string
  type: string
  bg_color: string
}

export interface UnitContent {
  key: string
  count: string
  icon: string
  icon_svg: string
}

export interface SearchData {
  city: City
  dates: string
  duration: string
  timer: null
  offer: null
}

export interface City {
  id: number
  name: string
}

export interface Badge {
  text: string
  color: string
  bg_color: string
  icon: string
  icon_svg?: string
}

export interface Image {
  image_path: string
  caption: string
}
