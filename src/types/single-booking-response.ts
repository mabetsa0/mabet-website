export interface SingleBookingResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  bookings: Bookings
}

export interface Bookings {
  id: string
  real_id: number
  fake_id: number
  payment_method: string
  unit_name: string
  unit_code: string
  city_name: string
  province_name: string
  unit_link: string
  booking_link: string
  from_date: string
  from_date_hijri: string
  from_time: string
  to_date: string
  to_date_hijri: string
  to_time: string
  nights_count: number
  night_price: number
  nights: string
  insurance: number
  partner_name: string
  partner_email: string
  partner_phone: string
  status: null
  total: number
  profit: number
  customer_fees: string
  down_payment: number
  paid: string
  remainder: number
  pdf_link: string
  partner_id: number
  unit: Unit
}

export interface Unit {
  id: number
  unit_link: string
  slug: string
  unit_name: string
  unit_code: string
  province: string
  city: string
  region: string
  unit_area: string
  location: null
  latitude: number
  longitude: number
  insurance: number
  unit_for: string
  details: string
  room_count: number
  receptions_count: number
  toilets_count: number
  pools_count: number
  kitchens_count: number
  video_url: string
  has_video: boolean
  unit_type: string
  is_special: boolean
  is_favourite: boolean
  checkin: string
  checkout: string
  views: number
  rating: number
  rating_count: null
  rating_plain: string
  terms: string[]
  features: Feature[]
  facilities: Facility[]
  chat_allowed: boolean
  response_rate: string
  mla: string
  mlg: string
  tabby: Tabby
  image_path: string
  images: Image[]
}

export interface Facility {
  id: number
  name_ar: string
  name_en: string
  icon: string
  created_at: Date | null
  updated_at: Date
  pivot: Pivot
}

export interface Pivot {
  unit_id: number
  facility_id: number
}

export interface Feature {
  name: string
  icon: string
  list: string[]
  id?: number
  icon_url?: string
}

export interface Image {
  image_path: string
  caption: string
}

export interface Tabby {
  enabled: boolean
  tabby_text: null
}
