export interface PaymentSummaryResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  unit: Unit
  booking_details: BookingDetails
}

export interface BookingDetails {
  id: number
  code: string
  from: Date
  to: Date
  duration: number
  night_price: string
  night_price_text: string
  sub_total: string
  sub_total_text: string
  insurance: string
  insurance_text: string
  total: string
  total_text: string
  customer_fees: string
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
  additional_receipt_params: AdditionalReceiptParam[]
  wallet: Wallet
  to_pay: ToPay
}

export interface AdditionalReceiptParam {
  label: string
  value: string
  color: string
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

export interface ToPay {
  amount: string
  amount_text: string
  can_be_approved: boolean
}

export interface Wallet {
  current_balance: string
  current_balance_text: string
}

export interface Unit {
  id: number
  is_favourite: boolean
  views: number
  partner: Partner
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
  coupon: Coupon
  badge: Badge
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

export interface Badge {
  text: string
  color: string
  bg_color: string
  border_color: string
  icon: string
  icon_svg: string
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

export interface Coupon {
  id: number
  code: string
  text: string
  color: string
  bg_color: string
}

export interface Image {
  image_path: string
  caption: string
  alt: string
}

export interface Partner {
  id: number
  name: string
  stars: string
  reviews_count: number
  reviews_count_text: string
}
