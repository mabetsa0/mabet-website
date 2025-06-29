"use client"
import Mabet from "@/services"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs"
import React from "react"
import { ReservationsResponse } from "./@types"
import {
  Loader,
  Stack,
  Space,
  Text,
  SegmentedControl,
  SimpleGrid,
  ScrollArea,
} from "@mantine/core"
import { useTranslations } from "next-intl"
import BookingCard from "./components/booking-card"
import Pagination from "../../units/components/pagination"

type Props = {}

const Page = (props: Props) => {
  const t = useTranslations()

  const types = [
    "upcoming",
    "past",
    // "requires_approval",
    // "expired",
    // "partial",
    // "completed",
  ] as const
  const [{ type, page }, set] = useQueryStates({
    type: parseAsString.withDefault("upcoming"),
    page: parseAsInteger.withDefault(1),
  })

  const { data, status } = useQuery({
    queryKey: ["reservations", type, page],
    queryFn: () =>
      Mabet.get<ReservationsResponse>("/account/bookings", {
        params: {
          page,
          type,
        },
      }),
    // placeholderData: keepPreviousData,
  })

  return (
    <Stack>
      <Space />
      <Stack>
        <Text className="text-h3 md:text-h2 font-bold">
          {t("user.bookings.title")}
        </Text>
        <Text className="md:text-lg">{t("user.bookings.description")}</Text>
      </Stack>
      <ScrollArea pb={"md"} w={"100%"}>
        <SegmentedControl
          color="primary"
          size="md"
          value={type}
          onChange={(value) => {
            set({ type: value })
          }}
          data={types.map((ele) => ({
            value: ele,
            label: t(`user.bookings.types.${ele}`),
          }))}
        />
      </ScrollArea>
      {status === "pending" && (
        <div className="flex items-center justify-center min-h-20">
          <Loader />
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center justify-center min-h-20">
          <p className="text-center text-red-500  text-sm">
            {t("user.bookings.server-error")}
          </p>
        </div>
      )}

      {status === "success" ? (
        data.data.data.bookings.length === 0 ? (
          <div>
            <Text c={"#767676"}>{t("user.bookings.no-bookings")}</Text>
          </div>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            {data.data.data.bookings.map((booking) => (
              <BookingCard {...booking} key={booking.id} />
            ))}
          </SimpleGrid>
        )
      ) : null}
      <Space />
      <Space />
      <div className="flex justify-center w-full ">
        <Pagination total={data?.data.data.last_page || 0} />
      </div>
    </Stack>
  )
}

export default Page
