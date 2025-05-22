/* eslint-disable @next/next/no-img-element */
"use client"
import { sharpShape } from "@/assets"
import { RiyalIcon } from "@/components/icons"
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
import { useMutation, useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { parseAsIsoDate, useQueryStates } from "nuqs"
import { useUnitData } from "../context/unit-context"
import { GetUnitAvailability } from "../get-unit-availability"
import axios from "axios"
import { ErrorResponse } from "@/@types/error"
import DateSelect from "./date-select"
import { X } from "lucide-react"
import { createBooking } from "../create-booking"
import { notifications } from "@mantine/notifications"
import { useRouter } from "@/lib/i18n/navigation"

const ReservationDetails = () => {
  const [dates] = useQueryStates({
    from: parseAsIsoDate.withDefault(dayjs().toDate()),
    to: parseAsIsoDate.withDefault(dayjs().add(1, "days").toDate()),
  })
  const unit = useUnitData()
  const { slug } = useParams() as { slug: string }

  const {
    data: prices,
    status,
    error,
  } = useQuery({
    queryKey: [
      "availability",
      slug,
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

  // handle create booking
  const Router = useRouter()
  const createBookingMutation = useMutation({
    mutationFn: createBooking,
    onError(error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        notifications.show({
          title: t("generla.failer"),
          message: (error.response.data as ErrorResponse).errors?.[0] || "",
          color: "red",
        })
      }
    },
    onSuccess(data) {
      Router.push(data + "")
    },
  })

  if (status === "pending")
    return (
      <Card className="border-[#F3F3F3]" padding="md" radius="md" withBorder>
        <Card.Section
          className="border-[#F3F3F3]"
          px={24}
          pt={24}
          pb={12}
          withBorder
        >
          <h3 className="text-h3 ">{t("unit.reservation-details.title")}</h3>
        </Card.Section>

        <Stack align="center" justify="center" h={320}>
          <Loader />
        </Stack>
      </Card>
    )
  return (
    <Card
      className="border-[#F3F3F3] [box-shadow:_0px_12px_20px_0px_#0000000A]"
      padding="md"
      radius="md"
      withBorder
    >
      <Card.Section
        className="border-[#F3F3F3]"
        px={24}
        pt={24}
        pb={12}
        withBorder
      >
        <h3 className="text-h3 ">{t("unit.reservation-details.title")}</h3>
      </Card.Section>

      <Card.Section
        className="border-[#F3F3F3]"
        px={24}
        pt={24}
        pb={12}
        withBorder
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
                  className=" absolute end-0 top-0 bottom-0"
                />
              </Badge>
            ) : null}
          </Group>
        )}
      </Card.Section>

      <Card.Section
        className="border-[#F3F3F3]"
        px={24}
        pt={24}
        pb={12}
        withBorder
      >
        <DateSelect />
      </Card.Section>

      {prices ? (
        <Card.Section
          className="border-[#F3F3F3]"
          px={24}
          pt={24}
          pb={12}
          withBorder
        >
          <Stack>
            <SimpleGrid cols={2}>
              <Group gap={"3"}>
                {prices.duration_count}{" "}
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
              onClick={() =>
                createBookingMutation.mutate({
                  from: dayjs(dates.from).format("YYYY-MM-DD"),
                  to: dayjs(dates.to).format("YYYY-MM-DD"),
                  unitId: unit.id,
                })
              }
            >
              {t("unit.create-booking", { value: prices.full_payment })}
              <RiyalIcon />
            </Button>
            <Text c={"#767676"} ta={"center"}>
              {t("unit.down-payment")} {prices.down_payment} <RiyalIcon />{" "}
            </Text>
          </Stack>
        </Card.Section>
      ) : null}
    </Card>
  )
}

export default ReservationDetails
