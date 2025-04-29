export interface UnitsResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  units: Unit[]
}

export interface Unit {
  id: number
  slug: string
  code: string
  name: string
  views: number
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
  unit_for_sentence: string
  unit_for: Badge[]
  unit_content: UnitContent[]
  unit_type: string
  is_favourite: boolean
  label: null
  dates_suggestions: any[]
  badge: Badge
  prices: Prices
  tabby_enabled: boolean
  madfu_enabled: boolean
  images: Image[]
}

export interface Badge {
  text: string
  color: string
  bg_color: string
  border_color?: string
  icon: string
  icon_svg: string
}

export interface Image {
  image_path: string
  caption: string
  alt: string
}

export interface Prices {
  from: string
  to: string
  min_stay: number
  duration: number
  duration_text: string
  marketing_id: string
  marketing_code: string
  additional_amount: string
  marketing_profit_percent: number
  coupon: null | string
  coupon_id: null
  discount_amount: null | string
  discount_amount_text: null | string
  discount_percent: string
  discount_percent_text: number | null
  discount_text: null | string
  discount: number
  customer_fees: string
  customer_taxes: number
  sub_price: string
  sub_price_text: string
  price: string
  price_plain: number
  insurance: number
  sub_total: string
  sub_total_plain: number
  show_down_payment: boolean
  down_payment_percentage: number
  down_payment_percent: number
  down_payment_before: string
  down_payment_before_plain: number
  down_payment: string
  down_payment_text: string
  total: string
  total_plain: number
  full_payment: string
  full_payment_text: string
  profit: number
  profit_taxes: number
  profit_percentage: number
  additionals: any[]
  timer: number | null
}

export interface UnitContent {
  key: string
  count: string
  icon: string
  icon_svg: string
}
