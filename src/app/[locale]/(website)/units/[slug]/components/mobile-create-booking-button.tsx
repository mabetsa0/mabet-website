"use client"
import { useTranslations } from "next-intl"
import {
  Box,
  Button,
  Group,
  NumberFormatter,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import axios from "axios"
import dayjs from "dayjs"
import { parseAsBoolean, useQueryStates } from "nuqs"
import { ErrorResponse } from "@/@types/error"
import { RiyalIcon } from "@/components/icons"
import { useUnitData } from "../context/unit-context"
import useCheckAvailability from "../hooks/use-check-availability"
import useCreateBookingMutation from "../hooks/use-create-booking-mutation"
import { useQueryDates } from "../hooks/use-query-dates"

const MobileCreateBookingButton = () => {
  const t = useTranslations()
  const unit = useUnitData()
  const [{ from, to }] = useQueryDates()
  const [_, set] = useQueryStates({
    selectDate: parseAsBoolean.withDefault(false),
  })

  const { handleCreateBooking, ...createBookingMutation } =
    useCreateBookingMutation()

  const { data: prices, status, error } = useCheckAvailability(unit)

  return (
    <Box
      hiddenFrom="md"
      className="p-xs fixed inset-x-0 bottom-0 z-10 bg-white [box-shadow:_0px_-16px_40px_0px_#0000001F]"
    >
      {status === "pending" ? (
        <SimpleGrid mb={"xs"} cols={2}>
          <div>
            <Skeleton height={10} radius="xl" />
            <Skeleton height={12} mt={6} radius="xl" />
          </div>
          <div>
            <Skeleton height={10} radius="xl" />
            <Skeleton height={12} mt={6} radius="xl" />
          </div>
        </SimpleGrid>
      ) : null}
      {status === "error" ? (
        <Stack py={"xs"} justify="center" align="center">
          <Text c={"red"}>
            {axios.isAxiosError(error)
              ? (error.response?.data as ErrorResponse).message ||
                (error.response?.data as ErrorResponse).errors?.[0]
              : t("errors.unknown-error")}
          </Text>
          <Button
            fullWidth
            onClick={() => {
              set({ selectDate: true })
            }}
          >
            {t("change-search-dates")}
          </Button>
        </Stack>
      ) : null}
      {status === "success" ? (
        <SimpleGrid mb={"xs"} cols={2}>
          <div>
            {prices?.discount ? (
              <Text className="text-[12px] text-[#767676] line-through">
                {" "}
                {Number(prices.sub_price)} <RiyalIcon />
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
          <Stack gap={4}>
            <Group wrap="nowrap" justify="space-between">
              <Text c={"#767676"}>
                {t("general.from")}{" "}
                {from ? (
                  <span className="text-primary font-bold">
                    {dayjs(from).format("DD")}
                  </span>
                ) : null}{" "}
                {from ? dayjs(from).format("/ MMMM") : ""} -{" "}
                <span className="text-primary font-bold">
                  {to ? dayjs(to).format("DD") : null}
                </span>{" "}
                {to ? dayjs(to).format("/ MMMM") : null}
              </Text>
            </Group>
            <Text size="sm" fw={500}>
              {t("unit.total")} {prices?.duration_text}{" "}
              <NumberFormatter
                value={prices?.full_payment}
                thousandSeparator
                decimalScale={2}
              />{" "}
              <RiyalIcon />
            </Text>
          </Stack>
        </SimpleGrid>
      ) : null}

      {status === "success" ? (
        <Button
          fullWidth
          loading={createBookingMutation.isPending}
          onClick={handleCreateBooking}
        >
          {t("unit.create-booking-mobile")}
        </Button>
      ) : null}
    </Box>
  )
}

export default MobileCreateBookingButton
