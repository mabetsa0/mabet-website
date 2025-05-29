"use client"
/* eslint-disable @next/next/no-img-element */
import { mabetLogo, madfu, sharpShape, tabby, torism } from "@/assets"
import { RiyalIcon } from "@/components/icons"
import { Badge, Divider, Group, Space, Stack, Text } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import { QrCode } from "lucide-react"
import { useTranslations } from "next-intl"
import { parseAsIsoDate, useQueryStates } from "nuqs"
import { useUnitData } from "../context/unit-context"
import { GetUnitAvailability } from "../get-unit-availability"
import AboutUnit from "./about-unit"
import Features from "./features"
import ReservationDetails from "./reservation-details"
const MobileUnitDescription = () => {
  const unit = useUnitData()
  const t = useTranslations()
  const [dates] = useQueryStates({
    from: parseAsIsoDate.withDefault(dayjs().toDate()),
    to: parseAsIsoDate.withDefault(dayjs().add(1, "days").toDate()),
  })

  const { data: prices } = useQuery({
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
  return (
    <Stack hiddenFrom="md" className="w-full">
      <Group
        p={"sm"}
        my={"xs"}
        className="rounded border-primary border"
        bg={"#18807826"}
      >
        <img alt="mabet" src={mabetLogo.src} width={42} />
        <Stack gap={"4"}>
          <Text className="text-h5 font-bold">{t("unit.mabet-garentee")}</Text>
          <Text className="text-primary">
            {t("unit.mabet-garentee-description")}
          </Text>
        </Stack>
      </Group>
      <Divider />
      <Stack gap={"4"}>
        <h1 className="text-h4 font-bold">{unit.name}</h1>
        <p className="flex gap-0.5 text-[#767676]">
          <QrCode strokeWidth={1.25} /> {unit.code}
        </p>
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
      </Stack>

      <AboutUnit />
      <Divider />
      <Space />
      {unit.tabby.enabled ? (
        <Group p={"sm"} className="border border-[#F3F3F3] rounded">
          <img src={tabby.src} alt="tabby" width={63} />
          <Text c={"#767676"}>{unit.tabby.tabby_text}</Text>
        </Group>
      ) : null}
      {unit.madfu.enabled ? (
        <Group p={"sm"} className="border border-[#F3F3F3] rounded">
          <img src={madfu.src} alt="madfu" width={63} />
          <Text c={"#767676"}>{unit.madfu.tabby_text}</Text>
        </Group>
      ) : null}
      <Space />
      <Divider />

      <ReservationDetails />
      <Divider />

      <Stack>
        <h3 className="text-h4 md:text-h3 font-medium">{t("unit.details")}</h3>
        <Stack gap={"xs"} className="text-[#767676]">
          <p>{unit.details}</p>

          <Group
            wrap="nowrap"
            className="border w-fit rounded-md py-0.5 px-1.5 border-primary"
          >
            <img className="w-3" src={torism.src} alt="licence" />
            <p>{unit.licence.license_text}</p>
          </Group>
        </Stack>
      </Stack>
      <Divider />
      <Space />
      <Features />
      <Divider />
    </Stack>
  )
}

export default MobileUnitDescription
