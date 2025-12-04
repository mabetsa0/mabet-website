export interface PaymentResponse {
  data: {
    redirect_url: string
  }
  message: null
  success: boolean
}
export interface MadfuResponse {
  data: {
    image: string
    amount: string
    order_id: number
    invoice_code: string
  }
  message: null
  success: boolean
}
