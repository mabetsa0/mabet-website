export interface ReservationsResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  bookings: Booking[]
  from: number
  to: number
  total: number
  per_page: number
  current_page: number
  last_page: number
  next_page_url: null
  previous_page_url: null
}

export interface Booking {
  id: number
  code: string
  track_id: string
  partner: BookingPartner
  badge: StatusClass
  status: StatusClass
  unit: Unit
  total: string
  points: number
  down_payment: string
  checkin: string
  checkin_text: string
  checkin_hijri: string
  checkin_time: string
  checkout: string
  checkout_text: string
  checkout_hijri: string
  checkout_time: string
  arrival_remain: number
  paid: string
  paid_text: string
  remaining: string
  remaining_text: string
  can_add_review: boolean
  can_view_maps: boolean
  maps_link: string
  arrival_instructions: ArrivalInstruction[]
  from: string
  to: string
  duration: number
  night_price: string
  night_price_text: string
  sub_total: string
  sub_total_text: string
  insurance: string
  insurance_text: string
  total_text: string
  customer_fees: string
  customer_fees_text: string
  show_down_payment: boolean
  down_payment_text: string
  full_payment: string
  full_payment_text: string
  cashback: string
  cashback_text: string
  coupon: string
  discount_amount: string
  discount_amount_text: string
  discount: string
  discount_text: string
  discount_percent: string
  discount_percent_text: number
  saved_text: string
  additional_receipt_params: AdditionalReceiptParam[]
  wallet: Wallet
}

export interface AdditionalReceiptParam {
  label: string
  value: string
  color: string
}

export interface ArrivalInstruction {
  label: string
  content_type: string
  content: string
}

export interface StatusClass {
  label: string
  color: string
  bg_color: string
}

export interface BookingPartner {
  phone: string
}

export interface Unit {
  id: number
  is_favourite: boolean
  views: number
  partner: UnitPartner
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
  coupon: Coupon
  badge: UnitForClass
  stars: string
  reviews_count: number
  reviews_count_text: string
  unit_type: string
  checkin: string
  checkout: string
  currency: string
  unit_for_sentence: string
  unit_for: UnitForClass[]
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

export interface UnitForClass {
  text: string
  color: string
  bg_color: string
  border_color?: string
  icon: string
  icon_svg: string
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

export interface Coupon {
  id: number
  code: string
  text: string
  color: string
  bg_color: string
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

export interface UnitPartner {
  id: number
  name: string
  stars: string
  reviews_count: number
  reviews_count_text: string
}

export interface Reviews {
  heading: string
  reviews: null
}

export interface UnitContent {
  key: string
  count: string
  icon: string
  icon_svg: string
}

export interface Wallet {
  current_balance: string
  current_balance_text: string
}
