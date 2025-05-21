/* eslint-disable @next/next/no-img-element */
"use client"
import { sharpShape } from "@/assets"
import { RiyalIcon } from "@/components/icons"
import { Badge, Card, Group, Text, Title } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { parseAsIsoDate, useQueryStates } from "nuqs"
import { useUnitData } from "../context/unit-context"
import { GetUnitAvailability } from "../get-unit-availability"

const ReservationDetails = () => {
  const [dates, setDates] = useQueryStates(
    {
      from: parseAsIsoDate.withDefault(dayjs().toDate()),
      to: parseAsIsoDate.withDefault(dayjs().add(1, "days").toDate()),
    },
    {
      history: "replace",
    }
  )
  const unit = useUnitData()
  const { slug } = useParams() as { slug: string }

  const {
    data: prices,
    isLoading,
    error,
    isError,
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
          to: dayjs().format("YYYY-MM-DD"),
        },
      })
    },
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  const t = useTranslations()
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
      <Card.Section
        className="border-[#F3F3F3]"
        px={24}
        pt={24}
        pb={12}
        withBorder
      >
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
                /{prices?.duration_text}
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
      </Card.Section>
    </Card>
  )
}

export default ReservationDetails
