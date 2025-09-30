/* eslint-disable @next/next/no-img-element */
"use client"
import { ErrorResponse } from "@/@types/error"
import { sharpShape } from "@/assets"
import { RiyalIcon } from "@/components/icons"
import { useAuthModal } from "@/hooks/use-auth-modal"
import useMdScreen from "@/hooks/use-md-screen"
import { useRouter } from "@/lib/i18n/navigation"
import { useSession } from "@/lib/session-store"
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
import { parseAsIsoDate, useQueryStates } from "nuqs"
import { useUnitData } from "../context/unit-context"
import { createBooking } from "../create-booking"
import { GetUnitAvailability } from "../get-unit-availability"
import { useIsPrivate } from "../hooks/use-is-private"
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

  const isPrivate = useIsPrivate()

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
      console.log("Fetching availability with:", unit.slug, dates)

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
            (error.response.data as ErrorResponse).message || error.message,
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
        "border-[#F3F3F3]  md:[box-shadow:_0px_12px_20px_0px_#0000000A] md:rounded-md  md:p-md"
      }
      withBorder={!matches}
    >
      <Card.Section
        className={"md:border-[#F3F3F3] px-0 md:px-[24px] md:pt-[24px]"}
        pb={12}
        withBorder={!matches}
      >
        <h3 className="text-h4 md:text-h3  font-bold">
          {t("unit.reservation-details.title")}
        </h3>
      </Card.Section>

      <Card.Section
        visibleFrom="md"
        className="md:border-[#F3F3F3] px-0 md:px-[24px] md:pt-[16px]"
        pb={12}
        withBorder={!matches}
      >
        {status === "error" ? (
          <Stack py={"xs"} justify="center" align="center">
            <Text c={"red"}>
              {axios.isAxiosError(error)
                ? (error.response?.data as ErrorResponse).message
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
        className="border-[#F3F3F3] px-0 md:px-[24px] md:pt-[24px]"
        pb={12}
        withBorder={!matches}
      >
        <DateSelect mode="desktop" />

        {status === "error" && matches ? (
          <Stack py={"xs"} justify="center" align="center">
            <Text c={"red"}>
              {axios.isAxiosError(error)
                ? (error.response?.data as ErrorResponse).message
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

            {Array.isArray(prices?.additionals) &&
              (
                prices.additionals as {
                  label: string
                  value: string
                  color?: string
                }[]
              )
                .filter((a) => a?.value && String(a.value).trim() !== "")
                .map((a, i) => {
                  const color = a.color || "#E8123D"
                  return (
                    <SimpleGrid key={i} cols={2}>
                      <Group gap={3}>
                        <Text fw={500}>{a.label}</Text>
                      </Group>

                      <Text ta="end" style={{ color }}>
                        - {a.value} <RiyalIcon />
                      </Text>
                    </SimpleGrid>
                  )
                })}
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
            <Text c={"#767676"} ta={"center"}>
              {t("unit.down-payment")} {Number(prices.down_payment)?.toFixed(2)}{" "}
              <RiyalIcon />{" "}
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
