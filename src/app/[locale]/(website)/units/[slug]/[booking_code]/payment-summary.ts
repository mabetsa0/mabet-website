import { FullUnitData } from "../@types"

export interface PaymentSummaryResponse {
  data: {
    unit: FullUnitData
    booking_details: BookingDetails
  }
  message: null
  success: boolean
}

export interface BookingDetails {
  id: number
  code: string
  from: string
  to: string
  duration: number
  night_sub_price: string
  night_sub_price_text: string
  night_price: string
  night_price_text: string
  sub_total: string
  sub_total_text: string
  insurance: string
  insurance_text: string
  taxes: number

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
  offers_discount_percent: number
  offers_discount: number
  qitaf_amount_text: string
  saved_text: string
  additional_receipt_params: any[]
  wallet: Wallet
  qitaf_points: QitafPoints
  to_pay: ToPay
}

export interface PaymentMethods {
  track_id: string
  apple_pay: ApplePay
  cards: ApplePay
  tabby: ApplePay
  tamara: ApplePay
  madfu: ApplePay
}

export interface ApplePay {
  status: boolean
}

export interface QitafPoints {
  current_balance: number
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
