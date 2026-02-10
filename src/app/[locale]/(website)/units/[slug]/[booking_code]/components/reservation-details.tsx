/* eslint-disable @next/next/no-img-element */
"use client"
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
import { MapPin, QrCode, Star, X } from "lucide-react"
import { ErrorResponse } from "@/@types/error"
import { RiyalIcon } from "@/components/icons"
import DateSelect from "../../components/date-select"
import { useUnitData } from "../../context/unit-context"
import usePayment from "../hooks/use-payment"
import { usePaymentState } from "../hooks/use-payment-state"
import { BookingDetails } from "../payment-summary"
import Coupon from "./coupon"
import STC from "./stc"

const ReservationDetails = ({ prices }: { prices: BookingDetails }) => {
  const t = useTranslations()
  const unit = useUnitData()
  const [{ method, use_wallet, payment_option, coupon }] = usePaymentState()
  const params = useParams() as { booking_code: string; slug: string }

  const { mutate, isPending, madfu, setMadfu, error } = usePayment({
    booking_code: params.booking_code,
    unit_id: params.slug,
    booking_details: prices,
  })

  return (
    <>
      <Card
        className="md:p-md border-[#F3F3F3] max-md:border-transparent md:rounded-md md:[box-shadow:0px_12px_20px_0px_#0000000A]"
        withBorder
      >
        <Card.Section
          className="pb-xs border-[#F3F3F3] max-md:border-none! md:px-[24px] md:pt-[24px]"
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
          className="border-[#F3F3F3] max-md:border-none! md:px-[24px] md:pt-[24px]"
          pb={12}
          withBorder
        >
          <DateSelect
            initialValues={{
              from: new Date(prices.from),
              to: new Date(prices.to),
            }}
            readOnly
          />
        </Card.Section>
        <Card.Section
          visibleFrom="md"
          className="border-[#F3F3F3] max-md:border-none! md:px-[24px] md:pt-[24px]"
          pb={12}
          withBorder
        >
          <Coupon from={prices.from} to={prices.to} />
        </Card.Section>

        {prices ? (
          <Card.Section
            visibleFrom="md"
            className="border-[#F3F3F3] max-md:border-none! md:px-[24px] md:pt-[24px]"
            pb={12}
            withBorder
          >
            <Stack>
              <SimpleGrid cols={2}>
                <Group gap={"3"}>
                  {prices.duration}{" "}
                  <X className="text-primary" strokeWidth={4} size={20} />{" "}
                  {/* Old price (only if different) */}
                  {/* {prices.night_sub_price !== prices.night_price && (
                    <Text fw={500} c="dimmed" td="line-through">
                      <NumberFormatter
                        value={prices.night_sub_price}
                        thousandSeparator
                        decimalScale={2}
                      />
                      <RiyalIcon />
                    </Text>
                  )} */}
                  {/* Final price */}
                  <Text fw={600}>
                    <NumberFormatter
                      value={prices.night_sub_price}
                      thousandSeparator
                      decimalScale={2}
                    />
                    <RiyalIcon />
                  </Text>
                </Group>
                <Text ta="end" c="primary">
                  <NumberFormatter
                    value={prices.sub_total}
                    thousandSeparator
                    decimalScale={2}
                  />
                  <RiyalIcon />
                </Text>
              </SimpleGrid>

              <SimpleGrid cols={2}>
                <Text>{t("general.customer-fees")}</Text>

                <Text ta="end" c="#767676">
                  {parseFloat(prices.customer_fees).toFixed(2)}
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

              {Number(prices.offers_discount_percent) > 0 ? (
                <SimpleGrid cols={2}>
                  <Group gap={3}>
                    <Text fw={500}>خصم العروض</Text>
                    <div className="flex h-[39px] w-[39px] shrink-0 items-center justify-center rounded bg-[#E8123D26] text-xs font-bold text-[#E8123D]">
                      {Number(prices.offers_discount_percent)}%
                    </div>
                  </Group>

                  <Text ta="end" c="red">
                    - {Number(prices.offers_discount)}
                    <RiyalIcon />
                  </Text>
                </SimpleGrid>
              ) : null}

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
                  })
                }}
                loading={isPending}
              >
                {t("unit.pay", { value: prices.full_payment })}
              </Button>
              {error ? (
                <Text c={"red"} ta={"center"}>
                  {(error.response?.data as ErrorResponse).errors?.[0] ||
                    (error.response?.data as ErrorResponse).message ||
                    error.message}
                </Text>
              ) : null}
            </Stack>
          </Card.Section>
        ) : null}
        {/* <Card.Section
          visibleFrom="md"
          className="border-[#F3F3F3] max-md:!border-none md:px-[24px]"
          pb={12}
          withBorder
        >
          <STC />
        </Card.Section> */}
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
