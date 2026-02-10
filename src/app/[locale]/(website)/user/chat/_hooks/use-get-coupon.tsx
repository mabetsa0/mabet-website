"use client"

import { useQuery } from "@tanstack/react-query"
import { getCoupon } from "../_services/get-coupon"

export const useGetCoupon = (coupon: string) => {
  return useQuery({
    queryKey: ["coupon-info", coupon],
    queryFn: async () => {
      const response = getCoupon(coupon)
      return response
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
