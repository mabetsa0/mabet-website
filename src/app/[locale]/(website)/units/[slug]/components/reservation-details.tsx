/* eslint-disable @next/next/no-img-element */
"use client"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
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
import { NumberFormatter } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import dayjs from "dayjs"
import { X } from "lucide-react"
import { parseAsIsoDate, useQueryStates } from "nuqs"
import { ErrorResponse } from "@/@types/error"
import { sharpShape } from "@/assets"
import { RiyalIcon } from "@/components/icons"
import { useAuthModal } from "@/hooks/use-auth-modal"
import useMdScreen from "@/hooks/use-md-screen"
import { useRouter } from "@/lib/i18n/navigation"
import { useSession } from "@/lib/session-store"
import { getIsPrivate } from "@/utils/get-is-private"
import { useUnitData } from "../context/unit-context"
import { createBooking } from "../create-booking"
import { GetUnitAvailability } from "../get-unit-availability"
import DateSelect from "./date-select"

const ReservationDetails = () => {
  const { isAuthenticated, session } = useSession()
  const [dates] = useQueryStates(
    {
      from: parseAsIsoDate.withDefault(dayjs().toDate()),
      to: parseAsIsoDate.withDefault(dayjs().add(1, "days").toDate()),
    },
    { history: "replace" }
  )
  const params = useParams() as { slug: string }
  const isPrivate = getIsPrivate(params.slug)

  const unit = useUnitData()

  const {
    data: prices,
    status,
    error,
  } = useQuery({
    queryKey: [
      "availability",
      unit.slug,
      dates.from.toDateString(),
      dates.to.toDateString(),
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
    mutationFn: createBooking,

    onError(error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        notifications.show({
          title: t("generla.failer"),
          message:
            (error.response.data as ErrorResponse).message ||
            (error.response.data as ErrorResponse).errors?.[0] ||
            error.message,
          color: "red",
        })
      }
    },
    onSuccess(data) {
      Router.push({
        pathname: `/units/${unit.id}/${data}`,
        query: {
          ...(isPrivate ? { private: true } : {}),
          ...(session?.user.nafath_validated ? {} : { nafath: true }),
        },
      })
    },
  })
  const handleCreateBooking = () => {
    if (!isAuthenticated) {
      return auth[1].onOpen()
    }
    createBookingMutation.mutate({
      from: dayjs(dates.from).format("YYYY-MM-DD"),
      to: dayjs(dates.to).format("YYYY-MM-DD"),
      unitId: unit.id,
      private: isPrivate ? "1" : undefined,
    })
  }

  const matches = useMdScreen()

  if (status === "pending" && !matches)
    return (
      <Card className="border-[#F3F3F3]" padding="md" radius="md" withBorder>
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
    <Card
      className={
        "md:p-md border-[#F3F3F3] md:rounded-md md:[box-shadow:_0px_12px_20px_0px_#0000000A]"
      }
      withBorder={!matches}
    >
      <Card.Section
        className={"px-0 md:border-[#F3F3F3] md:px-[24px] md:pt-[24px]"}
        pb={12}
        withBorder={!matches}
      >
        <h3 className="text-h4 md:text-h3 font-bold">
          {t("unit.reservation-details.title")}
        </h3>
      </Card.Section>

      <Card.Section
        visibleFrom="md"
        className="px-0 md:border-[#F3F3F3] md:px-[24px] md:pt-[16px]"
        pb={12}
        withBorder={!matches}
      >
        {status === "error" ? (
          <Stack py={"xs"} justify="center" align="center">
            <Text c={"red"}>
              {axios.isAxiosError(error)
                ? (error.response?.data as ErrorResponse).message ||
                  (error.response?.data as ErrorResponse).errors?.[0]
                : t("errors.unknown-error")}
            </Text>
          </Stack>
        ) : (
          <Group justify="space-between">
            <div>
              {prices?.discount ? (
                <Text className="text-[12px] text-[#767676] line-through">
                  <NumberFormatter
                    value={prices.sub_price}
                    thousandSeparator
                    decimalScale={2}
                  />{" "}
                  <RiyalIcon />
                  <span className="text-[10px]">/{prices.duration_text}</span>
                </Text>
              ) : null}
              <Group gap={"4"}>
                <Title order={5} c={"#188078"}>
                  <NumberFormatter
                    value={prices?.price_plain}
                    thousandSeparator
                    decimalScale={2}
                  />
                  <RiyalIcon />
                </Title>
                <Text className="text-sm text-[#767676]">
                  /{t("general.night")}
                </Text>
              </Group>
            </div>
            {prices?.discount ? (
              <Badge
                h={40}
                className="relative min-w-7 rounded-s-md !rounded-e-[0] !border-0 p-[4px]"
                classNames={{
                  label: "text-start text-xs",
                }}
                size="xl"
                color={"#E8123D26"}
                style={{
                  color: "#E8123D",
                }}
                leftSection={
                  <div className="flex aspect-square w-2 items-center justify-center rounded-[5px] bg-white p-[4px] text-xs font-bold">
                    {prices.discount_percent_text}%
                  </div>
                }
              >
                {prices.discount_amount} <RiyalIcon />
                <img
                  alt="sharp"
                  src={sharpShape.src}
                  className="absolute end-0 top-0 bottom-0 ltr:scale-x-[-1]"
                />
              </Badge>
            ) : null}
          </Group>
        )}
      </Card.Section>

      <Card.Section
        className="border-[#F3F3F3] px-0 md:px-[24px] md:pt-[24px]"
        pb={12}
        withBorder={!matches}
      >
        <DateSelect mode="desktop" />

        {status === "error" ? (
          <Stack py={"xs"} justify="center" align="center">
            <Text c={"red"}>
              {axios.isAxiosError(error)
                ? (error.response?.data as ErrorResponse).message ||
                  (error.response?.data as ErrorResponse).errors?.[0]
                : t("errors.unknown-error")}
            </Text>
          </Stack>
        ) : null}
      </Card.Section>

      {prices ? (
        <Card.Section
          className="border-[#F3F3F3] md:px-[24px]"
          pt={24}
          pb={12}
          withBorder={!matches}
        >
          <Stack visibleFrom="md">
            <SimpleGrid cols={2}>
              <Group gap={"3"}>
                {prices.duration_text}{" "}
                <X className="text-primary" strokeWidth={4} size={20} />{" "}
                <Text fw={500}>
                  <NumberFormatter
                    value={prices.price_plain}
                    thousandSeparator
                    decimalScale={2}
                  />
                  <RiyalIcon />
                </Text>
              </Group>
              <Text ta="end" c="primary">
                <NumberFormatter thousandSeparator value={prices.total_plain} />
                <RiyalIcon />
              </Text>
            </SimpleGrid>

            {prices.discount ? (
              <SimpleGrid cols={2}>
                <Group gap={3}>
                  <Text fw={500}>{t("general.discount")}</Text>
                  <div className="flex h-[39px] w-[39px] shrink-0 items-center justify-center rounded bg-[#E8123D26] text-xs font-bold text-[#E8123D]">
                    {prices.discount_percent_text}%
                  </div>
                </Group>

                <Text ta="end" c="red">
                  - {prices.discount_amount}
                  <RiyalIcon />
                </Text>
              </SimpleGrid>
            ) : null}

            {Array.isArray(prices?.additionals) &&
              prices.additionals
                .filter((a) => a?.value && String(a.value).trim() !== "")
                .map((a, i) => {
                  const color = a.color || "#E8123D"
                  return (
                    <SimpleGrid key={i} cols={2}>
                      <Group gap={3}>
                        <Text fw={500} c={color}>
                          {a.label}
                        </Text>
                      </Group>

                      <Text ta="end" c={color}>
                        -{" "}
                        {typeof a.value === "string"
                          ? a.value.replace("SAR", "")
                          : a.value}{" "}
                        <RiyalIcon />
                      </Text>
                    </SimpleGrid>
                  )
                })}
            <SimpleGrid cols={2}>
              <Text>{t("general.customer-fees")}</Text>

              <Text ta="end" c="#767676">
                <NumberFormatter
                  thousandSeparator
                  value={
                    parseFloat(prices.customer_fees) + prices.customer_taxes
                  }
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
                  thousandSeparator
                  value={prices.full_payment}
                  decimalScale={2}
                />{" "}
                <RiyalIcon />
              </Text>
            </SimpleGrid>
            <Space />
            <Space />

            <Button
              loading={createBookingMutation.isPending}
              onClick={handleCreateBooking}
            >
              {t("unit.create-booking", {
                value: prices.full_payment_text
                  .replace("SAR", "")
                  .replace("ر.س", ""),
              })}{" "}
              <RiyalIcon />
            </Button>
            <Text c={"#767676"} ta={"center"}>
              {t("unit.down-payment")}{" "}
              <NumberFormatter
                thousandSeparator
                value={prices.down_payment}
                decimalScale={2}
              />{" "}
              <RiyalIcon />
            </Text>
          </Stack>
          {createBookingMutation.error ? (
            axios.isAxiosError(createBookingMutation.error) ? (
              <Text ta={"center"} c={"red"}>
                {(createBookingMutation.error?.response?.data as ErrorResponse)
                  .message || createBookingMutation.error?.message}
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

export default ReservationDetails
