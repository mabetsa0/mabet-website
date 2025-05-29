export type UnitResponse = {
  data: Data
  message: null
  success: boolean
}

export type Data = {
  unit: Unit
}

export type Unit = {
  id: number
  is_favourite: boolean
  views: number
  partner: Partner
  link: string
  slug: string
  name: string
  code: string
  province: string
  city: string
  region: string
  area: string
  location: string
  mla: string
  mlg: string
  insurance: number
  unit_for_sentence: string
  unit_for: Badge[]
  details: string
  unit_content: UnitContent[]
  counts: Counts
  has_videos: boolean
  unit_type: string
  coupon: Coupon
  badge: Badge | null
  checkin: string
  checkout: string
  stars: string
  reviews_count: number
  reviews_count_text: string
  features: Feature[]
  chat_allowed: boolean
  response_rate: string
  tabby: Tabby
  images: Image[]
  reviews: Reviews
  cancellation_policy: CancellationPolicy
  terms?: string[]
  licence: null | {
    license_text: string
  }
}

export type Badge = {
  text: string
  color: string
  bg_color: string
  icon: string
}

export type CancellationPolicy = {
  title: string
  description: string
}

export type Counts = {
  room_count: number
  receptions_count: number
  toilets_count: number
  pools_count: number
  kitchens_count: number
}

export type Coupon = {
  id: number
  code: string
  text: string
  color: string
  bg_color: string
}

export type Feature = {
  name: string
  icon: string
  list: string[]
  id?: number
}

export type Image = {
  image_path: string
  caption: string
}

export type Partner = {
  id: number
  stars: string
  reviews_count: number
  reviews_count_text: string
}

export type Reviews = {
  heading: string
  reviews: Review[]
}

export type Review = {
  id: number
  stars: number
  name: string
  description: string
}

export type Tabby = {
  enabled: boolean
  tabby_text: string
}

export type UnitContent = {
  key: string
  icon: string
  count: number
}
