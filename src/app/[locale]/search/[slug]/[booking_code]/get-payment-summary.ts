import Mabet from "@/services"
import { PaymentSummaryResponse } from "./payment-summary"

export const GetPaymentSummary = async (bookingCode: string) => {
  const response = await Mabet.get<PaymentSummaryResponse>(
    `/payment/${bookingCode}/summary`
  )
  return response.data.data
}
