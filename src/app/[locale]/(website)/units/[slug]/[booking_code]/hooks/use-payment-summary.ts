import { useParams } from "next/navigation"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs"
import { useSession } from "@/stores/session-store"
import { getIsPrivate } from "@/utils/get-is-private"
import { GetPaymentSummary } from "../get-payment-summary"

export const usePaymentSummary = (booking_code: string) => {
  const { isAuthenticated } = useSession()
  const params = useParams() as { slug: string }

  const [{ method, coupon, use_qitaf_points, earn_qitaf_points }] =
    useQueryStates({
      method: parseAsString.withDefault("card"),
      coupon: parseAsString.withDefault(""),
      use_qitaf_points: parseAsBoolean.withDefault(false),
      earn_qitaf_points: parseAsBoolean.withDefault(false),
    })
  const isPrivate = getIsPrivate(params.slug)
  const query = useQuery({
    enabled: isAuthenticated,
    queryKey: [
      booking_code,
      method,
      coupon,
      use_qitaf_points,
      earn_qitaf_points,
    ],
    queryFn: () =>
      GetPaymentSummary(booking_code, {
        payment_method: method,
        private: isPrivate ? "1" : undefined,
        coupon: coupon ?? undefined,
        use_qitaf_points: use_qitaf_points ? "1" : undefined,
        earn_qitaf_points: earn_qitaf_points ? "1" : undefined,
      }),
    placeholderData: keepPreviousData,
  })

  return query
}
