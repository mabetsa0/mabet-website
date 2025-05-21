export interface UnitResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  unit: FullUnitData
}

export interface FullUnitData {
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
  coupon: null
  badge: null
  stars: string
  reviews_count: number
  reviews_count_text: string
  unit_type: string
  checkin: string
  checkout: string
  currency: string
  unit_for_sentence: string
  unit_for: UnitFor[]
  details: string
  unit_content: UnitContent[]
  counts: Counts
  has_videos: boolean
  features: Feature[]
  chat_allowed: boolean
  response_rate: string
  tabby: Madfu
  madfu: Madfu
  reviews: Reviews
  images: Image[]
  cancellation_policy: CancellationPolicy
  licence: Licence
  insurance: number
}

export interface CancellationPolicy {
  title: string
  description: string
}

export interface Counts {
  room_count: number
  receptions_count: number
  toilets_count: number
  pools_count: number
  kitchens_count: number
}

export interface Feature {
  name: string
  icon: string
  icon_svg: string
  list: string[]
  id?: number
}

export interface Image {
  image_path: string
  caption: string
  alt: string
}

export interface Licence {
  license_text: string
}

export interface Madfu {
  enabled: boolean
  tabby_text: string
}

export interface Partner {
  id: number
  name: string
  stars: string
  reviews_count: number
  reviews_count_text: string
}

export interface Reviews {
  heading: string
  reviews: Review[]
}

export interface Review {
  id: number
  stars: string
  name: string
  description: string
}

export interface UnitContent {
  key: string
  count: string
  icon: string
  icon_svg: string
}

export interface UnitFor {
  text: string
  icon: string
  icon_svg: string
  color: string
  bg_color: string
}

export interface UnitAvailabilityResponse {
  data: {
    prices: Prices
  }
  message: null
  success: boolean
}

export interface Prices {
  from: string
  to: string
  min_stay: number
  duration: number
  duration_count: string
  coupon: null
  coupon_id: null
  discount_percent: null
  discount_text: null
  discount: number
  customer_fees: string
  customer_taxes: number
  price_before: string
  price_before_plain: number
  price: string
  price_plain: number
  insurance: number
  total_before: string
  total_before_plain: number
  sub_total: string
  sub_total_plain: number
  down_payment_percentage: number
  down_payment_percent: number
  down_payment_before: string
  down_payment_before_plain: number
  down_payment: number
  down_payment_plain: number
  pre_down_payment: string
  total: string
  total_plain: number
  profit: number
  profit_taxes: number
  profit_percentage: number
  timer: null
  from_text: string
  to_text: string
  additional_receipt_params: unknown[]
  saved_text: string
  additional_amount: string
  additionals: unknown[]
  discount_amount: null
  discount_amount_text: null
  discount_percent_text: null
  down_payment_text: string
  duration_text: string
  full_payment: string
  full_payment_text: string
  marketing_id: string
  marketing_profit_percent: number
  show_down_payment: boolean
  sub_price: string
  sub_price_text: string
}

export interface BusyDaysResponse {
  data: {
    closed_dates: ClosedDate[]
  }
  message: null
  success: boolean
}

export interface ClosedDate {
  date: string
  type: string
  min_stay: number
  message: string
}
