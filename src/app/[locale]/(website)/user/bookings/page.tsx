"use client"
import { useTranslations } from "next-intl"
import {
  Loader,
  ScrollArea,
  SegmentedControl,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs"
import Mabet from "@/services"
import Pagination from "../../units/components/pagination"
import { ReservationsResponse } from "./@types"
import BookingCard from "./components/booking-card"

const Page = () => {
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
    <Stack className="pt-lg">
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
        <div className="flex min-h-20 items-center justify-center">
          <Loader />
        </div>
      )}

      {status === "error" && (
        <div className="flex min-h-20 items-center justify-center">
          <p className="text-center text-sm text-red-500">
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
      <div className="flex w-full justify-center">
        <Pagination total={data?.data.data.last_page || 0} />
      </div>
    </Stack>
  )
}

export default Page
