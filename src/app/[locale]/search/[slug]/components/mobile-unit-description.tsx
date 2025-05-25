"use client"
/* eslint-disable @next/next/no-img-element */
import { mabetLogo, madfu, tabby, torism } from "@/assets"
import { Divider, Group, Space, Stack, Text } from "@mantine/core"
import { QrCode } from "lucide-react"
import { useUnitData } from "../context/unit-context"
import { useTranslations } from "next-intl"
import Features from "./features"
import AboutUnit from "./about-unit"
import ReservationDetails from "./reservation-details"
const MobileUnitDescription = () => {
  const unit = useUnitData()
  const t = useTranslations("unit")
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
          <Text className="text-h5 font-bold">{t("mabet-garentee")}</Text>
          <Text className="text-primary">
            {t("mabet-garentee-description")}
          </Text>
        </Stack>
      </Group>
      <Divider />
      <Stack gap={"4"}>
        <h1 className="text-h4 font-bold">{unit.name}</h1>
        <p className="flex gap-0.5 text-[#767676]">
          <QrCode strokeWidth={1.25} /> {unit.code}
        </p>
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
        <h3 className="text-h4 md:text-h3 font-medium">{t("details")}</h3>
        <Stack gap={"xs"} className="text-[#767676]">
          <p>{unit.details}</p>

          <Group className="border w-fit rounded-md py-0.5 px-1.5 border-primary">
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
