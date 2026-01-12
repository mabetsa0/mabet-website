import { CouponResponse } from "../_types/coupon-response"
import { mainApi } from "./axios"

export const getCoupon = async (coupon: string) => {
  const response = await mainApi.get<CouponResponse>(
    `/shareable/coupons/${coupon}`
  )

  return response.data.data
}
