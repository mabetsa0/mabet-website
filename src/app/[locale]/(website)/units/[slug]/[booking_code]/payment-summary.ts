import { FullUnitData } from "../@types"

export interface PaymentSummaryResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  unit: FullUnitData
  booking_details: BookingDetails
}

export interface BookingDetails {
  id: number
  code: string
  from: string
  to: string
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
  additional_receipt_params: unknown[]
  wallet: Wallet
  to_pay: ToPay
}

export interface PaymentMethods {
  track_id: string
  apple_pay: PaymentMethodStatus
  cards: PaymentMethodStatus
  tabby: PaymentMethodStatus
  madfu: PaymentMethodStatus
  tamara: PaymentMethodStatus
}

export interface PaymentMethodStatus {
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
