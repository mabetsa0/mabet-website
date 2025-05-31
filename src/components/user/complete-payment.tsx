import React, { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Mabeet from "@/api"
import { Button } from "@mantine/core"
import { notifications } from "@mantine/notifications"

type Props = {
  bookingCode: string
}

const completePayment = {
  title: {
    en: "Complete payment",
    ar: " استكمال الدفع",
  },
  subTitle: {
    en: "You will complete the amount due for your reservation.",
    ar: "ستقوم باكمال المبلغ المستحق للحجز الخاص بك  ",
  },
  des: {
    en: "You will be redirected to the payment.",
    ar: "سيتم تحويلك تلقائيا لبوابة الدفع",
  },
}

const CompletePayment = ({ bookingCode }: Props) => {
  const { locale } = useParams() as { locale: "ar" | "en" }
  const isRtl = locale === "ar"
  const [isLoading, setIsLoading] = useState(false)
  const [paymentURL, setPaymentURL] = useState("")
  const [error, setError] = useState("")
  const Router = useRouter()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      interface PaymentResponse {
        data: {
          redirect_url: string
        }
        message: null
        success: boolean
      }
      const cardPayment = await Mabeet.post<PaymentResponse>(
        `/payment/pay-by-card`,
        {
          booking_code: bookingCode,
        }
      )

      const paymentURL = cardPayment.data.data.redirect_url
      setPaymentURL(paymentURL)
      Router.push(paymentURL)
    } catch (error: any) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      setError(error.message)
      notifications.show({
        color: "red",
        title: isRtl ? "حصلت مشكلة ما!" : "Something wrong happened",
        message: isRtl
          ? " عذراً، حصلت مشكلة ما، حاول مجداً"
          : "Sorry, Something wrong happened, try again",
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="my-6 space-y-4 text-center">
        <p className="text-lg font-semibold">
          {completePayment.subTitle[locale]}
        </p>
        <div>
          <Button disabled={!!paymentURL} type="submit" loading={isLoading}>
            {isRtl ? "استكمال الدفع" : "Complete payment"}
          </Button>
          {error ? (
            <span className="block py-1 text-sm text-red-500">{error}</span>
          ) : null}
        </div>

        {paymentURL ? (
          <div>
            <p>
              في حال لم يتم تحويلك لبوابة الدفع يرجى{" "}
              <a
                href={paymentURL}
                target="_blank"
                rel="noopener"
                className="text-primary"
              >
                الضغط هنا
              </a>
            </p>
          </div>
        ) : null}
      </div>
    </form>
  )
}

export default CompletePayment
