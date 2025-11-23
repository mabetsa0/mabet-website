/* eslint-disable @next/next/no-img-element */
"use client"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import {
  Box,
  Button,
  Card,
  Divider,
  Group,
  Modal,
  NumberFormatter,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from "@mantine/core"
import { useMutation } from "@tanstack/react-query"
import { MapPin, QrCode, Star, X } from "lucide-react"
import {
  parseAsBoolean,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
} from "nuqs"
import { ErrorResponse } from "@/@types/error"
import { RiyalIcon } from "@/components/icons"
import { useRouter } from "@/lib/i18n/navigation"
import Mabet from "@/services"
import { getIsPrivate } from "@/utils/get-is-private"
import DateSelect from "../../components/date-select"
import { useUnitData } from "../../context/unit-context"
import { GetPaymentSummary } from "../get-payment-summary"
import { BookingDetails } from "../payment-summary"
import Coupon from "./coupon"
import { STC } from "./stc"

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
const ReservationDetails = ({ prices }: { prices: BookingDetails }) => {
  const t = useTranslations()
  const unit = useUnitData()
  const [{ method, use_wallet, payment_option, coupon }] = useQueryStates({
    method: parseAsString.withDefault("card"),
    use_wallet: parseAsStringLiteral(["1", "0"]).withDefault("0"),
    payment_option: parseAsStringLiteral(["full", "partial"]).withDefault(
      "partial"
    ),
    coupon: parseAsString.withDefault(""),
    private: parseAsBoolean.withDefault(false),
  })
  const params = useParams() as { booking_code: string; slug: string }
  const isPrivate = getIsPrivate(params.slug)
  const [error, setError] = useState("")
  const [madfu, setMadfu] = useState("")
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
        await Mabet.post<PaymentResponse>(
          `/payment/${params.booking_code}/approve`,
          {
            ...args,
            booking_code: params.booking_code,
            private: isPrivate ? 1 : undefined,
          }
        )

        return "/payment?payment_status=success&id=" + params.booking_code
      }

      if (args.payment_method === "card") {
        const cardPayment = await Mabet.post<PaymentResponse>(
          `/payment/pay-by-card`,
          {
            ...args,
            booking_code: params.booking_code,
            private: isPrivate ? 1 : undefined,
          }
        )

        paymentURL = cardPayment.data.data.redirect_url || ""
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
        paymentURL = tabbyPayment.data.data.redirect_url || ""
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

        paymentURL = madfuPayment.data.data.image || ""
      }

      if (args.payment_method === "tamara") {
        const tamaraPayment = await Mabet.get<PaymentResponse>(
          `/payment/${params.booking_code}/pay-by-tamara`,
          {
            params: {
              use_wallet: args.use_wallet,
              coupon: args.coupon,
              private: isPrivate ? 1 : undefined,
            },
          }
        )
        paymentURL = tamaraPayment.data.data.redirect_url || ""
      }

      return paymentURL
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
    onSuccess(data, variables) {
      if (variables.payment_method === "madfu") {
        setMadfu(data)
        return
      }
      if (data) {
        Router.push(data)
      }
    },
  })

  return (
    <>
      <Card
        className="md:p-md border-[#F3F3F3] max-md:border-transparent md:rounded-md md:[box-shadow:_0px_12px_20px_0px_#0000000A]"
        withBorder
      >
        <Card.Section
          className="pb-xs border-[#F3F3F3] max-md:!border-none md:px-[24px] md:pt-[24px]"
          withBorder
        >
          <Group align="start">
            <Box
              visibleFrom="md"
              className="h-[120px] w-[120px] overflow-hidden rounded-md"
            >
              <img
                className="h-full w-full object-cover"
                src={unit.images[0].image_path}
                alt={unit.images[0].alt}
              />
            </Box>
            <Stack>
              <h3 className="text-h4 md:text-h5 line-clamp-1 font-bold">
                {unit.name}
              </h3>
              <Stack gap={4}>
                <Text c={"#767676"}>
                  <QrCode
                    className="me-0.5 inline-block"
                    size={22}
                    strokeWidth={1.25}
                  />
                  {unit.code}
                </Text>
                {unit.stars ? (
                  <Text c={"#767676"}>
                    <Star
                      className="me-0.5 inline-block"
                      size={22}
                      strokeWidth={1.25}
                    />
                    {unit.stars}
                  </Text>
                ) : null}
                <Text c={"#767676"}>
                  <MapPin
                    className="me-0.5 inline-block"
                    size={22}
                    strokeWidth={1.25}
                  />
                  {unit.location}
                </Text>
              </Stack>
            </Stack>
          </Group>
        </Card.Section>

        <Card.Section
          className="border-[#F3F3F3] max-md:!border-none md:px-[24px] md:pt-[24px]"
          pb={12}
          withBorder
        >
          <DateSelect
            initialValues={{
              from: new Date(prices.from),
              to: new Date(prices.to),
            }}
            readOnly
            mode="mobile"
          />
        </Card.Section>
        <Card.Section
          visibleFrom="md"
          className="border-[#F3F3F3] max-md:!border-none md:px-[24px] md:pt-[24px]"
          pb={12}
          withBorder
        >
          <Coupon from={prices.from} to={prices.to} />
        </Card.Section>

        {prices ? (
          <Card.Section
            visibleFrom="md"
            className="border-[#F3F3F3] max-md:!border-none md:px-[24px] md:pt-[24px]"
            pb={12}
            withBorder
          >
            <Stack>
              <SimpleGrid cols={2}>
                <Group gap={"3"}>
                  {prices.duration}{" "}
                  <X className="text-primary" strokeWidth={4} size={20} />{" "}
                  <Text fw={500}>
                    <NumberFormatter
                      value={prices.night_price}
                      thousandSeparator
                      decimalScale={2}
                    />
                    <RiyalIcon />
                  </Text>
                </Group>
                <Text ta="end" c="primary">
                  <NumberFormatter
                    value={prices.total}
                    thousandSeparator
                    decimalScale={2}
                  />
                  <RiyalIcon />
                </Text>
              </SimpleGrid>

              {Number(prices.discount_amount) > 0 ? (
                <SimpleGrid cols={2}>
                  <Group gap={3}>
                    <Text fw={500}>{t("general.discount")}</Text>
                    <div className="flex h-[39px] w-[39px] shrink-0 items-center justify-center rounded bg-[#E8123D26] text-xs font-bold text-[#E8123D]">
                      {Number(prices.discount_percent)}%
                    </div>
                  </Group>

                  <Text ta="end" c="red">
                    - {prices.discount_amount}
                    <RiyalIcon />
                  </Text>
                </SimpleGrid>
              ) : null}
              {prices.qitaf_amount > 0 ? (
                <SimpleGrid cols={2}>
                  <Text>{t("general.qitaf-amount")}</Text>

                  <Text ta="end" c="red">
                    - {prices.qitaf_amount}
                    <RiyalIcon />
                  </Text>
                </SimpleGrid>
              ) : null}
              <SimpleGrid cols={2}>
                <Text>{t("general.customer-fees")}</Text>

                <Text ta="end" c="#767676">
                  {parseFloat(prices.customer_fees).toFixed(2)}
                  <RiyalIcon />
                </Text>
              </SimpleGrid>
              <Divider />
              <SimpleGrid cols={2}>
                <Text fw={700}>{t("general.total-price")}</Text>

                <Text ta="end" fw={700}>
                  <NumberFormatter
                    value={prices.full_payment}
                    thousandSeparator
                    decimalScale={2}
                  />
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
          </Card.Section>
        ) : null}
        <Card.Section
          visibleFrom="md"
          className="border-[#F3F3F3] max-md:!border-none md:px-[24px]"
          pb={12}
          withBorder
        >
          <STC />
        </Card.Section>
      </Card>
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

export default ReservationDetails
