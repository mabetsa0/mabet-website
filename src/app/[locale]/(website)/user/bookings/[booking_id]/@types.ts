export interface DetailedBookingResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  bookings: DetailedBooking
}

export interface DetailedBooking {
  id: number
  code: string
  heading: string[]
  can_be_cancelled: boolean
  cancellation_text: string
  cancellation_text_html: string
  can_be_edited: boolean
  can_add_review: boolean
  payment_method: PaymentMethod
  unit: Unit
  booking_link: string
  checkin_text: string
  checkin_hijri: string
  checkin_time: string
  checkout_text: string
  checkout_hijri: string
  checkout_time: string
  nights_count: number
  night_price: string
  nights: string
  insurance: string
  partner: BookingsPartner
  badge: Badge
  total: string
  customer_fees: string
  paid: string
  paid_text: string
  remaining: string
  remaining_text: string
  pdf_link: string
  maps_link: string
  arrival_instructions: ArrivalInstruction[]
  from: Date
  to: Date
  duration: number
  night_price_text: string
  sub_total: string
  sub_total_text: string
  insurance_text: string
  total_text: string
  customer_fees_text: string
  show_down_payment: boolean
  down_payment: string
  down_payment_text: string
  full_payment: string
  full_payment_text: string
  payment_methods: PaymentMethods
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
  additional_receipt_params: any[]
  wallet: Wallet
  support: Support
}

export interface ArrivalInstruction {
  label: string
  content_type: string
  content: string
}

export interface Badge {
  label: string
  color: string
  bg_color: string
}

export interface BookingsPartner {
  name: string
  phone: string
}

export interface PaymentMethod {
  label: string
  icon: string
  icon_svg: string
  link?: string
}

export interface PaymentMethods {
  track_id: string
  apple_pay: ApplePay
  cards: ApplePay
  tabby: ApplePay
}

export interface ApplePay {
  status: boolean
}

export interface Support {
  label: string
  links: PaymentMethod[]
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
  cancellation_summary: CancellationSummary
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
  images: Image[]
  cancellation_policy: CancellationPolicy
  insurance: number
  terms: string[]
}

export interface CancellationPolicy {
  title: string
  description: string
}

export interface CancellationSummary {
  data: Datum[]
}

export interface Datum {
  title: string
  icon: string
  icon_svg: string
}

export interface Image {
  image_path: string
  caption: string
  alt: string
}

export interface UnitPartner {
  id: number
  name: string
  stars: string
  reviews_count: number
  reviews_count_text: string
}

export interface Wallet {
  current_balance: string
  current_balance_text: string
}
