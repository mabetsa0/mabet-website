/* eslint-disable @next/next/no-img-element */
"use client"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import {
  Box,
  Button,
  Divider,
  Group,
  Modal,
  NumberFormatter,
  ScrollArea,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { X } from "lucide-react"
import { ErrorResponse } from "@/@types/error"
import { RiyalIcon } from "@/components/icons"
import useMdScreen from "@/hooks/use-md-screen"
import usePayment from "../hooks/use-payment"
import { usePaymentState } from "../hooks/use-payment-state"
import { BookingDetails } from "../payment-summary"
import Coupon from "./coupon"
import PaymentForm from "./payment-form"

const MobilePaymentButton = ({
  booking_details,
}: {
  booking_details: BookingDetails
}) => {
  const prices = booking_details
  const matches = useMdScreen()
  const [opened, { open, close }] = useDisclosure(true)
  const t = useTranslations()
  const [{ method, use_wallet, payment_option, coupon }] = usePaymentState()
  const params = useParams() as { booking_code: string; slug: string }
  const { mutate, isPending, error, madfu, setMadfu } = usePayment({
    booking_code: params.booking_code,
    unit_id: params.slug,
    booking_details,
  })

  if (!matches) return null
  return (
    <>
      <Box
        hiddenFrom="md"
        className="p-xs fixed inset-x-0 bottom-0 z-10 bg-white [box-shadow:_0px_-16px_40px_0px_#0000001F]"
      >
        <Button onClick={open} fullWidth>
          {t("unit.mobile-payment-button")}
        </Button>
      </Box>
      <Modal className="relative" fullScreen opened={opened} onClose={close}>
        <ScrollArea h={"calc(100svh - 135px)"}>
          <Group pb={"sm"} wrap="nowrap" justify="space-between">
            <Text size="sm">{t("unit.payment-accept-conditions")}</Text>
            <Text onClick={close} size="sm" className="text-primary">
              ({t("unit.payment-accept-conditions-description")})
            </Text>
          </Group>
          <Stack className="relative">
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

                  {Number(prices.discount) > 0 ? (
                    <SimpleGrid cols={2}>
                      <Group gap={3}>
                        <Text fw={500}>{t("general.discount")}</Text>
                        <div className="flex h-[39px] w-[39px] shrink-0 items-center justify-center rounded bg-[#E8123D26] text-xs font-bold text-[#E8123D]">
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
                      {parseFloat(prices.customer_fees).toFixed(2)}
                      <RiyalIcon />
                    </Text>
                  </SimpleGrid>
                  <SimpleGrid cols={2}>
                    <Text>{t("general.taxes")}</Text>

                    <Text ta="end" c="#767676">
                      <NumberFormatter
                        thousandSeparator
                        value={prices.taxes}
                        decimalScale={2}
                      />{" "}
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
                </Stack>
              </Box>
            ) : null}
          </Stack>
        </ScrollArea>
        <Stack className="absolute inset-x-0 bottom-0 px-1 py-1" gap={"xs"}>
          <Button
            onClick={() => {
              mutate({
                payment_method: method,
                use_wallet: use_wallet,
                payment_option,
                coupon,
              })
            }}
            loading={isPending}
          >
            {t("unit.pay", { value: prices.full_payment })}
          </Button>
          {error ? (
            <Text c={"red"} ta={"center"}>
              {(error.response?.data as { error: { message: string } })?.error
                ?.message ||
                (error.response?.data as ErrorResponse).message ||
                error.message}
            </Text>
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
