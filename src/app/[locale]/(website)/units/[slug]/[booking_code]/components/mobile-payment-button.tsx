/* eslint-disable @next/next/no-img-element */
"use client"
import { Box, Button, Divider, Modal, SimpleGrid, Stack } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useTranslations } from "next-intl"
import { BookingDetails } from "../payment-summary"
import Coupon from "./coupon"
import PaymentForm from "./payment-form"

import { ErrorResponse } from "@/@types/error"
import { RiyalIcon } from "@/components/icons"
import { useRouter } from "@/lib/i18n/navigation"
import Mabet from "@/services"
import { Group, Space, Text } from "@mantine/core"
import { useMutation } from "@tanstack/react-query"
import { X } from "lucide-react"
import { useParams } from "next/navigation"
import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs"
import { useState } from "react"
import { GetPaymentSummary } from "../get-payment-summary"
interface PaymentResponse {
  data: {
    redirect_url: string
  }
  message: null
  success: boolean
}
interface MadfuResponse {
  data: {
    image: string
    amount: string
    order_id: number
    invoice_code: string
  }
  message: null
  success: boolean
}

const MobilePaymentButton = ({
  booking_details,
}: {
  booking_details: BookingDetails
}) => {
  const prices = booking_details
  const [opened, { open, close }] = useDisclosure(false)
  const t = useTranslations()
  const [{ method, use_wallet, payment_option, coupon, isPrivate }] =
    useQueryStates({
      method: parseAsString.withDefault("card"),
      use_wallet: parseAsStringLiteral(["1", "0"]).withDefault("0"),
      payment_option: parseAsStringLiteral(["full", "partial"]).withDefault(
        "partial"
      ),
      coupon: parseAsString.withDefault(""),
      isPrivate: parseAsStringLiteral(["1"]),
    })
  const [error, setError] = useState("")
  const [madfu, setMadfu] = useState("")
  const params = useParams() as { booking_code: string }
  const Router = useRouter()
  const { mutate, isPending } = useMutation({
    mutationFn: async (args: {
      payment_method: string
      payment_option: string
      use_wallet: string
      coupon: string
      isPrivate?: string
    }) => {
      await GetPaymentSummary(params.booking_code, {
        ...args,
        private: isPrivate ? 1 : undefined,
      })
      let paymentURL = ""

      const canFullfilPartial =
        args.payment_option === "partial" &&
        Number(prices.wallet.current_balance) > Number(prices.full_payment)

      const canFulfillFull =
        args.payment_option === "full" &&
        Number(prices.wallet.current_balance) > Number(prices.full_payment)

      if (args.use_wallet === "1" && (canFullfilPartial || canFulfillFull)) {
        const cardPayment = await Mabet.post<PaymentResponse>(
          `/payment/${params.booking_code}/approve`,
          {
            ...args,
            booking_code: params.booking_code,
          }
        )

        return "/payment/success"
      }

      if (args.payment_method === "card") {
        const cardPayment = await Mabet.post<PaymentResponse>(
          `/payment/pay-by-card`,
          {
            ...args,
            booking_code: params.booking_code,
          }
        )

        paymentURL = cardPayment.data.data.redirect_url
      }
      if (args.payment_method === "tabby") {
        const tabbyPayment = await Mabet.get<PaymentResponse>(
          `/payment/${params.booking_code}/pay-by-tabby`,
          {
            params: {
              use_wallet: args.use_wallet,
              coupon: args.coupon,
              private: isPrivate ? 1 : undefined,
            },
          }
        )
        paymentURL = tabbyPayment.data.data.redirect_url
      }

      if (args.payment_method === "madfu") {
        const madfuPayment = await Mabet.get<MadfuResponse>(
          `/payment/${params.booking_code}/pay-by-madfu`,
          {
            params: {
              use_wallet: args.use_wallet,
              coupon: args.coupon,
              private: isPrivate ? 1 : undefined,
            },
          }
        )

        paymentURL = madfuPayment.data.data.image
      }

      // if (args.payment_method === "wallet") {
      //   const walletPayment = await Mabeet.post<PaymentResponse>(
      //     `/payment/${params.booking_code}/approve`,
      //     {
      //       payment_option: data.payment_option,
      //       use_wallet: data.use_wallet ? 1 : 0,
      //       private: isPrivate ? 1 : undefined,
      //       coupon: reservationState.coupon,
      //     }
      //   )

      //   Router.push("/user/reservations?payment_status=success")
      //   return
      // }

      return paymentURL
    },
    onError(error) {
      setError(
        (error.response?.data as { error: { message: string } })?.error
          ?.message ||
          (error.response?.data as ErrorResponse)?.errors?.[0] ||
          error.message
      )
    },
    onMutate() {
      setError("")
    },
    onSuccess(data, variables) {
      if (variables.payment_method === "madfu") {
        setMadfu(data)
        return
      }

      Router.push(data || "")
    },
  })

  return (
    <>
      <Box
        hiddenFrom="md"
        className="fixed bottom-0 inset-x-0 p-xs bg-white z-10  [box-shadow:_0px_-16px_40px_0px_#0000001F]"
      >
        <Button onClick={open} fullWidth>
          {t("unit.mobile-payment-button")}
        </Button>
      </Box>
      <Modal fullScreen opened={opened} onClose={close}>
        <Stack>
          <PaymentForm {...booking_details} />
          <Divider />
          <Coupon from={prices.from} to={prices.to} />
          <Divider />
          {prices ? (
            <Box>
              <Stack>
                <SimpleGrid cols={2}>
                  <Group gap={"3"}>
                    {prices.duration}{" "}
                    <X className="text-primary" strokeWidth={4} size={20} />{" "}
                    <Text fw={500}>
                      {prices.night_price} <RiyalIcon />
                    </Text>
                  </Group>
                  <Text ta="end" c="#767676">
                    <span className="text-primary">{prices.total}</span>
                    <RiyalIcon />
                  </Text>
                </SimpleGrid>

                {prices.discount ? (
                  <SimpleGrid cols={2}>
                    <Group gap={3}>
                      <Text fw={500}>{t("general.discount")}</Text>
                      <div className="w-[39px] rounded text-xs text-[#E8123D] font-bold h-[39px] flex items-center justify-center bg-[#E8123D26] shrink-0">
                        {prices.discount_percent}
                      </div>
                    </Group>

                    <Text ta="end" c="red">
                      - {prices.discount_amount}
                      <RiyalIcon />
                    </Text>
                  </SimpleGrid>
                ) : null}
                <SimpleGrid cols={2}>
                  <Text>{t("general.customer-fees")}</Text>

                  <Text ta="end" c="#767676">
                    {(
                      parseFloat(prices.customer_fees) +
                      Number(prices.customer_fees)
                    ).toFixed(2)}
                    <RiyalIcon />
                  </Text>
                </SimpleGrid>
                <Divider />
                <SimpleGrid cols={2}>
                  <Text fw={700}>{t("general.total-price")}</Text>

                  <Text ta="end" fw={700}>
                    {prices.full_payment}
                    <RiyalIcon />
                  </Text>
                </SimpleGrid>
                <Space />
                <Space />
                <Button
                  onClick={() => {
                    mutate({
                      payment_method: method,
                      use_wallet: use_wallet,
                      payment_option,
                      coupon,
                      isPrivate: isPrivate ? "1" : undefined,
                    })
                  }}
                  loading={isPending}
                >
                  {t("unit.pay", { value: prices.full_payment })}
                </Button>
                {error ? (
                  <Text c={"red"} ta={"center"}>
                    {error}
                  </Text>
                ) : null}
              </Stack>
            </Box>
          ) : null}
        </Stack>
      </Modal>
      <Modal
        centered
        size={"md"}
        title={t("unit.madfu-modal.title")}
        opened={!!madfu}
        onClose={() => {
          setMadfu("")
        }}
      >
        <img src={`data:image/png;base64,${madfu}`} alt="madfu QR" />
      </Modal>
    </>
  )
}

export default MobilePaymentButton
