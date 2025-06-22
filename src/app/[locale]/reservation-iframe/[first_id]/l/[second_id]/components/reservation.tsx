/* eslint-disable @next/next/no-img-element */
"use client"
import { ErrorResponse } from "@/@types/error"
import { useUnitData } from "@/app/[locale]/(website)/units/[slug]/context/unit-context"
import { GetUnitAvailability } from "@/app/[locale]/(website)/units/[slug]/get-unit-availability"
import { sharpShape, logo, bayut } from "@/assets"
import Image from "next/image"
import { RiyalIcon } from "@/components/icons"
import { useAuthModal } from "@/hooks/use-auth-modal"
import { useRouter } from "@/lib/i18n/navigation"
import Mabet from "@/services"
import {
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Loader,
  SimpleGrid,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import dayjs from "dayjs"
import { X } from "lucide-react"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { useDate } from "../stores/use-date"
import { useNafath } from "../stores/use-nafath"
import DateSelect from "./date-select"
import { CreateBookingResponse } from "@/types/create-booking-response"

const Reservation = () => {
  const params = useParams() as { first_id: string; second_id: string }
  const dates = useDate((state) => state.dates)
  const { onOpen } = useNafath()
  const unit = useUnitData()

  const {
    data: prices,
    status,
    error,
  } = useQuery({
    queryKey: [
      "availability",
      unit.slug,
      dates.from?.toISOString() ?? dayjs().toDate().toISOString(),
      dates.to?.toISOString() ?? dayjs().add(1, "days").toDate().toISOString(),
    ],
    queryFn: async () => {
      return await GetUnitAvailability({
        id: unit.id,
        params: {
          from: dayjs(dates.from).format("YYYY-MM-DD"),
          to: dayjs(dates.to).format("YYYY-MM-DD"),
        },
      })
    },
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  const t = useTranslations()
  const auth = useAuthModal()

  // handle create booking
  const Router = useRouter()
  const createBookingMutation = useMutation({
    mutationFn: async ({
      from,
      to,
      unitId,
    }: {
      from: string
      to: string
      unitId: string
    }) => {
      const response = await Mabet.post<CreateBookingResponse>(
        `/iframe-reservations/${params.first_id}/l/${params.second_id}/payment/create-booking `,
        {
          private: undefined,
          from,
          to,
          unitId,
        }
      )

      const booking_code = response.data.data.booking

      const cardPayment = await Mabet.post<{
        data: {
          redirect_url: string
        }
        message: null
        success: boolean
      }>(
        `/iframe-reservations/${params.first_id}/l/${params.second_id}/payment/pay-by-card`,
        {
          booking_code,
          private: undefined,
          payment_option: "full",
          use_wallet: "0",
        }
      )

      return cardPayment.data.data.redirect_url
    },

    onError(error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        notifications.show({
          title: t("generla.failer"),
          message:
            (error.response.data as ErrorResponse).errors?.[0] || error.message,
          color: "red",
        })
      }
    },
    onSuccess(data) {
      Router.push(data)
    },
  })
  const handleCreateBooking = () => {
    createBookingMutation.mutate({
      from: dayjs(dates.from).format("YYYY-MM-DD"),
      to: dayjs(dates.to).format("YYYY-MM-DD"),
      unitId: unit.id + "",
    })
  }

  const { data: isNafathVerified } = useQuery({
    queryKey: ["intial-nafath-check"],
    queryFn: async () => {
      const response = await Mabet.post<{
        token: boolean
      }>(
        `/iframe-reservations/${params.first_id}/l/${params.second_id}/nafath/check-request`
      )
      return response.data.token
    },
  })

  if (status === "pending")
    return (
      <Card padding="md" radius="md" withBorder={false}>
        <Card.Section
          className="border-[#F3F3F3]"
          px={24}
          pt={24}
          pb={12}
          withBorder
        >
          <h3 className="text-h3 font-bold">
            {t("unit.reservation-details.title")}
          </h3>
        </Card.Section>

        <Stack align="center" justify="center" h={320}>
          <Loader />
        </Stack>
      </Card>
    )
  return (
    <Card p={"md"} withBorder={false}>
      <Card.Section
        withBorder
        className={"border-[#F3F3F3] px-1 md:px-[24px] pt-[24px]"}
      >
        <div className="flex items-center justify-between gap-2 w-full pb-1">
          <Image
            src={logo} // Mabeet logo
            alt="Mabeet Logo"
            className="w-[135px]"
          />
          <Image
            src={bayut} // Bayut logo
            alt="Bayut Logo"
            className="w-[135px]"
          />
        </div>
      </Card.Section>

      <Card.Section
        className={"border-[#F3F3F3] px-1 md:px-[24px] pt-[24px]"}
        pb={12}
        withBorder={true}
      >
        <Group justify="space-between" wrap="nowrap">
          <h3 className="text-h4 md:text-h3  font-bold">
            {t("unit.reservation-details.title")}
          </h3>
          {!isNafathVerified ? (
            <Button
              size="xs"
              variant="light"
              onClick={() => {
                onOpen()
              }}
            >
              {t("verify-account-for-safe-reservation")}
            </Button>
          ) : null}
        </Group>
      </Card.Section>

      <Card.Section
        className="border-[#F3F3F3]  px-1 md:px-[24px] pt-[16px]"
        pb={12}
        withBorder={true}
      >
        {status === "error" ? (
          <Stack py={"xs"} justify="center" align="center">
            <Text c={"red"}>
              {axios.isAxiosError(error)
                ? (error.response?.data as ErrorResponse).errors?.[0]
                : t("errors.unknown-error")}
            </Text>
          </Stack>
        ) : (
          <Group justify="space-between">
            <div>
              {prices?.discount ? (
                <Text className="text-[#767676] text-[12px]  line-through">
                  {" "}
                  {Number(prices.sub_price)} <RiyalIcon />
                  <span className="text-[10px]">/{prices.duration_text}</span>
                </Text>
              ) : null}
              <Group gap={"4"}>
                <Title order={5} c={"#188078"}>
                  {prices?.price_plain}
                  <RiyalIcon />
                </Title>
                <Text className="text-[#767676] text-sm">
                  /{t("general.night")}
                </Text>
              </Group>
            </div>
            {prices?.discount ? (
              <Badge
                h={40}
                className="p-[4px] min-w-7 relative !rounded-e-[0]   rounded-s-md !border-0 "
                classNames={{
                  label: "text-start text-xs",
                }}
                size="xl"
                color={"#E8123D26"}
                style={{
                  color: "#E8123D",
                }}
                leftSection={
                  <div className=" font-bold text-xs bg-white p-[4px] rounded-[5px] w-2 aspect-square flex items-center justify-center">
                    {prices.discount_percent_text}%
                  </div>
                }
              >
                {prices.discount_amount} <RiyalIcon />
                <img
                  alt="sharp"
                  src={sharpShape.src}
                  className=" ltr:scale-x-[-1]  absolute end-0 top-0 bottom-0"
                />
              </Badge>
            ) : null}
          </Group>
        )}
      </Card.Section>

      <Card.Section
        className="border-[#F3F3F3]  px-1 md:px-[24px] pt-[24px]"
        pb={12}
        withBorder={true}
      >
        <DateSelect />
        {status === "error" ? (
          <Stack py={"xs"} justify="center" align="center">
            <Text c={"red"}>
              {axios.isAxiosError(error)
                ? (error.response?.data as ErrorResponse).errors?.[0]
                : t("errors.unknown-error")}
            </Text>
          </Stack>
        ) : null}
      </Card.Section>

      {prices ? (
        <Card.Section
          className="border-[#F3F3F3]  px-1 md:px-[24px]"
          pt={24}
          pb={12}
          withBorder={true}
        >
          <Stack>
            <SimpleGrid cols={2}>
              <Group gap={"3"}>
                {prices.duration_text}{" "}
                <X className="text-primary" strokeWidth={4} size={20} />{" "}
                <Text fw={500}>
                  {prices.price_plain} <RiyalIcon />
                </Text>
              </Group>
              <Text ta="end" c="#767676">
                <span className="text-primary">{prices.total_plain}</span>
                <RiyalIcon />
              </Text>
            </SimpleGrid>

            {prices.discount ? (
              <SimpleGrid cols={2}>
                <Group gap={3}>
                  <Text fw={500}>{t("general.discount")}</Text>
                  <div className="w-[39px] rounded text-xs text-[#E8123D] font-bold h-[39px] flex items-center justify-center bg-[#E8123D26] shrink-0">
                    {prices.discount_percent_text}%
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
                  parseFloat(prices.customer_fees) + prices.customer_taxes
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
              loading={createBookingMutation.isPending}
              onClick={handleCreateBooking}
            >
              {t("unit.create-booking", { value: prices.full_payment })}
              <RiyalIcon />
            </Button>
            {/* <Text c={"#767676"} ta={"center"}>
              {t("unit.down-payment")} {Number(prices.down_payment)?.toFixed(2)}{" "}
              <RiyalIcon />{" "}
            </Text> */}
          </Stack>
          {createBookingMutation.error ? (
            axios.isAxiosError(createBookingMutation.error) ? (
              <Text ta={"center"} c={"red"}>
                {(error?.response as ErrorResponse).errors?.[0] ||
                  error?.message}
              </Text>
            ) : (
              <Text ta={"center"} c={"red"}>
                {error?.message}
              </Text>
            )
          ) : null}
        </Card.Section>
      ) : null}
    </Card>
  )
}

export default Reservation
