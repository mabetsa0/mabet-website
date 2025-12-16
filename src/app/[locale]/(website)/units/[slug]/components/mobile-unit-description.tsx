"use client"
/* eslint-disable @next/next/no-img-element */
import { useTranslations } from "next-intl"
import Image from "next/image"
import { Badge, Divider, Group, Space, Stack, Text } from "@mantine/core"
import { QrCode } from "lucide-react"
import { mabetLogo, madfu, sharpShape, tabby, tamara, torism } from "@/assets"
import { RiyalIcon } from "@/components/icons"
import { useUnitData } from "../context/unit-context"
import useCheckAvailability from "../hooks/use-check-availability"
import AboutUnit from "./about-unit"
import Features from "./features"
import ReservationDetails from "./reservation-details"
import UnitPartnerData from "./unit-partner-data"

const MobileUnitDescription = () => {
  const unit = useUnitData()
  const t = useTranslations()
  const { data: prices } = useCheckAvailability(unit)
  return (
    <Stack hiddenFrom="md" className="w-full">
      <Group
        wrap="nowrap"
        align="start"
        p={"sm"}
        my={"xs"}
        className="border-primary rounded border"
        bg={"#18807826"}
      >
        <Image alt="mabet" src={mabetLogo} width={42} />
        <Stack gap={"4"}>
          <Text className="text-h5 font-bold">
            {t("unit.mabet-garentee")} 💚
          </Text>
          <Text size={"sm"} className="text-primary">
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
            <Image
              alt="sharp"
              src={sharpShape}
              className="absolute end-0 top-0 bottom-0 ltr:scale-x-[-1]"
            />
          </Badge>
        ) : null}
      </Stack>

      <AboutUnit />
      <Divider />
      <Space />
      {unit.tabby.enabled ? (
        <Group p={"sm"} className="rounded border border-[#F3F3F3]">
          <Image src={tabby} alt="tabby" width={63} />
          <Text c={"#767676"}>{unit.tabby.tabby_text}</Text>
        </Group>
      ) : null}

      {unit.tamara.enabled ? (
        <Group p={"sm"} className="rounded border border-[#F3F3F3]">
          <Image src={tamara} alt="tamara" width={63} />
          <Text c={"#767676"}>{unit.tamara.tabby_text}</Text>
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
            className="border-primary w-fit rounded-md border px-1.5 py-0.5"
          >
            <Image className="w-3" src={torism} alt="licence" />
            <p>{unit.licence.license_text}</p>
          </Group>
        </Stack>
      </Stack>
      <Space />
      <Divider />
      <UnitPartnerData />
      <Divider />
      <Space />
      <Features />
      <Divider />
    </Stack>
  )
}

export default MobileUnitDescription
