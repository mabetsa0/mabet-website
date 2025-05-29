"use client"
import { useRouter } from "@/lib/i18n/navigation"
import { useMutation, useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import { createBooking } from "../create-booking"
import axios from "axios"
import { notifications } from "@mantine/notifications"
import { useTranslations } from "next-intl"
import { ErrorResponse } from "@/@types/error"
import { useUnitData } from "../context/unit-context"
import { isAuthenticated } from "@/utils/is-authenticated"
import { useAuthModal } from "@/hooks/use-auth-modal"
import { parseAsIsoDate, useQueryStates } from "nuqs"
import {
  Box,
  Button,
  Group,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import { GetUnitAvailability } from "../get-unit-availability"
import { RiyalIcon } from "@/components/icons"

const MobileCreateBookingButton = () => {
  const t = useTranslations()
  const unit = useUnitData()
  const auth = useAuthModal()
  const [{ from, to }] = useQueryStates({
    from: parseAsIsoDate.withDefault(dayjs().toDate()),
    to: parseAsIsoDate.withDefault(dayjs().add(1, "days").toDate()),
  })
  // handle create booking
  const Router = useRouter()
  const createBookingMutation = useMutation({
    mutationFn: createBooking,

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
      Router.push(`/units/${unit.slug}/${data}`)
    },
  })
  const handleCreateBooking = () => {
    if (!isAuthenticated()) {
      return auth[1].onOpen()
    }
    createBookingMutation.mutate({
      from: dayjs(from).format("YYYY-MM-DD"),
      to: dayjs(to).format("YYYY-MM-DD"),
      unitId: unit.id,
    })
  }

  const {
    data: prices,
    status,
    error,
  } = useQuery({
    queryKey: [
      "availability",
      unit.slug,
      from.toDateString(),
      to.toDateString(),
    ],
    queryFn: async () => {
      return await GetUnitAvailability({
        id: unit.id,
        params: {
          from: dayjs(from).format("YYYY-MM-DD"),
          to: dayjs(to).format("YYYY-MM-DD"),
        },
      })
    },
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  return (
    <Box
      hiddenFrom="md"
      className="fixed bottom-0 inset-x-0 p-xs bg-white z-10  [box-shadow:_0px_-16px_40px_0px_#0000001F]"
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
              ? (error.response?.data as ErrorResponse).errors?.[0]
              : t("errors.unknown-error")}
          </Text>
        </Stack>
      ) : null}
      {status === "success" ? (
        <SimpleGrid mb={"xs"} cols={2}>
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
          <Stack gap={4}>
            <Group wrap="nowrap" justify="space-between">
              <Text c={"#767676"}>
                {t("general.from")}{" "}
                {from ? (
                  <span className=" font-bold text-primary">
                    {dayjs(from).format("DD")}
                  </span>
                ) : null}{" "}
                {from ? dayjs(from).format("/ MMMM") : ""} -{" "}
                <span className=" font-bold text-primary">
                  {to ? dayjs(to).format("DD") : null}
                </span>{" "}
                {to ? dayjs(to).format("/ MMMM") : null}
              </Text>
            </Group>
            <Text size="sm" fw={500}>
              {t("unit.total")} {prices?.duration_text} {prices?.full_payment}{" "}
              <RiyalIcon />
            </Text>
          </Stack>
        </SimpleGrid>
      ) : null}
      <Button
        fullWidth
        loading={createBookingMutation.isPending}
        onClick={handleCreateBooking}
      >
        {t("unit.create-booking-mobile")}
      </Button>
    </Box>
  )
}

export default MobileCreateBookingButton
