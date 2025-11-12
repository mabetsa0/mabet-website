/* eslint-disable @next/next/no-img-element */
"use client"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import {
  Button,
  Divider,
  Group,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Text,
} from "@mantine/core"
import { useMutation } from "@tanstack/react-query"
import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs"
import { ErrorResponse } from "@/@types/error"
import { applePay, mada, masterCard, visa } from "@/assets"
import { RiyalIcon } from "@/components/icons"
import Mabet from "@/services"
import { Booking } from "../@types"

interface PaymentResponse {
  data: {
    redirect_url: string
  }
  message: null
  success: boolean
}
const paymentCards = [masterCard, mada, visa]
const CompletePayment = (booking: Booking) => {
  const [{ use_wallet }, set] = useQueryStates({
    use_wallet: parseAsStringLiteral(["0"]),
  })
  const t = useTranslations("payment-form")
  const [error, setError] = useState("")
  const Router = useRouter()
  const { mutate, isPending } = useMutation({
    mutationFn: async (args: { use_wallet: string | null }) => {
      const canFulfillFull =
        Number(booking.wallet.current_balance) > Number(booking.remaining)

      if (args.use_wallet === "1" && canFulfillFull) {
        await Mabet.post<PaymentResponse>(`/payment/${booking.code}/approve`, {
          ...args,
          booking_code: booking.code,
        })

        return "/payment?payment_status=success&id=" + booking.code
      }

      const cardPayment = await Mabet.post<PaymentResponse>(
        `/payment/pay-by-card`,
        {
          ...args,
          booking_code: booking.code,
        }
      )

      return cardPayment.data.data.redirect_url
    },
    onError(error) {
      setError(
        (error.response?.data as ErrorResponse).message ||
          (error.response?.data as ErrorResponse).errors?.[0] ||
          error.message
      )
    },
    onMutate() {
      setError("")
    },
    onSuccess(data) {
      Router.push(data || "")
    },
  })

  return (
    <Stack p={"xl"}>
      <Stack gap={"xs"}>
        <h2 className="text-h4 md:text-h5 font-bold">{t("title")}</h2>
        <Text className="text-lg" c={"#767676"}>
          {t("description")}
        </Text>
      </Stack>
      {Number(booking.wallet?.current_balance) ? (
        <Group wrap="nowrap" align="start" mt={"sm"}>
          <Switch
            checked={!!use_wallet}
            onChange={(e) => {
              set({ use_wallet: e.target.checked ? "1" : null })
            }}
            size="lg"
          />
          <Stack gap={"4"}>
            <Text className="text-xl font-bold">{t("use-wallet")}</Text>
            <Text c={"#767676"}>
              {t("use-wallet-description", {
                value: booking.wallet?.current_balance,
              })}{" "}
              <RiyalIcon />
            </Text>
          </Stack>
        </Group>
      ) : null}
      <Divider />

      <Stack gap={"lg"}>
        <Radio
          defaultChecked
          size="lg"
          value={"card"}
          label={t("card")}
          classNames={{
            label: "font-bold",
            description: "-ms-2.5 mt-1",
          }}
          description={
            <Group component={"span"}>
              {paymentCards.map((card, index) => (
                <span key={index} className="relative h-2 w-3">
                  <img
                    alt={"payment option"}
                    src={card.src}
                    className="absolute inset-0 h-full w-full object-contain"
                    loading="lazy"
                  />
                </span>
              ))}
              <span className="relative h-2 w-3">
                <img
                  alt={"payment option"}
                  src={applePay.src}
                  className="absolute inset-0 h-full w-full object-contain"
                  loading="lazy"
                />
                {/* <span className="text-xs whitespace-nowrap text-black">
                    {t("apple-pay")}
                  </span> */}
              </span>
            </Group>
          }
        />
      </Stack>

      <Stack className="mt-2" gap={"xs"}>
        <Button
          onClick={() => {
            mutate({
              use_wallet: use_wallet,
            })
          }}
          loading={isPending}
        >
          {t("unit.pay", { value: booking.full_payment })} <RiyalIcon />
        </Button>
        {error ? (
          <Text c={"red"} ta={"center"}>
            {error}
          </Text>
        ) : null}
      </Stack>
    </Stack>
  )
}

export default CompletePayment
