import { apiV2_1 } from "@/services"
import { PaymentSummaryResponse } from "./payment-summary"

export const GetPaymentSummary = async (
  bookingCode: string,
  params?: URLSearchParams | Record<string, string | number | undefined>
) => {
  const response = await apiV2_1.get<PaymentSummaryResponse>(
    `/payment/${bookingCode}/summary`,
    { params }
  )
  return response.data.data
}
