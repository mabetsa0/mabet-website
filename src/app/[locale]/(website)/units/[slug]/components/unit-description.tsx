"use client"
/* eslint-disable @next/next/no-img-element */
import { useTranslations } from "next-intl"
import { Divider, Group, Space, Stack } from "@mantine/core"
import { QrCode } from "lucide-react"
import { torism } from "@/assets"
import { useUnitData } from "../context/unit-context"
import AboutUnit from "./about-unit"
import Features from "./features"

const UnitDescription = () => {
  const unit = useUnitData()
  const t = useTranslations("unit")
  return (
    <Stack visibleFrom="md" className="w-full">
      <Stack>
        <h3 className="text-h4 md:text-h3 font-medium">{t("details")}</h3>
        <Stack gap={"xs"} className="text-[#767676]">
          <p>{unit.details}</p>

          <p className="flex gap-0.5">
            <QrCode strokeWidth={1.25} /> {unit.code}
          </p>
          <Group
            wrap="nowrap"
            className="border-primary w-fit rounded-md border px-1.5 py-0.5"
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
      <Space />
      <AboutUnit />
      <Space />
    </Stack>
  )
}

export default UnitDescription
