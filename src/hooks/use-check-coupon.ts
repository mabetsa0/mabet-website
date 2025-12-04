import { useMutation } from "@tanstack/react-query"
import { CheckCouponResponse } from "@/@types/check-coupon-response"
import Mabet from "@/services"

export const useCheckCoupon = ({
  unit_id,
  from,
  to,
  onSuccess,
}: {
  unit_id: string
  from: string
  to: string
  onSuccess?: (data: boolean, { coupon }: { coupon: string }) => void
}) => {
  return useMutation({
    async mutationFn({ coupon }: { coupon: string }) {
      const response = await Mabet.post<CheckCouponResponse>(
        `/units/${unit_id}/check-coupon`,
        {
          coupon,
          from: from,
          to: to,
        }
      )

      return response.data.data.valid
    },

    onSuccess(data, { coupon }) {
      onSuccess?.(data, { coupon })
    },
  })
}
