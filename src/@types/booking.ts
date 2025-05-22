export interface CreateBookingResponse {
  data: {
    booking: Booking
  }
  message: null
  success: boolean
}
export interface Booking {
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
  additional_receipt_params: {
    label: string
    value: string
    color: string
  }[]
  wallet: {
    current_balance: string
    current_balance_text: string
  }
}
