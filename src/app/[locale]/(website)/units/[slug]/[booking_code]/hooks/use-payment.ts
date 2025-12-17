/* eslint-disable @next/next/no-img-element */
"use client"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { MadfuResponse, PaymentResponse } from "@/@types/payment"
import { useRouter } from "@/lib/i18n/navigation"
import Mabet from "@/services"
import { getIsPrivate } from "@/utils/get-is-private"
import { GetPaymentSummary } from "../get-payment-summary"
import { BookingDetails } from "../payment-summary"

const usePayment = ({
  booking_code,
  unit_id,
  booking_details,
}: {
  booking_details: BookingDetails
  booking_code: string
  unit_id: string
}) => {
  const prices = booking_details

  const Router = useRouter()
  const [madfu, setMadfu] = useState("")
  const mutation = useMutation({
    mutationFn: async (args: {
      payment_method: string
      payment_option: string
      use_wallet: string
      coupon: string
    }) => {
      const private_link = getIsPrivate(unit_id)
      await GetPaymentSummary(booking_code, {
        ...args,
        private: private_link ? 1 : undefined,
      })
      let paymentURL = ""

      const canFullfilPartial =
        args.payment_option === "partial" &&
        Number(prices.wallet.current_balance) > Number(prices.full_payment)

      const canFulfillFull =
        args.payment_option === "full" &&
        Number(prices.wallet.current_balance) > Number(prices.full_payment)

      if (args.use_wallet === "1" && (canFullfilPartial || canFulfillFull)) {
        await Mabet.post<PaymentResponse>(`/payment/${booking_code}/approve`, {
          ...args,
          booking_code: booking_code,
          private: private_link ? 1 : undefined,
        })

        return "/payment?payment_status=success&id=" + booking_code
      }

      if (args.payment_method === "card") {
        const cardPayment = await Mabet.post<PaymentResponse>(
          `/payment/pay-by-card`,
          {
            ...args,
            booking_code: booking_code,
            private: private_link ? 1 : undefined,
          }
        )

        paymentURL = cardPayment.data.data.redirect_url
      }
      if (args.payment_method === "tabby") {
        const tabbyPayment = await Mabet.get<PaymentResponse>(
          `/payment/${booking_code}/pay-by-tabby`,
          {
            params: {
              use_wallet: args.use_wallet,
              coupon: args.coupon,
              private: private_link ? 1 : undefined,
            },
          }
        )
        paymentURL = tabbyPayment.data.data.redirect_url
      }

      if (args.payment_method === "madfu") {
        const madfuPayment = await Mabet.get<MadfuResponse>(
          `/payment/${booking_code}/pay-by-madfu`,
          {
            params: {
              use_wallet: args.use_wallet,
              coupon: args.coupon,
              private: private_link ? 1 : undefined,
            },
          }
        )

        paymentURL = madfuPayment.data.data.image
      }

      if (args.payment_method === "tamara") {
        const tamaraPayment = await Mabet.get<PaymentResponse>(
          `/payment/${booking_code}/pay-by-tamara`,
          {
            params: {
              use_wallet: args.use_wallet,
              coupon: args.coupon,
              private: private_link ? 1 : undefined,
            },
          }
        )
        paymentURL = tamaraPayment.data.data.redirect_url
      }

      return paymentURL
    },

    onSuccess(data, variables) {
      if (variables.payment_method === "madfu") {
        setMadfu(data)
        return
      }
      Router.push(data || "")
    },
  })
  return {
    madfu,
    setMadfu,
    ...mutation,
  }
}

export default usePayment
