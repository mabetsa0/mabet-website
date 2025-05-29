export interface AvailabilityResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  prices: Prices
}

export interface Prices {
  from: Date
  to: Date
  min_stay: number
  duration: number
  duration_text: string
  coupon: null
  coupon_id: null
  discount_amount: null
  discount_amount_text: null
  discount_percent: string
  discount_percent_text: string
  discount_text: string
  discount: number
  customer_fees: string
  customer_taxes: number
  sub_price: string
  sub_price_text: number
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
  timer: null
  from_text: string
  to_text: string
}
